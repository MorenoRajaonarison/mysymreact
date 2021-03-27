import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../components/Pagination'

const CustomerPageWithPagination = props => {
    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/customers?pagination=true&count=10&page=${currentPage}`)
            .then(resp => {
                setCustomers(resp.data["hydra:member"])
                setTotalItems(resp.data["hydra:totalItems"])
                setLoading(false)
            })
            .catch(e => console.log(e.response))
    }, [currentPage])
    const handleDelete = id => {
        const originalCustomers = [...customers]
        setCustomers(customers.filer(customer.id !== id))
        axios
            .delete("http://localhost:8000/api/customers" + id)
            .then(resp => console.log("ok"))
            .catch(e => {
                setCustomers(originalCustomers)
                console.log(e.response)
            })
    }
    const handleChangePage = page => {
        setCurrentPage(page)
        setLoading(true)
    }
    const paginatedCustomers = Pagination.getData(customers, currentPage)

    return (
        <>
            <h1>Liste des customer (Paginer)</h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Facture</th>
                    <th className="text-center">Montant total</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {loading && <tr><td>Chargement...</td></tr>}
                {!loading && customers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td><a href="">{customer.firstname} {customer.lastname}</a></td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-center">
                        <span className="badge badge-primary">{customer.invoices.length}</span>
                    </td>
                    <td className="text-center">{customer.totalAmount.toLocaleString()} $</td>
                    <td>
                        <button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger">supprimer</button>
                    </td>
                </tr>)}

                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={10} length={totalItems} onPageChange={handleChangePage} />

        </>
    )
}

export default CustomerPageWithPagination