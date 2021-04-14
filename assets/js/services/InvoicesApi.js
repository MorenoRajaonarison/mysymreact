import axios from 'axios'
import {INVOICES_API} from "./config";

const findAll = () => axios.get(INVOICES_API).then(resp => resp.data["hydra:member"])

const deleteInvoice = id => {
    axios
        .delete(INVOICES_API + "/" + id)
}

const find = id =>
    axios
        .get(INVOICES_API + "/" + id)
        .then(response => response.data)

const update = (id, invoice) =>
    axios
        .put(INVOICES_API + "/" + id, {...invoice, customer: `/api/customers/${invoice.customer}`})

const create = invoice =>
    axios
        .post(INVOICES_API, {...invoice, customer: `/api/customers/${invoice.customer}`})

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteInvoice
}