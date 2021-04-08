import React, {useState, useEffect} from 'react'
import Field from "../components/forms/field"
import {FaSave, FaBackward} from "react-icons/fa"
import {Link} from "react-router-dom"
import customerApi from "../services/customerApi"

const CustomerAddPage = ({history, match}) => {
    const {id = "new"} = match.params

    const [error, setError] = useState({lastname: "", firstname: "", email: "", company: ""})
    const [customer, setCustomer] = useState({lastname: "", firstname: "", email: "", company: ""})
    const [editing, setEditing] = useState(false)
    const fetchCustomer = async id => {
        try {
            const {firstname, lastname, email, company} = await customerApi.find(id)
            setCustomer({firstname, lastname, email, company})
        } catch (e) {
            console.log(e.response)
            history.replace("/customers")
        }
    }
    useEffect(() => {
        if (id !== "new") {
            setEditing(true)
            fetchCustomer(id)
        }
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCustomer({...customer, [name]: value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (editing) {
                await customerApi.update(id, customer)
            } else {
                await customerApi.create(customer)
                history.replace("/customers")
            }
            setError({})
        } catch ({response}) {
            const {violations} = response.data
            if (violations) {
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => apiErrors[propertyPath] = message)
                setError(apiErrors)
            }
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                {!editing && <h1>Creation d'un client</h1> || <h1>Modification du client</h1>}
                <Link to="/customers" className="btn btn-outline-dark bg-light"><FaBackward/></Link>
            </div>
            <form onSubmit={handleSubmit}>
                <Field name="firstname" label="Nom" placeholder="Nom de famille" value={customer.firstname}
                       onChange={handleChange} error={error.firstname}/>
                <Field name="lastname" label="Prenom" placeholder="Prenom" value={customer.lastname}
                       onChange={handleChange} error={error.lastname}/>
                <Field name="email" label="E-mail" placeholder="Adresse e-mail" type="email" value={customer.email}
                       onChange={handleChange} error={error.email}/>
                <Field name="company" label="Entreprise" placeholder="Entreprise" value={customer.company}
                       onChange={handleChange} error={error.company}/>
                <div className="form-group">
                    <button type="submit" className="btn btn-outline-dark bg-light"><FaSave/></button>
                </div>
            </form>
        </>
    )
}

export default CustomerAddPage;