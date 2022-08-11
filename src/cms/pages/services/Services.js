import React, { useState, useEffect } from 'react'
import './Services.css'
import ListBreadcrumbs from '../../../jobPortal/components/breadcrumbs/Breadcrumbs'
import { isEmpty } from 'lodash'
import OrganizationAPIs from '../../services/organizationsCMSAPIs'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Link } from 'react-router-dom'

export default function Services() {
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [isFetch, setisFetch] = useState(false)
    const [limit] = useState(10)
    const [idDelete, setIdDelete] = useState('')

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        getListServices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetch])

    const getListServices = () => {
        OrganizationAPIs.getServices()
            .then((res) => {
                setData(paginator(res.data.data, page, limit))
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const paginator = (items, current_page, per_page_items) => {
        let page = current_page || 1,
            per_page = per_page_items || 8,
            offset = (page - 1) * per_page,
            paginatedItems = items.slice(offset).slice(0, per_page_items),
            total_pages = Math.ceil(items.length / per_page);
        let newData = {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems,
            allData: items
        };
        return newData;
    }

    const handleFirst = () => {
        let newData = data.allData
        setData(paginator(newData, 1, limit))
        setPage(1)
    }

    const handlePrev = () => {
        let newData = data.allData
        setData(paginator(newData, page - 1, limit))
        setPage(page - 1)
    }
    const handleNext = () => {
        let newData = data.allData
        setData(paginator(newData, page + 1, limit))
        setPage(page + 1)
    }
    const handleLast = () => {
        let newData = data.allData
        setData(paginator(newData, data.total_pages, limit))
        setPage(data.total_pages)
    }

    const handleDeleteData = (id, name) => {
        setIdDelete(id)
        setShowAlert(true)
        setAlerType(3)
        setAlertMessage(`Do you really want to delete ${name}?`)
    }

    const confirmDeleteData = () => {
        OrganizationAPIs.deleteServiceById(idDelete)
            .then((res) => {
                setisFetch(!isFetch)
                setShowAlert(true)
                setAlerType(1)
                setAlertMessage("Data has been Deleted!")
            })
            .catch((err) => {
                setisFetch(!isFetch)
                setShowAlert(true)
                setAlerType(2)
                setAlertMessage(err.response.data.message)
            })
    }

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlerType] = useState(1)
    const [alertMessage, setAlertMessage] = useState('')

    const hideAlert = () => {
        setIdDelete('')
        setShowAlert(false)
        return
    }

    return (
        <div className="wrap-industries">
            <SweetAlert
                show={showAlert}
                showCancel={alertType === 3}
                cancelBtnText={"Cancel"}
                cancelBtnBsStyle={"outline-secondary"}
                onCancel={hideAlert}
                confirmBtnText={alertType === 3 ? "Delete" : "OK"}
                confirmBtnBsStyle={alertType === 3 ? "danger" : "success"}
                title={alertType === 1 ? "Succes!" : alertType === 2 ? "Invalid!" : "Are you sure?"}
                onConfirm={alertType === 3 ? confirmDeleteData : hideAlert}
                danger={alertType === 3}
                warning={alertType === 2}
                success={alertType === 1}
            >
                {alertMessage}
            </SweetAlert>
            <div className="wrap-inside-industries">
                <div className="heading-title">
                    <label>Services</label>
                    <div className="wrap-breadcrumb div_flex" style={{ paddingBottom: '10px', alignItems: 'flex-start' }}>
                        <ListBreadcrumbs menu={'list'} name={'Services'} subMenu={''} url={'/website-cms/services'} />
                        <div className="wrap-btn">
                            <Link to={{ pathname: "/website-cms/services/form/add/1" }}>
                                <button className="primary-btn">Add </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="wrap-content-table__master-data">
                    <div className="wrap-table-user">
                        <div className="title-table row">
                            <div className="col-4">Service</div>
                            <div className="col-3" style={{ textAlign: 'center' }}>Action</div>
                        </div>
                        <div className="wrap-content-table">
                            {!isEmpty(data) && data.data.map((v, i) => (
                                <div key={i} className="content-table row">
                                    <div className="col-4">{v.name}</div>
                                    <div className="col-3" style={{ justifyContent: 'space-evenly', display: 'flex', textAlign: 'center' }}>
                                        <Link to={{ pathname: `/website-cms/services/form/edit/${v.id}` }} className="a-href-label">Edit</Link>
                                        <Link to={{ pathname: `/website-cms/services/form/detail/${v.id}` }} className="a-href-label">Detail</Link>
                                        <label onClick={() => handleDeleteData(v.id, v.name)} className="a-href-label">Delete</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!isEmpty(data) ?
                            <div className="wrap-button-pagination" style={{ padding: '0px' }}>
                                <div className="d-flex">
                                    <div className="p-2 flex-grow-1">
                                    </div>
                                    <div className="p-2">
                                        <div className="group-button" role="group" aria-label="Basic example">
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{page * limit - limit + 1}</label> to <label>{data.total > limit * page ? (limit * page) : (data.total)}</label> of Total <label>{data.total}</label></label>
                                            <button type="button" className="btn" onClick={handleFirst} style={{ fontWeight: '600' }} disabled={page === 1}>First</button>
                                            <button type="button" className="btn" onClick={handlePrev} style={{ fontWeight: '600' }} disabled={page === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={handleNext} style={{ fontWeight: '600' }} disabled={page === data.total_pages}>Next</button>
                                            <button type="button" className="btn" onClick={handleLast} style={{ fontWeight: '600' }} disabled={page === data.total_pages}>Last</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
