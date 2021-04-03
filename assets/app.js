import React, {useState} from 'react'
import AuthContext from "./js/context/AuthContext"
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./js/components/Navbar"
import HomePage from "./js/pages/Homepage"
import CustomerPage from './js/pages/CustomerPage'
import InvoicesPage from "./js/pages/InvoicesPage"
import LoginPage from "./js/pages/LoginPage"
import authApi from "./js/services/authApi"
import {HashRouter, Route, Switch, withRouter} from 'react-router-dom'
import PrivateRoute from "./js/components/PrivateRoute";

require("./styles/app.css")

authApi.setup()

const App = () => {
    const NavbarWithRouter = withRouter(Navbar)
    const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated())
    return (<AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
            }}>
                <HashRouter>
                    <NavbarWithRouter/>
                    <main className="container pt-5">
                        <Switch>
                            <PrivateRoute path="/customers" component={CustomerPage}/>
                            <PrivateRoute path="/invoices"  component={InvoicesPage}/>
                            <Route
                                path='/login'
                                component={LoginPage}/>
                            <Route
                                path='/'
                                component={HomePage} />
                        </Switch>
                    </main>
                </HashRouter>
            </AuthContext.Provider>
    )
}

const rootElement = document.querySelector("#app")
ReactDOM.render(<App />, rootElement)