import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import CustomerApi from '../services/customerApi'

const CustomerPage = props => {
    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const fetchCustomers = async () => {
        try {
            const data = await CustomerApi.findAll()
            setCustomers(data)
        } catch (e) { e => console.log(e.response) }
    }
    useEffect(() => {
        fetchCustomers()
    }, [])
    const handleDelete = async id => {
        const originalCustomers = [...customers]
        setCustomers(customers.filter(customer => customer.id !== id))
        try {
            await CustomerApi.delete(id)
        } catch (e) {
            setCustomers(originalCustomers)
            console.log(e.response)
        }
    }
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    const handleChangePage = page => setCurrentPage(page)

    const filterCustomers = customers.filter(
        c =>
            c.firstname.toLowerCase().includes(search.toLowerCase()) ||
            c.lastname.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase())))

    const paginatedCustomers = Pagination.getData(filterCustomers, currentPage)

    return (
        <>
            <h1>Liste des Clients</h1>

            <div className="form-group"><input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="rechercher.." /></div>
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
                    {paginatedCustomers.map(customer => <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><a href="">{customer.firstname} {customer.lastname}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">
                            <span className="badge badge-primary">{customer.invoices.length}</span>
                        </td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} $</td>
                        <td>
                            <button onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-danger">supprimer</button>
                        </td>
                    </tr>)}

                </tbody>
            </table>
            {filterCustomers.length > 10 &&
                <Pagination currentPage={currentPage}
                    itemsPerPage={10}
                    length={filterCustomers.length}
                    onPageChange={handleChangePage} />
            }
        </>
    )
}

export default CustomerPage