import React, { useState, useEffect } from 'react'
import ListBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import './Webinars.css'
import * as ImIcons from 'react-icons/im'
import { isEmpty } from 'lodash'
import * as moment from 'moment'
import webinarsCMSAPI from '../../../services/webinarsCMSAPIs'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'

export default function Webinars() {
    const [activeToogle, setActiveToogle] = useState('1')
    const [search, setSearch] = useState('')

    const [isFetch, setIsFetch] = useState(false)

    const [dataPublished, setDataPublished] = useState(null)
    const [dataDraft, setDataDraft] = useState(null)
    const [dataArchived, setDataArchived] = useState(null)

    const [pagePublished, setPagePublished] = useState(1)
    const [pageDraft, setPageDraft] = useState(1)
    const [pageArchived, setPageArchived] = useState(1)

    const [lastPagePublished, setLastPagePublished] = useState(0)
    const [lastPageDraft, setLastPageDraft] = useState(0)
    const [lastPageArchived, setLastPageArchived] = useState(0)

    const [totalDataPublished, setTotalDataPublished] = useState(0)
    const [totalDataDraft, setTotalDataDraft] = useState(0)
    const [totalDataArchived, setTotalDataArchived] = useState(0)

    // const [publishedSize, setPublishedSize] = useState(0)
    // const [draftSize, setDraftSize] = useState(0)
    // const [archivedSiza, setArchivedSiza] = useState(0)

    const [limit] = useState(10)


    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        getListWebinars('POSTED', 1)
        getListWebinars('DRAFT', 1)
        getListWebinars('ARCHIVED', 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetch])

    const getListWebinars = (status, page) => {
        const param = {
            params: {
                sort_by: 'meta.created_at',
                sort_order: 'DESCENDING',
                language: 'EN',
                page_number: page,
                page_size: limit,
                status: status,
                search: search
            }
        }
        webinarsCMSAPI.getListWebinars(param)
            .then((res) => {
                if (res.data.code === 200) {
                    let name = status
                    switch (name) {
                        case 'POSTED':
                            setLastPagePublished(Math.ceil((res.data.meta.paging.count / limit)))
                            setTotalDataPublished(res.data.meta.paging.count)
                            setDataPublished(res.data.data)
                            // setPublishedSize(res.data.paging.size)
                            break;
                        case 'DRAFT':
                            setLastPageDraft(Math.ceil((res.data.meta.paging.count / limit)))
                            setTotalDataDraft(res.data.meta.paging.count)
                            setDataDraft(res.data.data)
                            // setDraftSize(res.data.paging.size)
                            break;
                        case 'ARCHIVED':
                            setLastPageArchived(Math.ceil((res.data.meta.paging.count / limit)))
                            setTotalDataArchived(res.data.meta.paging.count)
                            setDataArchived(res.data.data)
                            // setArchivedSiza(res.data.paging.size)
                            break;
                        default:
                            break;
                    }
                } else {
                    setShowAlert(true)
                    setAlerType(2)
                    setAlertMessage(res.data.message)
                }
            })
            .catch((err) => {
                alert('Invalid Data')
            })
    }

    const handleFirst = (type) => {
        if (type === 'published') {
            setPagePublished(1)
            getListWebinars('POSTED', 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(1)
            getListWebinars('DRAFT', 1)
            return
        }
        if (type === 'archived') {
            setPageArchived(1)
            getListWebinars('ARCHIVED', 1)
            return
        }
    }

    const handlePrev = (type) => {
        if (type === 'published') {
            setPagePublished(pagePublished - 1)
            getListWebinars('POSTED', pagePublished - 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(pageDraft - 1)
            getListWebinars('DRAFT', pageDraft - 1)
            return
        }
        if (type === 'archived') {
            setPageArchived(pageArchived - 1)
            getListWebinars('ARCHIVED', pageArchived - 1)
            return
        }
    }
    const handleNext = (type) => {
        if (type === 'published') {
            setPagePublished(pagePublished + 1)
            getListWebinars('POSTED', pagePublished + 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(pageDraft + 1)
            getListWebinars('DRAFT', pageDraft + 1)
            return
        }
        if (type === 'archived') {
            setPageArchived(pageArchived + 1)
            getListWebinars('ARCHIVED', pageArchived + 1)
            return
        }
    }

    const handleLast = (type) => {
        if (type === 'published') {
            setPagePublished(lastPagePublished)
            getListWebinars('POSTED', lastPagePublished)
            return
        }
        if (type === 'draft') {
            setPageDraft(lastPageDraft)
            getListWebinars('DRAFT', lastPageDraft)
            return
        }
        if (type === 'archived') {
            setPageArchived(lastPageArchived)
            getListWebinars('ARCHIVED', lastPageArchived)
            return
        }
    }

    const handleToggle = (id) => {
        setActiveToogle(id)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let toggle = activeToogle
        switch (toggle) {
            case '1':
                getListWebinars('POSTED', 1)
                break;
            case '2':
                getListWebinars('DRAFT', 1)
                break;
            case '3':
                getListWebinars('ARCHIVED', 1)
                break;
            default:
                break;
        }
    }

    const handleChange = (e) => {
        let target = e.target.value;
        setSearch(target);
    }

    function formatArray(data) {
        if (!isEmpty(data)) {
            let arr = []
            data.map((v, i) => (
                arr.push(v.name)
            ))
            var outStr = "";
            if (arr.length === 1) {
                outStr = arr[0];
            } else if (arr.length === 2) {
                outStr = arr.join(' and ');
            } else if (arr.length > 2) {
                outStr = arr.slice(0, -1).join(', ') + ', and ' + arr.slice(-1);
            }
            return outStr;
        } else {
            return null
        }
    }

    const [idData, setIdData] = useState('')

    const handleShortcut = (id, status) => {
        setIdData(id)
        if (status === 'archive') {
            setShowAlert(true)
            setAlerType(3)
            setAlertMessage(`Do you really want to archived this Data?`)
        } else {
            webinarsCMSAPI.restoreWebinarById(id)
                .then((res) => {
                    if (res.data.code === 200) {
                        setShowAlert(true)
                        setAlerType(1)
                        setAlertMessage(`Data success restored to Draft!`)
                    } else {
                        setShowAlert(true)
                        setAlerType(2)
                        setAlertMessage(res.data.message)
                    }
                })
        }
    }

    const confirmArchiveData = () => {
        webinarsCMSAPI.deleteWebinarById(idData)
            .then((res) => {
                if (res.data.code === 200) {
                    setShowAlert(true)
                    setAlerType(1)
                    setAlertMessage("This webinar has been moved to Archived!")
                } else {
                    setShowAlert(true)
                    setAlerType(2)
                    setAlertMessage(res.data.message)
                }
            })
    }

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlerType] = useState(1)
    const [alertMessage, setAlertMessage] = useState('')

    const hideAlert = () => {
        if (alertType === 1) {
            setIsFetch(!isFetch)
        }
        setShowAlert(false)
        setIdData('')
        return
    }


    return (
        <div className="wrap-artciles" >
            <SweetAlert
                show={showAlert}
                showCancel={alertType === 3}
                cancelBtnText={"Cancel"}
                cancelBtnBsStyle={"outline-secondary"}
                onCancel={hideAlert}
                confirmBtnText={alertType === 3 ? "Archive" : "OK"}
                confirmBtnBsStyle={alertType === 3 ? "danger" : alertType === 2 ? "warning" : "success"}
                title={alertType === 1 ? "Succes!" : alertType === 2 ? "Invalid!" : "Are you sure?"}
                onConfirm={alertType === 3 ? confirmArchiveData : hideAlert}
                danger={alertType === 3}
                warning={alertType === 2}
                success={alertType === 1}
            >
                {alertMessage}
            </SweetAlert>
            <div className="wrap-inside-insights">
                <div className="heading-title">
                    <label>Webinars</label>
                    <div className="wrap-breadcrumb div_flex" style={{ paddingBottom: '10px', alignItems: 'flex-start' }}>
                        <ListBreadcrumbs menu={'list'} name={'Insights'} subMenu={'List Webinars'} url={'/website-cms/webinars'} />
                        <div className="wrap-btn">
                            <Link to={{ pathname: "/website-cms/webinars/form/add/1" }}>
                                <button className="primary-btn">Add a Webinar</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="wrap-content-insights">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="blockTabs" style={{ display: 'flex' }}>
                            <button className={activeToogle === '1' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('1')}>Posted<label className="total-slider">{totalDataPublished}</label> </button>
                            <button className={activeToogle === '2' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('2')}>Draft<label className="total-slider">{totalDataDraft}</label></button>
                            <button className={activeToogle === '3' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('3')}>Archived<label className="total-slider">{totalDataArchived}</label></button>
                        </div>
                        <div>
                            <form autoComplete="off" onSubmit={handleSearch}>
                                <div className="navbar-search">
                                    <button type="submit"><ImIcons.ImSearch /></button>
                                    <input
                                        title="search"
                                        style={{ color: 'black' }}
                                        onChange={handleChange}
                                        placeholder="Search for Title or keywords"
                                        name="search"
                                        value={search}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="wrap-list-content">
                        <label>Sort by : Date Modified</label>
                        {/* List Job Published */}
                        <div style={{ display: activeToogle === '1' ? 'block' : 'none' }}>
                            {!isEmpty(dataPublished) && dataPublished.map((item, i) => (
                                <div key={i} style={{ padding: '10px 0px' }}>
                                    <div className="wrap-list-job">
                                        <div className="wrap-detail-job div_flex">
                                            <div className="wrap-content-job">
                                                <label>{isEmpty(item.title) ? "No Title" : item.title}</label>
                                                <div className="wrap-informatin-job">
                                                    <label>{isEmpty(item.topic) ? "No Topic" : item.topic}</label>
                                                    <label>{isEmpty(item.speakers) ? "No Speakers" : formatArray(item.speakers)}</label>
                                                </div>
                                            </div>
                                            <div className="wrap-btn-content-job">
                                                <button className="primary-btn">{item.status === 'DRAFT' ? 'Draft' : item.status === 'UPCOMING' ? 'Upcoming' : item.status === 'FINISHED' ? 'Finished' : item.status === 'COMPLETED' ? 'Recorded' : 'DRAFT'}</button>
                                            </div>
                                        </div>
                                        <hr style={{ margin: '10px 0px' }} />
                                        <div className="wrap-btm-detail-job div_flex">
                                            <div className="wrap-date-job">
                                                <label>{"Posted at " + moment(item.meta.published_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                                <label>{"Modified at " + moment(item.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                            </div>
                                            <div className="wrap-update-detail-job">
                                                <Link to={{ pathname: `/website-cms/webinars/form/edit/${item.id}` }} className="a-href-label" style={{ marginRight: '1rem' }}>Edit</Link>
                                                <label onClick={() => handleShortcut(item.id, 'archive')} className="a-href-label">Archive</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!isEmpty(dataPublished) ?
                                <div className="wrap-button-pagination" style={{ padding: '0px' }}>
                                    <div className="d-flex">
                                        <div className="p-2 flex-grow-1">
                                        </div>
                                        <div className="p-2">
                                            <div className="group-button" role="group" aria-label="Basic example">
                                                <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pagePublished * limit - limit + 1}</label> to <label>{totalDataPublished > limit * pagePublished ? (limit * pagePublished) : (totalDataPublished)}</label> of Total <label>{totalDataPublished}</label></label>
                                                <button type="button" className="btn" onClick={() => handleFirst('published')} style={{ fontWeight: '600' }} disabled={pagePublished === 1}>First</button>
                                                <button type="button" className="btn" onClick={() => handlePrev('published')} style={{ fontWeight: '600' }} disabled={pagePublished === 1}>Prev</button>
                                                <button type="button" className="btn" onClick={() => handleNext('published')} style={{ fontWeight: '600' }} disabled={pagePublished === lastPagePublished}>Next</button>
                                                <button type="button" className="btn" onClick={() => handleLast('published')} style={{ fontWeight: '600' }} disabled={pagePublished === lastPagePublished}>Last</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null}
                        </div>

                        {/* List Job Draft */}
                        <div style={{ display: activeToogle === '2' ? 'block' : 'none' }}>
                            {!isEmpty(dataDraft) && dataDraft.map((item, i) => (
                                <div key={i} style={{ padding: '10px 0px' }}>
                                    <div className="wrap-list-job">
                                        <div className="wrap-detail-job div_flex">
                                            <div className="wrap-content-job">
                                                <label>{isEmpty(item.title) ? "No Title" : item.title}</label>
                                                <div className="wrap-informatin-job">
                                                    <label>{isEmpty(item.topic) ? "No Topic" : item.topic}</label>
                                                    <label>{isEmpty(item.speakers) ? "No Speakers" : formatArray(item.speakers)}</label>
                                                </div>
                                            </div>
                                            <div className="wrap-btn-content-job" style={{ textAlign: 'end', paddingRight: '10px' }}>
                                                <button className="primary-btn">{item.previous_status === 'DRAFT' || item.previous_status === null ? 'Draft' : 'Unposted'}</button>
                                                <div style={{ display: item.previous_status === null ? 'none' : 'block' }}>
                                                    <label className="previous_label">Previous : {item.previous_status === 'DRAFT' ? 'Draft' : item.previous_status === 'UPCOMING' ? 'Upcoming' : item.previous_status === 'FINISHED' ? 'Finished' : item.previous_status === 'COMPLETED' ? 'Recorded' : 'Draft'}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style={{ margin: '10px 0px' }} />
                                        <div className="wrap-btm-detail-job div_flex">
                                            <div className="wrap-date-job">
                                                <label>{"Posted at " + moment(item.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                                <label>{"Modified at " + moment(item.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                            </div>
                                            <div className="wrap-update-detail-job">
                                                <Link to={{ pathname: `/website-cms/webinars/form/edit/${item.id}` }} className="a-href-label" style={{ marginRight: '1rem' }}>Edit</Link>
                                                <label onClick={() => handleShortcut(item.id, 'archive')} className="a-href-label">Archive</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!isEmpty(dataDraft) ?
                                <div className="wrap-button-pagination" style={{ padding: '0px' }}>
                                    <div className="d-flex">
                                        <div className="p-2 flex-grow-1">
                                        </div>
                                        <div className="p-2">
                                            <div className="group-button" role="group" aria-label="Basic example">
                                                <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageDraft * limit - limit + 1}</label> to <label>{totalDataDraft > limit * pageDraft ? (limit * pageDraft) : (totalDataDraft)}</label> of Total <label>{totalDataDraft}</label></label>
                                                <button type="button" className="btn" onClick={() => handleFirst('draft')} style={{ fontWeight: '600' }} disabled={pageDraft === 1}>First</button>
                                                <button type="button" className="btn" onClick={() => handlePrev('draft')} style={{ fontWeight: '600' }} disabled={pageDraft === 1}>Prev</button>
                                                <button type="button" className="btn" onClick={() => handleNext('draft')} style={{ fontWeight: '600' }} disabled={pageDraft === lastPageDraft}>Next</button>
                                                <button type="button" className="btn" onClick={() => handleLast('draft')} style={{ fontWeight: '600' }} disabled={pageDraft === lastPageDraft}>Last</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null}
                        </div>


                        {/* List Job Archived */}
                        <div style={{ display: activeToogle === '3' ? 'block' : 'none' }}>
                            {!isEmpty(dataArchived) && dataArchived.map((item, i) => (
                                <div key={i} style={{ padding: '10px 0px' }}>
                                    <div className="wrap-list-job">
                                        <div className="wrap-detail-job div_flex">
                                            <div className="wrap-content-job">
                                                <label>{isEmpty(item.title) ? "No Title" : item.title}</label>
                                                <div className="wrap-informatin-job">
                                                    <label>{isEmpty(item.topic) ? "No Topic" : item.topic}</label>
                                                    <label>{isEmpty(item.speakers) ? "No Speakers" : formatArray(item.speakers)}</label>
                                                </div>
                                            </div>
                                            <div className="wrap-btn-content-job" style={{ textAlign: 'end', paddingRight: '10px' }}>
                                                <button className="primary-btn">{item.previous_status === 'DRAFT' ? 'Draft' : 'Unposted'}</button>
                                                <div>
                                                    <label className="previous_label">Previous : {item.previous_status === 'DRAFT' ? 'Draft' : item.previous_status === 'UPCOMING' ? 'Upcoming' : item.previous_status === 'FINISHED' ? 'Finished' : item.previous_status === 'COMPLETED' ? 'Recorded' : 'Draft'}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style={{ margin: '10px 0px' }} />
                                        <div className="wrap-btm-detail-job div_flex">
                                            <div className="wrap-date-job">
                                                <label>{"Posted at " + moment(item.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                                <label>{"Modified at " + moment(item.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                            </div>
                                            <div className="wrap-update-detail-job">
                                                <label onClick={() => handleShortcut(item.id, 'draft')} className="a-href-label">Move to Draft</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!isEmpty(dataArchived) ?
                                <div className="wrap-button-pagination" style={{ padding: '0px' }}>
                                    <div className="d-flex">
                                        <div className="p-2 flex-grow-1">
                                        </div>
                                        <div className="p-2">
                                            <div className="group-button" role="group" aria-label="Basic example">
                                                <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageArchived * limit - limit + 1}</label> to <label>{totalDataArchived > limit * pageArchived ? (limit * pageArchived) : (totalDataArchived)}</label> of Total <label>{totalDataArchived}</label></label>
                                                <button type="button" className="btn" onClick={() => handleFirst('archived')} style={{ fontWeight: '600' }} disabled={pageArchived === 1}>First</button>
                                                <button type="button" className="btn" onClick={() => handlePrev('archived')} style={{ fontWeight: '600' }} disabled={pageArchived === 1}>Prev</button>
                                                <button type="button" className="btn" onClick={() => handleNext('archived')} style={{ fontWeight: '600' }} disabled={pageArchived === lastPageArchived}>Next</button>
                                                <button type="button" className="btn" onClick={() => handleLast('archived')} style={{ fontWeight: '600' }} disabled={pageArchived === lastPageArchived}>Last</button>
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
