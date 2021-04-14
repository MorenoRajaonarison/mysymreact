import axios from 'axios'
import cache from "./cache";

const findAll = async () => {
    const cachedCustomers = await cache.get('customers')
    if (cachedCustomers) return cachedCustomers
    return axios.get("http://localhost:8000/api/customers").then(resp => {
        const customers = resp.data["hydra:member"]
        cache.set("customers", customers)
        return customers
    })
}

const deleteCustomer = id => axios.delete("http://localhost:8000/api/customers/" + id).then(async response => {
    const cachedCustomers = await cache.get('customers')
    cachedCustomers && cache.set("customers", cachedCustomers.filter(c => c.id !== id))
    return response
})

const find = async id => {
    const cachedCustomers = await cache.get("customers." + id)
    if (cachedCustomers) return cachedCustomers
    return axios.get("http://localhost:8000/api/customers/" + id).then(response => {
        const customer = response.data
        cache.set('customers.' + id, customer)
        return customer
    })
}

const update = (id, customer) => axios.put("http://localhost:8000/api/customers/" + id, customer).then(async response => {
    const cachedCustomers = await cache.get('customers')
    const cachedCustomer = await cache.get('customers.' + id)
    if (cachedCustomer) {
        cache.set('customers.' + id, response.data)
    }
    if (cachedCustomers) {
        const index = cachedCustomers.findIndex(c => c.id === +id)
        cachedCustomers[index] = response.data
        cachedCustomers && cache.set("customers", cachedCustomers)
    }

    return response
})

const create = customer => axios.post("http://localhost:8000/api/customers", customer).then(async response => {
    const cachedCustomers = await cache.get('customers')
    cachedCustomers && cache.set("customers", [...cachedCustomers, response.data])
    return response
})

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteCustomer
}