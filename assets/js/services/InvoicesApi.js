import axios from 'axios'

const findAll = () => axios.get("http://localhost:8000/api/invoices").then(resp => resp.data["hydra:member"])

const deleteInvoice = id => {
    axios
        .delete("http://localhost:8000/api/invoices/" + id)
}

const find = id =>
    axios
        .get("http://localhost:8000/api/invoices/" + id)
        .then(response => response.data)

const update = (id, invoice) =>
    axios
        .put("http://localhost:8000/api/invoices/" + id, {...invoice, customer: `/api/customers/${invoice.customer}`})

const create = invoice =>
    axios
        .post("http://localhost:8000/api/invoices", {...invoice, customer: `/api/customers/${invoice.customer}`})

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteInvoice
}