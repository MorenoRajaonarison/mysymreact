import axios from "axios";

const create = user => axios.post("http://localhost:8000/api/users", user)

export default {
    create
}