import axios from 'axios'

const findAll = () => {
    return axios
        .get("http://localhost:8000/api/customers")
        .then(resp => resp.data["hydra:member"])
}
const deleteCustomer = id =>{
    return axios
        .delete("http://localhost:8000/api/customers/" + id)
}
export default {
    findAll,
    delete: deleteCustomer
}