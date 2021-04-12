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
import CustomerAddPage from "./js/pages/CustomerAddPage";
import InvoiceAddPage from "./js/pages/InvoiceAddPage";
import RegisterPage from "./js/pages/RegisterPage";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

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
                            <PrivateRoute path="/customers/:id" component={CustomerAddPage}/>
                            <PrivateRoute path="/customers" component={CustomerPage}/>
                            <PrivateRoute path="/invoices/:id"  component={InvoiceAddPage}/>
                            <PrivateRoute path="/invoices"  component={InvoicesPage}/>
                            <Route
                                path='/login'
                                component={LoginPage}/>
                            <Route
                                path='/register'
                                component={RegisterPage}/>
                            <Route
                                path='/'
                                component={HomePage} />
                        </Switch>
                    </main>
                </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
            </AuthContext.Provider>
    )
}

const rootElement = document.querySelector("#app")
ReactDOM.render(<App />, rootElement)