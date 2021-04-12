import React, {useState, useEffect} from 'react';
import Field from "../components/forms/field"
import Select from "../components/forms/select"
import {FaBackward, FaSave} from "react-icons/fa";
import {Link} from "react-router-dom";
import customerApi from "../services/customerApi"
import InvoicesApi from "../services/InvoicesApi";
import {toast} from "react-toastify";
import FormContentLoader from "../components/loaders/formContentLoader";

const InvoiceAddPage = ({history, match}) => {
    const {id = "new"} = match.params
    const [invoice, setInvoice] = useState({amount: "", customer: "", status: "SENT"})
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({amount: "", customer: "", status: ""})
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            const data = await customerApi.findAll()
            setCustomers(data)
            !invoice.customer && setInvoice({...invoice, customer: data[0].id})
            setLoading(false)
        } catch (e) {
            console.log(e.response)
            toast.error('Impossible de chargé les client 😫')
            history.replace('/invoices')
        }
    }
    const fetchInvoice = async (id) => {
        try {
            const {amount, status, customer} = await InvoicesApi.find(id)
            setInvoice({amount, status, customer: customer.id})
            setLoading(false)
        } catch (e) {
            console.log(e.response)
            toast.error('Impossible de chargé la facture 😫')
            history.replace('/invoices')
        }
    }
    useEffect(() => {
        fetchCustomers()
    }, [])
    useEffect(() => {
        if (id !== "new") {
            setEditing(true)
            fetchInvoice(id)
        }
    }, [id])
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setInvoice({...invoice, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editing) {
                await InvoicesApi.update(id, invoice)
                toast.success('Modifiction reussi 💚')
            } else {
                await InvoicesApi.create(invoice)
                toast.success('Facture cree 💕')
                history.replace('/invoices')
            }

        } catch ({response}) {
            const {violations} = response.data
            if (violations) {
                toast.error('Les donné entres sont pas valide 😵')
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => apiErrors[propertyPath] = message)
                setErrors(apiErrors)
            }
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>{editing && "Mofification" || "Creation"} d'une facture</h1>
                <Link to="/invoices" className="btn btn-outline-dark bg-light"><FaBackward/></Link>
            </div>
            {!loading && <form onSubmit={handleSubmit}>
                <Field name="amount" type="number" placeholder="Montant de la facture" label="Montant"
                       onChange={handleChange} value={invoice.amount} error={errors.amount}/>
                <Select name="customer" label="Client" value={invoice.customer} error={errors.customer}
                        onChange={handleChange}>
                    {customers.map(({id, firstname, lastname}) => <option value={id}
                                                                          key={id}>{firstname} {lastname}</option>)}
                </Select>
                <Select name="status" label="Status" value={invoice.status} error={errors.status}
                        onChange={handleChange}>
                    <option value="SENT">Envoyé</option>
                    <option value="PAID">Payé</option>
                    <option value="CANCELLED">Annulé</option>
                </Select>
                <div className="form-group">
                    <button type="submit" className="btn btn-outline-dark bg-light"><FaSave/></button>
                </div>
            </form>}
            {loading && <FormContentLoader/>}
        </>
    )
}

export default InvoiceAddPage;