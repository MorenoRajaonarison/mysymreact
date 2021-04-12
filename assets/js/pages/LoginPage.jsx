import React, {useState, useContext} from 'react'
import authApi from "../services/authApi";
import AuthContext from "../context/AuthContext";
import Field from "../components/forms/field";
import {toast} from "react-toastify";

const LoginPage = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await authApi.authenticate(credentials)
            setIsAuthenticated(true)
            setError("")
            toast.success("Vous etes connecté 🎉")
            history.replace("/customers")
        } catch (e) {
            console.log(e.response)
            toast.error('Une erreur est survenue')
            setError('Une erreur est survenue')
        }
    }
    return (
        <>
            <h1>Connexion a l'application</h1>
            <form onSubmit={handleSubmit}>
                <Field label="Adresse email" name="username" value={credentials.username} onChange={handleChange}
                       placeholder="Adresse de connexion" error={error}/>
                <Field label="Mot de passe" name="password" value={credentials.password} onChange={handleChange}
                       error={error} type="password"/>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;
