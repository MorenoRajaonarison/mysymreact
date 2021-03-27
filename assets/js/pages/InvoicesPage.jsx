import React, {useEffect, useState} from "react"
import Pagination from "../components/Pagination"
import axios from 'axios'
import InvoicesApi from "../services/InvoicesApi"

const status_class = {
    PAID: "success",
    SENT: "primary",
    CANCELED: "danger"
}
const status_label = {
    PAID: "Payé",
    SENT: "Envoyé",
    CANCELED: "Annuler"
}
const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesApi.findAll()
            setInvoices(data)
        } catch (e) {
            console.log(e.response)
        }
    }
    useEffect(()=> {
        fetchInvoices()
    }, [])
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    const handleDelete = async id => {
        const originalInvoices = [...invoices]
        setInvoices(invoices.filter(invoice=>invoice.id !== id))
        try {
            await InvoicesApi.delete(id)
        }catch (e) {
            console.log(e.response)
            setInvoices(originalInvoices)
        }
    }
    const handleChangePage = page => setCurrentPage(page)
    const filterInvoices = invoices.filter(
        i =>
            i.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase()) ||
            status_label[i.status].toLowerCase().includes(search.toLowerCase()))
    const paginatedInvoices = Pagination.getData(filterInvoices, currentPage)
    return ( <>
            <h1>Liste des factures</h1>
            <div className="form-group"><input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="rechercher.."/></div>

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
                <tbody>
                {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                    <td>{invoice.chrono}</td>
                    <td><a href="">{invoice.customer.firstname} {invoice.customer.lastname}</a></td>
                    <td className="text-center">{invoice.sentAt}</td>
                    <td className="text-center">
                        <span className={"badge badge-"+ status_class[invoice.status]}>{status_label[invoice.status]}</span>
                    </td>
                    <td className="text-center">{invoice.amount.toLocaleString()}</td>
                    <td>
                        <button className="btn btn-sm btn-danger mr-1">Supprimer</button> &nbsp;
                        <button className="btn btn-sm btn-primary" onClick={()=>handleDelete(invoice.id)}>Editer</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={10} onPageChange={handleChangePage} length={filterInvoices.length}/>
        </>
    )
}

export default InvoicesPage