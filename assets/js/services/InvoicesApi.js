import axios from 'axios'

const findAll = () => {
    return axios
        .get("http://localhost:8000/api/invoices")
        .then(resp => resp.data["hydra:member"])
}
const deleteInvoice = id =>{
    return axios
        .delete("http://localhost:8000/api/invoices" + id)
}
export default {
    findAll,
    delete: deleteInvoice()
}