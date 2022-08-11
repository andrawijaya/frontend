import React, { useState, useEffect } from 'react'
import './JobRoles.css'
import { isEmpty, toInteger } from 'lodash'
import * as ImIcons from 'react-icons/im'
import ListBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import masterDataAPIs from '../../../services/masterDataAPIs'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Link } from 'react-router-dom'

export default function JobRoles() {
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [totalData, setTotalData] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [idDelete, setIdDelete] = useState('')
    const [countById, setCountById] = useState(0)
    const [isFetch, setisFetch] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        getListJobCategories(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetch])

    const getListJobCategories = (page) => {
        const param = {
            params: {
                sort_by: `meta.created_at`,
                sort_order: 'DESCENDING',
                page_number: page,
                page_size: limit,
                search: search
            }
        }
        masterDataAPIs.getListJobRoles(param)
            .then((res) => {
                if (res.data.code === 200) {
                    setData(res.data.data)
                    setLastPage(Math.ceil((res.data.meta.paging.count / limit)))
                    setTotalData(res.data.meta.paging.count)
                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const handleSearch = (e) => {
        e.preventDefault();
        getListJobCategories(1)
    }

    const handleChange = (e) => {
        let target = e.target.value;
        setSearch(target);
    }

    const handleFirst = () => {
        getListJobCategories(1)
        setPage(1)
    }

    const handlePrev = () => {
        getListJobCategories(page - 1)
        setPage(page - 1)
    }
    const handleNext = () => {
        getListJobCategories(page + 1)
        setPage(page + 1)
    }
    const handleLast = () => {
        getListJobCategories(lastPage)
        setPage(lastPage)
    }
    const handleDeleteData = (id, name, count) => {
        count === null ? setCountById(0) : setCountById(count)
        setIdDelete(id)
        setShowAlert(true)
        setAlerType(3)
        setAlertMessage(`Do you really want to delete ${name}?`)
    }

    const confirmDeleteData = () => {
        if (toInteger(countById) > 0) {
            setShowAlert(true)
            setAlerType(2)
            setAlertMessage("Maaf Data tidak bisa di hapus!")
        } else {
            masterDataAPIs.deleteJobRoles(idDelete)
                .then((res) => {
                    if (res.data.code === 200) {
                        setisFetch(!isFetch)
                        setShowAlert(true)
                        setAlerType(1)
                        setAlertMessage("Data has been Deleted!")
                    } else {
                        setShowAlert(true)
                        setAlerType(2)
                        setAlertMessage(res.data.message)
                    }
                })
                .catch((err) => {
                    setisFetch(!isFetch)
                    setShowAlert(true)
                    setAlerType(2)
                    setAlertMessage(err.response.data.message)
                })
        }
    }

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlerType] = useState(1)
    const [alertMessage, setAlertMessage] = useState('')

    const hideAlert = () => {
        setShowAlert(false)
        setCountById(0)
        setIdDelete('')
        return
    }

    return (
        <div className="wrap-master-data">
            <SweetAlert
                show={showAlert}
                showCancel={alertType === 3}
                cancelBtnText={"Cancel"}
                cancelBtnBsStyle={"outline-secondary"}
                onCancel={hideAlert}
                confirmBtnText={alertType === 3 ? "Delete" : "OK"}
                confirmBtnBsStyle={alertType === 3 ? "danger" : alertType === 2 ? "warning" : "success"}
                title={alertType === 1 ? "Succes!" : alertType === 2 ? "Invalid!" : "Are you sure?"}
                onConfirm={alertType === 3 ? confirmDeleteData : hideAlert}
                danger={alertType === 3}
                warning={alertType === 2}
                success={alertType === 1}
            >
                {alertMessage}
            </SweetAlert>
            <div className="wrap-inside-master-data">
                <div className="heading-title">
                    <label>Job Roles</label>
                    <ListBreadcrumbs menu={'list'} name={'Master Data'} subMenu={'Job Roles'} url={'/job-portal/job-roles'} />
                </div>
                <div className="wrap-search-add">
                    <div style={{ paddingRight: '10px' }}>
                        <form autoComplete="off" onSubmit={handleSearch}>
                            <div className="navbar-search">
                                <button type="submit"><ImIcons.ImSearch /></button>
                                <input
                                    title="search"
                                    style={{ color: 'black' }}
                                    onChange={handleChange}
                                    placeholder="Search for job role"
                                    name="search"
                                    value={search}
                                />
                            </div>
                        </form>
                    </div>
                    <div>
                        <Link to={{ pathname: "/job-portal/job-roles/add/1" }}>
                            <button className="primary-btn">Add </button>
                        </Link>
                    </div>
                </div>
                <div className="wrap-content-table__master-data">
                    <div className="wrap-table-user">
                        <div className="title-table row">
                            <div className="col-4">Job Role</div>
                            <div className="col-5">Job Category</div>
                            <div className="col-3" style={{ textAlign: 'center' }}>Action</div>
                        </div>
                        <div className="wrap-content-table">
                            {!isEmpty(data) && data.map((v, i) => (
                                <div key={i} className="content-table row">
                                    <div className="col-4">{v.role}</div>
                                    <div className="col-5">{v.category}</div>
                                    <div className="col-3" style={{ justifyContent: 'space-evenly', display: 'flex', textAlign: 'center' }}>
                                        <Link to={{ pathname: `/job-portal/job-roles/edit/${v.id}` }} className="a-href-label">Edit</Link>
                                        <Link to={{ pathname: `/job-portal/job-roles/detail/${v.id}` }} className="a-href-label">Detail</Link>
                                        <label onClick={() => handleDeleteData(v.id, v.role, v.count)} className="a-href-label">Delete</label>
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
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{page * limit - limit + 1}</label> to <label>{totalData > limit * page ? (limit * page) : (totalData)}</label> of Total <label>{totalData}</label></label>
                                            <button type="button" className="btn" onClick={() => handleFirst()} style={{ fontWeight: '600' }} disabled={page === 1}>First</button>
                                            <button type="button" className="btn" onClick={() => handlePrev()} style={{ fontWeight: '600' }} disabled={page === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={() => handleNext()} style={{ fontWeight: '600' }} disabled={page === lastPage}>Next</button>
                                            <button type="button" className="btn" onClick={() => handleLast()} style={{ fontWeight: '600' }} disabled={page === lastPage}>Last</button>
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
