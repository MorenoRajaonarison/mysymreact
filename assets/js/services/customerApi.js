import axios from 'axios'

const findAll = () => axios.get("http://localhost:8000/api/customers").then(resp => resp.data["hydra:member"])
const deleteCustomer = id => axios.delete("http://localhost:8000/api/customers/" + id)
const find = id => axios.get("http://localhost:8000/api/customers/" + id).then(response => response.data)
const update = (id, customer) => axios.put("http://localhost:8000/api/customers/" + id, customer)
const create = customer => axios.post("http://localhost:8000/api/customers", customer)
export default {
    findAll,
    find,
    update,
    create,
    delete: deleteCustomer
}