import React, { useState, useEffect } from 'react'
import './Subscriptions.css'
import ListBreadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { isEmpty } from 'lodash'
import * as moment from 'moment'
import { Link } from 'react-router-dom'
import subscriptionsCMSAPIs from '../../services/subscriptionsCMSAPIs'

export default function Subscriptions() {
    const [activeToogle, setActiveToogle] = useState('1')
    const [data, setData] = useState(null)
    const [dataStopped, setDataStopped] = useState(null)
    const [page, setPage] = useState(1)
    const [pageStopped, setPageStopped] = useState(1)
    const [limit] = useState(10)
    const [totalData, setTotalData] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [lastPageStopped, setLastPageStopped] = useState(0)
    const [totalDataStopped, setTotalDataStopped] = useState(0)

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        handleListSubscription(1)
        handleListUnsubscription(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    const handleToggle = (id) => {
        setActiveToogle(id)
    }

    const handleListSubscription = (page) => {
        const param = {
            params: {
                sort_by: `meta.created_at`,
                sort_order: 'DESCENDING',
                page_number: page,
                page_size: limit,
            }
        }
        subscriptionsCMSAPIs.getListSubscriptions(param)
            .then((res) => {
                setData(res.data.data)
                setLastPage(Math.ceil((res.data.meta.paging.count / limit)))
                setTotalData(res.data.meta.paging.count)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const handleListUnsubscription = (page) => {
        const param = {
            params: {
                sort_by: `meta.updated_at`,
                sort_order: 'DESCENDING',
                page_number: page,
                page_size: limit,
            }
        }
        subscriptionsCMSAPIs.getListUnsubscriptions(param)
            .then((res) => {
                setDataStopped(res.data.data)
                setLastPageStopped(Math.ceil((res.data.meta.paging.count / limit)))
                setTotalDataStopped(res.data.meta.paging.count)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const handleFirst = (type) => {
        if (type === 'stopped') {
            handleListUnsubscription(1)
            setPageStopped(1)
        } else {
            handleListSubscription(1)
            setPage(1)
        }
    }

    const handlePrev = (type) => {
        if (type === 'stopped') {
            handleListUnsubscription(pageStopped - 1)
            setPageStopped(pageStopped - 1)
        } else {
            handleListSubscription(page - 1)
            setPage(page - 1)
        }

    }
    const handleNext = (type) => {
        if (type === 'stopped') {
            handleListUnsubscription(pageStopped + 1)
            setPageStopped(pageStopped + 1)
        } else {
            handleListSubscription(page + 1)
            setPage(page + 1)
        }
    }
    const handleLast = (type) => {
        if (type === 'stopped') {
            handleListUnsubscription(lastPageStopped)
            setPageStopped(lastPageStopped)
        } else {
            handleListSubscription(lastPage)
            setPage(lastPage)
        }
    }

    return (
        <div className="wrap-industries">
            <div className="wrap-inside-industries">
                <div className="heading-title">
                    <label>Subscriptions</label>
                    <div className="wrap-breadcrumb div_flex" style={{ paddingBottom: '10px', alignItems: 'flex-start' }}>
                        <ListBreadcrumbs menu={'list'} name={'Subscriptions'} subMenu={''} url={'/website-cms/subscriptions'} />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="blockTabs" style={{ display: 'flex' }}>
                        <button className={activeToogle === '1' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('1')}>On Going <label className="total-slider">{!isEmpty(data) ? totalData : 0}</label> </button>
                        <button className={activeToogle === '2' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('2')}>Stopped<label className="total-slider">{!isEmpty(dataStopped) ? totalDataStopped : 0}</label></button>
                    </div>
                </div>

                <div style={{ display: activeToogle === '1' ? 'block' : 'none' }}>
                    <div className="wrap-content-table__master-data">
                        <div className="wrap-table-user">
                            <div className="title-table row">
                                <div className="col-3">Name</div>
                                <div className="col-4">Email</div>
                                <div className="col-3">Starting Date and Time</div>
                                <div className="col-2" style={{ textAlign: 'center' }}>Action</div>
                            </div>
                            <div className="wrap-content-table">
                                {!isEmpty(data) && data.map((v, i) => (
                                    <div key={i} className="content-table row">
                                        <div className="col-3">{v.name}</div>
                                        <div className="col-4">{v.email}</div>
                                        <div className="col-3">{moment(v.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</div>
                                        <div className="col-2" style={{ justifyContent: 'space-evenly', display: 'flex', textAlign: 'center' }}>
                                            <Link to={{ pathname: `/website-cms/subscriptions/start/${v.id}` }} className="a-href-label">Detail</Link>
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
                                                <button type="button" className="btn" onClick={() => handleFirst('open')} style={{ fontWeight: '600' }} disabled={page === 1}>First</button>
                                                <button type="button" className="btn" onClick={() => handlePrev('open')} style={{ fontWeight: '600' }} disabled={page === 1}>Prev</button>
                                                <button type="button" className="btn" onClick={() => handleNext('open')} style={{ fontWeight: '600' }} disabled={page === lastPage}>Next</button>
                                                <button type="button" className="btn" onClick={() => handleLast('open')} style={{ fontWeight: '600' }} disabled={page === lastPage}>Last</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </div>

                <div style={{ display: activeToogle === '2' ? 'block' : 'none' }}>
                    <div className="wrap-content-table__master-data">
                        <div className="wrap-table-user">
                            <div className="title-table row">
                                <div className="col-3">Name</div>
                                <div className="col-4">Email</div>
                                <div className="col-3">Stop Date and Time</div>
                                <div className="col-2" style={{ textAlign: 'center' }}>Action</div>
                            </div>
                            <div className="wrap-content-table">
                                {!isEmpty(dataStopped) && dataStopped.map((v, i) => (
                                    <div key={i} className="content-table row">
                                        <div className="col-3">{v.name}</div>
                                        <div className="col-4">{v.email}</div>
                                        <div className="col-3">{moment(v.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</div>
                                        <div className="col-2" style={{ justifyContent: 'space-evenly', display: 'flex', textAlign: 'center' }}>
                                            <Link to={{ pathname: `/website-cms/subscriptions/stopped/${v.id}` }} className="a-href-label">Detail</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {!isEmpty(dataStopped) ?
                                <div className="wrap-button-pagination" style={{ padding: '0px' }}>
                                    <div className="d-flex">
                                        <div className="p-2 flex-grow-1">
                                        </div>
                                        <div className="p-2">
                                            <div className="group-button" role="group" aria-label="Basic example">
                                                <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageStopped * limit - limit + 1}</label> to <label>{totalDataStopped > limit * pageStopped ? (limit * pageStopped) : (totalDataStopped)}</label> of Total <label>{totalDataStopped}</label></label>
                                                <button type="button" className="btn" onClick={() => handleFirst('stopped')} style={{ fontWeight: '600' }} disabled={pageStopped === 1}>First</button>
                                                <button type="button" className="btn" onClick={() => handlePrev('stopped')} style={{ fontWeight: '600' }} disabled={pageStopped === 1}>Prev</button>
                                                <button type="button" className="btn" onClick={() => handleNext('stopped')} style={{ fontWeight: '600' }} disabled={pageStopped === lastPageStopped}>Next</button>
                                                <button type="button" className="btn" onClick={() => handleLast('stopped')} style={{ fontWeight: '600' }} disabled={pageStopped === lastPageStopped}>Last</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
