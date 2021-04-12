import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import CustomerApi from '../services/customerApi'
import { Link } from "react-router-dom"
import { FaPlusSquare } from "react-icons/fa"
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/tableLoader";

const CustomerPage = props => {
    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const fetchCustomers = async () => {
        try {
            const data = await CustomerApi.findAll()
            setCustomers(data)
            setLoading(false)
        } catch (e) {
            toast.error('Impossible de chargé les client 😪')
            e => console.log(e.response)
        }
    }
    useEffect(() => {
        fetchCustomers()
    }, [])
    const handleDelete = async id => {
        const originalCustomers = [...customers]
        setCustomers(customers.filter(customer => customer.id !== id))
        try {
            await CustomerApi.delete(id)
            toast.success('Le Client est bien supprimer 👌')
        } catch (e) {
            setCustomers(originalCustomers)
            toast.error('Action innachevé 🤕')
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
            <div className="d-flex justify-content-between align-items-center">
                <h1>Liste des Clients</h1>
                <Link to="/customers/new" className="btn btn-outline-dark bg-light"><FaPlusSquare /></Link>
            </div>
            <div className="form-group"><input type="text" onChange={handleSearch} value={search}
                className="form-control" placeholder="rechercher.." /></div>
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
                {!loading && <tbody>
                    {paginatedCustomers.map(customer => <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td> <Link to={"/customers/" + customer.id}>{customer.firstname} {customer.lastname}</Link></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">
                            <span className="badge badge-primary">{customer.invoices.length}</span>
                        </td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} $</td>
                        <td>
                            <button onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-danger">supprimer
                        </button>
                        </td>
                    </tr>)}

                </tbody>}
            </table>
            {loading && <TableLoader/>}
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