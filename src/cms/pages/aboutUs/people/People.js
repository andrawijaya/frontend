import React, { useState, useEffect } from 'react'
import './People.css'
import ListBreadcrumbs from '../../../../jobPortal/components/breadcrumbs/Breadcrumbs'
import { isEmpty } from 'lodash'
import teamAPis from '../../../services/teamCMSAPIs'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'

export default function People() {
    const [isFetch, setIsFetch] = useState(false)
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [totalData, settotalData] = useState(0)
    const [limit] = useState(10)
    const [idDelete, setIdDelete] = useState('')

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        getListPeople(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetch])

    const getListPeople = (page) => {
        const param = {
            params: {
                sort_by: 'meta.created_at',
                sort_order: 'DESCENDING',
                language: 'EN',
                page_number: page,
                page_size: limit,
            }
        }
        teamAPis.getListPeople(param)
            .then((res) => {
                setLastPage(Math.ceil((res.data.meta.paging.count / limit)))
                settotalData(res.data.meta.paging.count)
                setData(res.data.data)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const handleFirst = () => {
        setPage(1)
        getListPeople(1)
    }

    const handlePrev = () => {
        setPage(page - 1)
        getListPeople(page - 1)
    }
    const handleNext = () => {
        setPage(page + 1)
        getListPeople(page + 1)
    }
    const handleLast = () => {
        setPage(lastPage)
        getListPeople(lastPage)
    }

    const confirmDeleteData = () => {
        teamAPis.DeletePeopleById(idDelete)
            .then((res) => {
                setIsFetch(!isFetch)
                setShowAlert(true)
                setAlerType(1)
                setAlertMessage("Data has been Deleted!")
            })
            .catch((err) => {
                setIsFetch(!isFetch)
                setShowAlert(true)
                setAlerType(2)
                setAlertMessage(err.response.data.message)
            })
    }

    const handleDeleteData = (id, name) => {
        setIdDelete(id)
        setShowAlert(true)
        setAlerType(3)
        setAlertMessage(`Do you really want to delete ${name}?`)
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
        <div className="wrap-people">
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
                    <label>Sigma People</label>
                    <div className="wrap-breadcrumb div_flex" style={{ paddingBottom: '10px', alignItems: 'flex-start' }}>
                        <ListBreadcrumbs menu={'list'} name={'About Us'} subMenu={'Sigma People'} url={'/website-cms/people'} />
                        <div className="wrap-btn">
                            <Link to={{ pathname: "/website-cms/people/form/add/1" }}>
                                <button className="primary-btn">Add</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="wrap-content-table__master-data">
                    <div className="wrap-table-user">
                        <div className="title-table row">
                            <div className="col-4">Name</div>
                            <div className="col-3" style={{ textAlign: 'center' }}>Action</div>
                        </div>
                        <div className="wrap-content-table">
                            {!isEmpty(data) && data.map((v, i) => (
                                <div key={i} className="content-table row">
                                    <div className="col-4">{v.name}</div>
                                    <div className="col-3" style={{ justifyContent: 'space-evenly', display: 'flex', textAlign: 'center' }}>
                                        <Link to={{ pathname: `/website-cms/people/form/edit/${v.id}` }} className="a-href-label">Edit</Link>
                                        <Link to={{ pathname: `/website-cms/people/form/detail/${v.id}` }} className="a-href-label">Detail</Link>
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
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{page * limit - limit + 1}</label> to <label>{totalData > limit * page ? (limit * page) : (totalData)}</label> of Total <label>{totalData}</label></label>
                                            <button type="button" className="btn" onClick={handleFirst} style={{ fontWeight: '600' }} disabled={page === 1}>First</button>
                                            <button type="button" className="btn" onClick={handlePrev} style={{ fontWeight: '600' }} disabled={page === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={handleNext} style={{ fontWeight: '600' }} disabled={page === lastPage}>Next</button>
                                            <button type="button" className="btn" onClick={handleLast} style={{ fontWeight: '600' }} disabled={page === lastPage}>Last</button>
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
