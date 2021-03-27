import React from 'react'

const Pagination = ({ currentPage, itemsPerPage, length, onPageChange }) => {
    const pageCount = Math.ceil(length / itemsPerPage)
    const pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    return (
        <div className="">
            <ul className="pagination pagination-sm">
                <li className={"page-item" + (currentPage === 1 && " disabled")}><button onClick={() => onPageChange(currentPage - 1)} className="page-link">&laquo;</button></li>
                {pages.map(page => <li key={page} className={"page-item" + (currentPage === page && " active")}><button onClick={() => onPageChange(page)} className="page-link">{page}</button></li>)}
                <li className={"page-item" + (currentPage === pageCount && " disabled")}><button onClick={() => onPageChange(currentPage + 1)} className="page-link">&raquo;</button></li>
            </ul>
        </div>
    )
}

Pagination.getData = (items, currentPage) => {
    const start = currentPage * 10 - 10
    return items.slice(start, start + 10)
}

export default Pagination