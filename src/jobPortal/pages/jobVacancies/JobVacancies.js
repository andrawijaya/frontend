import React, { useState, useEffect } from 'react'
import './JobVacancies.css'
import * as ImIcons from 'react-icons/im'
import ListBreadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { isEmpty } from 'lodash'
import * as moment from 'moment'
import { Link } from 'react-router-dom'
import JobVacanciesAPIs from '../../services/jobVacanciesAPIs'
import SweetAlert from 'react-bootstrap-sweetalert'

export default function JobVacancies() {
    const [activeToogle, setActiveToogle] = useState('1')
    const [idDelete, setIdDelete] = useState('')
    const [isFetch, setisFetch] = useState(false)

    const [dataOpen, setDataOpen] = useState(null)
    const [dataDraft, setDataDraft] = useState(null)
    const [dataClosed, setDataClosed] = useState(null)

    const [pageOpen, setPageOpen] = useState(1)
    const [pageDraft, setPageDraft] = useState(1)
    const [pageClosed, setPageClosed] = useState(1)

    const [lastPageOpen, setLastPageOpen] = useState(0)
    const [lastPageDraft, setLastPageDraft] = useState(0)
    const [lastPageClosed, setLastPageClosed] = useState(0)

    const [totalDataOpen, setTotalDataOpen] = useState(0)
    const [totalDataDraft, setTotalDataDraft] = useState(0)
    const [totalDataClosed, setTotalDataClosed] = useState(0)


    const [limit] = useState(10)

    useEffect(() => {
        // getHeight()
        window.scroll({ top: 0, behavior: "smooth" });
        getListJobVacancies('PUBLISHED', 1)
        getListJobVacancies('DRAFT', 1)
        getListJobVacancies('ARCHIVED', 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetch])

    const getListJobVacancies = (status, page) => {
        const param = {
            params: {
                sort_by: 'meta.created_at',
                sort_order: 'DESCENDING',
                page_number: page,
                page_size: limit,
                status: status,
                search: search
            }
        }
        JobVacanciesAPIs.getListVacancies(param)
            .then((res) => {
                let name = status
                switch (name) {
                    case 'PUBLISHED':
                        setLastPageOpen(Math.ceil((res.data.meta.paging.count / limit)))
                        setTotalDataOpen(res.data.meta.paging.count)
                        setDataOpen(res.data.data)
                        break;
                    case 'DRAFT':
                        setLastPageDraft(Math.ceil((res.data.meta.paging.count / limit)))
                        setTotalDataDraft(res.data.meta.paging.count)
                        setDataDraft(res.data.data)
                        break;
                    case 'ARCHIVED':
                        setLastPageClosed(Math.ceil((res.data.meta.paging.count / limit)))
                        setTotalDataClosed(res.data.meta.paging.count)
                        setDataClosed(res.data.data)
                        break;
                    default:
                        break;
                }
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    const handleFirst = (type) => {
        if (type === 'published') {
            setPageOpen(1)
            getListJobVacancies('PUBLISHED', 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(1)
            getListJobVacancies('DRAFT', 1)
            return
        }
        if (type === 'closed') {
            setPageClosed(1)
            getListJobVacancies('ARCHIVED', 1)
            return
        }
    }

    const handlePrev = (type) => {
        if (type === 'published') {
            setPageOpen(pageOpen - 1)
            getListJobVacancies('PUBLISHED', pageOpen - 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(pageDraft - 1)
            getListJobVacancies('DRAFT', pageDraft - 1)
            return
        }
        if (type === 'closed') {
            setPageClosed(pageClosed - 1)
            getListJobVacancies('ARCHIVED', pageClosed - 1)
            return
        }
    }
    const handleNext = (type) => {
        if (type === 'published') {
            setPageOpen(pageOpen + 1)
            getListJobVacancies('PUBLISHED', pageOpen + 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(pageDraft + 1)
            getListJobVacancies('DRAFT', pageDraft + 1)
            return
        }
        if (type === 'closed') {
            setPageClosed(pageClosed + 1)
            getListJobVacancies('ARCHIVED', pageClosed + 1)
            return
        }
    }

    const handleLast = (type) => {
        if (type === 'published') {
            setPageOpen(lastPageOpen)
            getListJobVacancies('PUBLISHED', lastPageOpen)
            return
        }
        if (type === 'draft') {
            setPageDraft(lastPageDraft)
            getListJobVacancies('DRAFT', lastPageDraft)
            return
        }
        if (type === 'closed') {
            setPageClosed(lastPageClosed)
            getListJobVacancies('ARCHIVED', lastPageClosed)
            return
        }
    }

    const handleToggle = (id) => {
        setActiveToogle(id)
    }

    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault();
        let toggle = activeToogle
        switch (toggle) {
            case '1':
                getListJobVacancies('PUBLISHED', 1)
                break;
            case '2':
                getListJobVacancies('DRAFT', 1)
                break;
            case '3':
                getListJobVacancies('ARCHIVED', 1)
                break;
            default:
                break;
        }
    }

    const handleChange = (e) => {
        let target = e.target.value;
        setSearch(target);
    }


    const handleDeleteData = (id) => {
        setIdDelete(id)
        setShowAlert(true)
        setAlerType(3)
        setAlertMessage(`Do you really want to delete this Data?`)
    }

    const confirmDeleteData = () => {
        JobVacanciesAPIs.permanentDeleteVacancy(idDelete)
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

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlerType] = useState(1)
    const [alertMessage, setAlertMessage] = useState('')

    const hideAlert = () => {
        setShowAlert(false)
        setIdDelete('')
        return
    }


    return (
        <div className="wrap-vacancies">
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
            <div className="wrap-inside-vacancies">
                <div className="heading-title">
                    <label>Job Vacancies</label>
                    <div className="wrap-breadcrumb div_flex" style={{ paddingBottom: '10px', alignItems: 'flex-start' }}>
                        <ListBreadcrumbs menu={'list'} name={'List Job Vacancies'} subMenu={''} url={'/job-portal/job-vacancies'} />
                        <div className="group-btn__job-header">
                            <Link style={{ color: 'inherit' }} to={"/job-portal/job-vacancies/search-candidates"}>
                                <button>
                                    Search Skill
                                </button>
                            </Link>
                            <Link to={{ pathname: "/job-portal/job-vacancies/add/1" }}>
                                <button className="primary-btn">Add a Job</button>
                            </Link>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="blockTabs" style={{ display: 'flex' }}>
                            <button className={activeToogle === '1' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('1')}>Open<label className="total-slider">{totalDataOpen}</label> </button>
                            <button className={activeToogle === '2' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('2')}>Draft<label className="total-slider">{totalDataDraft}</label></button>
                            <button className={activeToogle === '3' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('3')}>Closed<label className="total-slider">{totalDataClosed}</label></button>
                        </div>
                        <div>
                            <form autoComplete="off" onSubmit={handleSearch}>
                                <div className="navbar-search">
                                    <button type="submit"><ImIcons.ImSearch /></button>
                                    <input
                                        title="search"
                                        style={{ color: 'black' }}
                                        onChange={handleChange}
                                        placeholder="Search for Job or keywords"
                                        name="search"
                                        value={search}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="wrap-list-job-vacancies">
                    <label>Sort by : Date Modified</label>

                    {/* List Job Closed */}
                    <div style={{ display: activeToogle === '3' ? 'block' : 'none' }}>
                        {!isEmpty(dataClosed) && dataClosed.map((item, i) => (
                            <div key={i} style={{ padding: '10px 0px' }}>
                                <div className="wrap-list-job">
                                    <div className="wrap-detail-job div_flex">
                                        <div className="wrap-content-job">
                                            <label>{item.title}</label>
                                            <div className="wrap-informatin-job">
                                                <label>{item.location.district + ',' + item.location.regency + ', ' + item.location.province}</label>
                                                <label>{item.type}</label>
                                                <label>{item.experience_level}</label>
                                                <label>{item.category.category}</label>
                                            </div>
                                        </div>
                                        <div className="wrap-btn-content-job">
                                            <button className="primary-btn">Closed</button>
                                        </div>
                                    </div>
                                    <div className="wrap-list-candidate div_flex">
                                        <div className="wrap-total-candidate">
                                            <label><b>{item.recruitment_status_count.REJECTED === null ? 0 : item.recruitment_status_count.REJECTED}</b> Rejected</label>
                                            <label><b>{item.recruitment_status_count.PENDING === null ? 0 : item.recruitment_status_count.PENDING}</b> Pending Candidates</label>
                                            <label><b>{item.recruitment_status_count.APPROVED === null ? 0 : item.recruitment_status_count.APPROVED}</b> Approved Candidates</label>
                                            <label><b>{item.recruitment_status_count.INTERVIEW === null ? 0 : item.recruitment_status_count.INTERVIEW}</b> Interviews</label>
                                            <label><b>{item.recruitment_status_count.OFFERED === null ? 0 : item.recruitment_status_count.OFFERED}</b> Offered</label>
                                            <label><b>{item.recruitment_status_count.HIRED === null ? 0 : item.recruitment_status_count.HIRED}</b> Hired</label>
                                        </div>
                                        <div className="btn-list-candidate">
                                            <Link to={`/job-portal/job-vacancies/list-candidates/${item.id}`}>
                                                <button className="secondary-btn">List Candidates</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <hr style={{ margin: '10px 0px' }} />
                                    <div className="wrap-btm-detail-job div_flex">
                                        <div className="wrap-date-job">
                                            <label>{"Posted at " + moment(item.meta.published_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                            <label>{"Modified at " + moment(item.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                        </div>
                                        <div className="wrap-update-detail-job">
                                            <Link to={{ pathname: `/job-portal/job-vacancies/reopen/${item.id}` }} className="a-href-label" style={{ marginRight: '1rem' }}>Reopen</Link>
                                            <label onClick={() => handleDeleteData(item.id)} className="a-href-label">Delete</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!isEmpty(dataClosed) ?
                            <div className="wrap-button-pagination" style={{ padding: '0px' }}>
                                <div className="d-flex">
                                    <div className="p-2 flex-grow-1">
                                    </div>
                                    <div className="p-2">
                                        <div className="group-button" role="group" aria-label="Basic example">
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageClosed * limit - limit + 1}</label> to <label>{totalDataClosed > limit * pageClosed ? (limit * pageClosed) : (totalDataClosed)}</label> of Total <label>{totalDataClosed}</label></label>
                                            <button type="button" className="btn" onClick={() => handleFirst('closed')} style={{ fontWeight: '600' }} disabled={pageClosed === 1}>First</button>
                                            <button type="button" className="btn" onClick={() => handlePrev('closed')} style={{ fontWeight: '600' }} disabled={pageClosed === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={() => handleNext('closed')} style={{ fontWeight: '600' }} disabled={pageClosed === lastPageClosed}>Next</button>
                                            <button type="button" className="btn" onClick={() => handleLast('closed')} style={{ fontWeight: '600' }} disabled={pageClosed === lastPageClosed}>Last</button>
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
                                            <label>{item.title === "" ? "No Title" : item.title}</label>
                                            <div className="wrap-informatin-job">
                                                <label>{item.location.district === "" ? "No Location" : item.location.district + ',' + item.location.regency}</label>
                                                <label>{item.type === "0" || item.type === "" ? "No Job Type" : item.type}</label>
                                                <label>{item.experience_level === "" ? "No Work Experience" : item.experience_level}</label>
                                                <label>{item.category.category === null ? "No Job Category" : item.category.category}</label>
                                            </div>
                                        </div>
                                        <div className="wrap-btn-content-job">
                                            <button className="primary-btn">Draft</button>
                                        </div>
                                    </div>
                                    <hr style={{ margin: '10px 0px' }} />
                                    <div className="wrap-btm-detail-job div_flex">
                                        <div className="wrap-date-job">
                                            <label>{"Created at " + moment(item.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                            <label>{"Modified at " + moment(item.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                        </div>
                                        <div className="wrap-update-detail-job">
                                            <Link to={{ pathname: `/job-portal/job-vacancies/edit/${item.id}` }} className="a-href-label" style={{ marginRight: '1rem' }}>Edit Draft</Link>
                                            <label onClick={() => handleDeleteData(item.id)} className="a-href-label">Delete</label>
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

                    {/* List Job Open*/}
                    <div style={{ display: activeToogle === '1' ? 'block' : 'none' }}>
                        {!isEmpty(dataOpen) && dataOpen.map((item, i) => (
                            <div key={i} style={{ padding: '10px 0px' }}>
                                <div className="wrap-list-job">
                                    <div className="wrap-detail-job div_flex">
                                        <div className="wrap-content-job">
                                            <label>{item.title}</label>
                                            <div className="wrap-informatin-job">
                                                <label>{item.location.district + ',' + item.location.regency}</label>
                                                <label>{item.type}</label>
                                                <label>{item.experience_level}</label>
                                                <label>{item.category.category}</label>
                                            </div>
                                        </div>
                                        <div className="wrap-btn-content-job">
                                            <button className="primary-btn">Open</button>
                                        </div>
                                    </div>
                                    <div className="wrap-list-candidate div_flex">
                                        <div className="wrap-total-candidate">
                                            <label><b>{item.recruitment_status_count.REJECTED === null ? 0 : item.recruitment_status_count.REJECTED}</b> Rejected</label>
                                            <label><b>{item.recruitment_status_count.PENDING === null ? 0 : item.recruitment_status_count.PENDING}</b> Pending Candidates</label>
                                            <label><b>{item.recruitment_status_count.APPROVED === null ? 0 : item.recruitment_status_count.APPROVED}</b> Approved Candidates</label>
                                            <label><b>{item.recruitment_status_count.INTERVIEW === null ? 0 : item.recruitment_status_count.INTERVIEW}</b> Interviews</label>
                                            <label><b>{item.recruitment_status_count.OFFERED === null ? 0 : item.recruitment_status_count.OFFERED}</b> Offered</label>
                                            <label><b>{item.recruitment_status_count.HIRED === null ? 0 : item.recruitment_status_count.HIRED}</b> Hired</label>
                                        </div>
                                        <div className="btn-list-candidate">
                                            <Link to={`/job-portal/job-vacancies/list-candidates/${item.id}`}>
                                                <button className="secondary-btn">List Candidates</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <hr style={{ margin: '10px 0px' }} />
                                    <div className="wrap-btm-detail-job div_flex">
                                        <div className="wrap-date-job">
                                            <label>{"Posted at " + moment(item.meta.published_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                            <label>{"Modified at " + moment(item.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                        </div>
                                        <div className="wrap-update-detail-job">
                                            <Link to={{ pathname: `/job-portal/job-vacancies/edit/${item.id}` }} className="a-href-label">{'Edit Job'}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!isEmpty(dataOpen) ?
                            <div className="wrap-button-pagination" style={{ padding: '0px' }}>
                                <div className="d-flex">
                                    <div className="p-2 flex-grow-1">
                                    </div>
                                    <div className="p-2" style={{}}>
                                        <div className="group-button" role="group" aria-label="Basic example">
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageOpen * limit - limit + 1}</label> to <label>{totalDataOpen > limit * pageOpen ? (limit * pageOpen) : (totalDataOpen)}</label> of Total <label>{totalDataOpen}</label></label>
                                            <button type="button" className="btn" onClick={() => handleFirst('published')} style={{ fontWeight: '600' }} disabled={pageOpen === 1}>First</button>
                                            <button type="button" className="btn" onClick={() => handlePrev('published')} style={{ fontWeight: '600' }} disabled={pageOpen === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={() => handleNext('published')} style={{ fontWeight: '600' }} disabled={pageOpen === lastPageOpen}>Next</button>
                                            <button type="button" className="btn" onClick={() => handleLast('published')} style={{ fontWeight: '600' }} disabled={pageOpen === lastPageOpen}>Last</button>
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
