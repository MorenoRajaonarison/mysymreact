import React, {useState} from 'react'
import Field from "../components/forms/field";
import {Link} from "react-router-dom";
import userApi from "../services/userApi"

const RegisterPage = ({history}) => {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleSubmit = async e => {
        e.preventDefault()
        const apiErrors = {}
        if (user.password !== user.confirmPassword) {
            apiErrors.confirmPassword = "Reverifier les valeur du champ"
            setError(apiErrors)
            return
        }
        try {
            await userApi.create(user)
            setError({})
            history.replace('/login')
        } catch (e) {
            console.log(e.response)
            const {violations} = e.response.data
            if (violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                })
                setError(apiErrors)
            }
        }
    }
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setUser({...user, [name]: value})
    }
    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field name="firstname" label="Prenom" placeholder="Votre prenom" error={error.firstname}
                       value={user.firstname} onChange={handleChange}/>
                <Field name="lastname" label="nom" placeholder="Votre nom" error={error.lastname} value={user.lastname}
                       onChange={handleChange}/>
                <Field name="email" label="Adress email" placeholder="Votre email" error={error.email}
                       value={user.email} onChange={handleChange} type="email"/>
                <Field name="password" label="Mot de passe" placeholder="Votre mot de passe" error={error.password}
                       value={user.password} type="password" onChange={handleChange}/>
                <Field name="confirmPassword" label="Confirmation de mot de passe" placeholder="Confirmation"
                       error={error.confirmPassword} value={user.confirmPassword} type="password"
                       onChange={handleChange}/>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Confirmation</button>
                    <Link to="/login" className="btn btn-link">J'ai deja un Compte</Link>
                </div>
            </form>
        </>
    );
};

export default RegisterPage;
