import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./js/components/Navbar"
import HomePage from "./js/pages/Homepage"
import { HashRouter, Switch, Route } from 'react-router-dom'
import CustomerPage from './js/pages/CustomerPage'

require("./styles/app.css")
const App = () => {
    return <HashRouter>
        <Navbar />
        <main className="container pt-5">
            <Switch>
                <Route path='/customers' component={CustomerPage} />
                <Route path='/' component={HomePage} />
            </Switch>
        </main>
    </HashRouter>
}

const rootElement = document.querySelector("#app")
ReactDOM.render(<App />, rootElement)