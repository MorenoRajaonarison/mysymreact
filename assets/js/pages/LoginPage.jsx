import React, {useState,useContext} from 'react'
import authApi from "../services/authApi";
import AuthContext from "../context/AuthContext";

const LoginPage = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        username:"",
        password:""
    })

    const [error, setError] = useState("")

    const handleChange =  ({currentTarget}) => {
        const {value,name} = currentTarget
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await authApi.authenticate(credentials)
            setIsAuthenticated(true)
            setError("")
            history.replace("/customers")
        } catch (e) {
            console.log(e.response)
            setError('Une erreur est survenue')
        }
    }
    return (
        <>
            <h1>Connexion a l'application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input value={credentials.username} onChange={handleChange} type="email" className={"form-control" + (error && " is-invalid")} name="username" id="username" placeholder="Adresse de connexion"/>
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input value={credentials.password} onChange={handleChange} type="password" className={"form-control" + (error && " is-invalid")} name="password" id="password" placeholder="Mot de passe"/>
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;
