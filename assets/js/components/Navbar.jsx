import React from 'react'

const Navbar = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">SymReact</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Client</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Facture</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="" className="btn btn-outline-success">Connexion</a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="btn btn-link">Inscription</a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="btn btn-outline-danger">
                            Deconnexion
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar