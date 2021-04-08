import axios from "axios"
import jwtDecode from "jwt-decode"

const authenticate = credentials => {
    return axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(resp => resp.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token)
            setAxiosToken(token)
        })
}

const setAxiosToken = (token) => {
    axios.defaults.headers["Authorization"] = "Bearer " + token
}

const logout = () => {
    window.localStorage.removeItem("authToken")
    delete axios.defaults.headers["Authorization"]
}

const setup = () => {
    const token = window.localStorage.getItem("authToken")
    if (token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
        }
    }
}

const isAuthenticated = () => {
    const token = window.localStorage.getItem("authToken")
    if (token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            return true
        }
        return false
    }
    return false
}


export default {authenticate, logout, setup, isAuthenticated}