import React, {useContext} from 'react'
import authApi from "../services/authApi"
import AuthContext from "../context/AuthContext"
import {NavLink} from "react-router-dom"
import {toast} from "react-toastify";

const Navbar = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const handleLogout = () => {
        authApi.logout()
        setIsAuthenticated(false)
        toast.info("Vous etes deconnecté 😎")
        history.push('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">SymReact</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Client</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Facture</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/login" className="btn btn-outline-success">Connexion</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="btn btn-link">Inscription</NavLink>
                            </li>
                        </>)) || (
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-outline-danger">
                                Deconnexion
                            </button>
                        </li>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar