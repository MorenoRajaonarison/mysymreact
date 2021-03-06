import React, {useEffect, useState} from "react"
import Pagination from "../components/Pagination"
import moment from "moment"
import InvoicesApi from "../services/InvoicesApi"
import {Link} from "react-router-dom";
import {FaPlusSquare} from "react-icons/fa";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/tableLoader";

const status_class = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}
const status_label = {
    PAID: "Payé",
    SENT: "Envoyé",
    CANCELLED: "Annuler"
}
const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesApi.findAll()
            setInvoices(data)
            setLoading(false)
        } catch (e) {
            console.log(e.response)
            toast.error('Une erreur est survenue')
        }
    }


    useEffect(() => {
        fetchInvoices()
    }, [])

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    const handleDelete = async id => {
        const originalInvoices = [...invoices]
        setInvoices(invoices.filter(invoice => invoice.id !== id))
        try {
            await InvoicesApi.delete(id)
            toast.success('La factures a été bien supprimer')
        } catch (e) {
            console.log(e.response)
            toast.error('Une erreur est survenue')
            setInvoices(originalInvoices)
        }
    }
    const formatDate = str => moment(str).format('DD/MM/YYYY')
    const handleChangePage = page => setCurrentPage(page)
    const filterInvoices = invoices.filter(i =>
        i.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().startsWith(search.toLowerCase()) ||
        status_label[i.status].toLowerCase().includes(search.toLowerCase()))
    const paginatedInvoices = Pagination.getData(filterInvoices, currentPage)
    return (<>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Liste des factures</h1>
                <Link to="/invoices/new" className="btn btn-outline-dark bg-light"><FaPlusSquare/></Link>
            </div>
            <div className="form-group"><input type="text" onChange={handleSearch} value={search}
                                               className="form-control" placeholder="rechercher.."/></div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numero</th>
                    <th>Client</th>
                    <th className="text-center">Date d'envoie</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Montant</th>
                    <th></th>
                </tr>
                </thead>
                {!loading && <tbody>
                {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                    <td>{invoice.chrono}</td>
                    <td><Link to={"/customers/"+invoice.customer.id}>{invoice.customer.firstname} {invoice.customer.lastname}</Link></td>
                    <td className="text-center">{formatDate(invoice.sentAt)}</td>
                    <td className="text-center">
                        <span
                            className={"badge badge-" + status_class[invoice.status]}>{status_label[invoice.status]}</span>
                    </td>
                    <td className="text-center">{invoice.amount.toLocaleString()}</td>
                    <td>
                        <button className="btn btn-sm btn-danger mr-1"
                                onClick={() => handleDelete(invoice.id)}>Supprimer
                        </button>
                        &nbsp;
                        <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-primary">Editer</Link>
                    </td>
                </tr>)}
                </tbody>}
            </table>
            {loading && <TableLoader/>}
            <Pagination currentPage={currentPage} itemsPerPage={10} onPageChange={handleChangePage}
                        length={filterInvoices.length}/>
        </>
    )
}

export default InvoicesPage