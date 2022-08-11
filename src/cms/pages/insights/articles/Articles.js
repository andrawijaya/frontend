import React, { useState, useEffect } from 'react'
import ListBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import './Articles.css'
import * as ImIcons from 'react-icons/im'
import { isEmpty } from 'lodash'
import * as moment from 'moment'
import articlesCMSAPI from '../../../services/articlesCMSAPIs'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'

export default function Articles() {
    const [activeToogle, setActiveToogle] = useState('1')
    const [search, setSearch] = useState('')
    const [idData, setIdData] = useState('')

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

    const [limit] = useState(10)

    const [isFetch, setIsFetch] = useState(false)

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        getListArticles('PUBLISHED', 1)
        getListArticles('DRAFT', 1)
        getListArticles('ARCHIVED', 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetch])

    const getListArticles = (status, page) => {
        const param = {
            params: {
                sort_by: 'meta.updated_at',
                sort_order: 'DESCENDING',
                page_number: page,
                page_size: limit,
                status: status,
                search: search
            }
        }
        articlesCMSAPI.getListArticles(param)
            .then((res) => {
                if (res.data.code === 200) {
                    let name = status
                    switch (name) {
                        case 'PUBLISHED':
                            setLastPagePublished(Math.ceil((res.data.meta.paging.count / limit)))
                            setTotalDataPublished(res.data.meta.paging.count)
                            setDataPublished(res.data.data)
                            break;
                        case 'DRAFT':
                            setLastPageDraft(Math.ceil((res.data.meta.paging.count / limit)))
                            setTotalDataDraft(res.data.meta.paging.count)
                            setDataDraft(res.data.data)
                            break;
                        case 'ARCHIVED':
                            setLastPageArchived(Math.ceil((res.data.meta.paging.count / limit)))
                            setTotalDataArchived(res.data.meta.paging.count)
                            setDataArchived(res.data.data)
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
                alert(err.response.data.message)
            })
    }

    const handleFirst = (type) => {
        if (type === 'published') {
            setPagePublished(1)
            getListArticles('PUBLISHED', 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(1)
            getListArticles('DRAFT', 1)
            return
        }
        if (type === 'archived') {
            setPageArchived(1)
            getListArticles('ARCHIVED', 1)
            return
        }
    }

    const handlePrev = (type) => {
        if (type === 'published') {
            setPagePublished(pagePublished - 1)
            getListArticles('PUBLISHED', pagePublished - 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(pageDraft - 1)
            getListArticles('DRAFT', pageDraft - 1)
            return
        }
        if (type === 'archived') {
            setPageArchived(pageArchived - 1)
            getListArticles('ARCHIVED', pageArchived - 1)
            return
        }
    }
    const handleNext = (type) => {
        if (type === 'published') {
            setPagePublished(pagePublished + 1)
            getListArticles('PUBLISHED', pagePublished + 1)
            return
        }
        if (type === 'draft') {
            setPageDraft(pageDraft + 1)
            getListArticles('DRAFT', pageDraft + 1)
            return
        }
        if (type === 'archived') {
            setPageArchived(pageArchived + 1)
            getListArticles('ARCHIVED', pageArchived + 1)
            return
        }
    }

    const handleLast = (type) => {
        if (type === 'published') {
            setPagePublished(lastPagePublished)
            getListArticles('PUBLISHED', lastPagePublished)
            return
        }
        if (type === 'draft') {
            setPageDraft(lastPageDraft)
            getListArticles('DRAFT', lastPageDraft)
            return
        }
        if (type === 'archived') {
            setPageArchived(lastPageArchived)
            getListArticles('ARCHIVED', lastPageArchived)
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
                getListArticles('PUBLISHED', 1)
                break;
            case '2':
                getListArticles('DRAFT', 1)
                break;
            case '3':
                getListArticles('ARCHIVED', 1)
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
        let arr = []
        if (!isEmpty(data)) {
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
        }
        return outStr;
    }

    const handleShortcut = (id, status) => {
        setIdData(id)
        if (status === 'archive') {
            setShowAlert(true)
            setAlerType(3)
            setAlertMessage(`Do you really want to archived this Data?`)
        } else {
            articlesCMSAPI.restoreArticleById(id)
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
        articlesCMSAPI.deleteArticleById(idData)
            .then((res) => {
                if (res.data.code === 200) {
                    setShowAlert(true)
                    setAlerType(1)
                    setAlertMessage("Article has been moved to Archived!")
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
        <div className="wrap-artciles">
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
                    <label>Articles</label>
                    <div className="wrap-breadcrumb div_flex" style={{ paddingBottom: '10px', alignItems: 'flex-start' }}>
                        <ListBreadcrumbs menu={'list'} name={'Insights'} subMenu={`${'Articles'}`} url={'/website-cms/articles'} />
                        <div className="wrap-btn">
                            <Link to={{ pathname: "/website-cms/articles/form/add/1" }}>
                                <button className="primary-btn">Add an Article</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="wrap-content-insights">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="blockTabs" style={{ display: 'flex' }}>
                            <button className={activeToogle === '1' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('1')}>Published<label className="total-slider">{totalDataPublished}</label> </button>
                            <button className={activeToogle === '2' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('2')}>Draft<label className="total-slider">{totalDataDraft}</label></button>
                            <button className={activeToogle === '3' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('3')}>Archive<label className="total-slider">{totalDataArchived}</label></button>
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
                                                    <label>{isEmpty(item.authors) ? "No Authors" : formatArray(item.authors)}</label>
                                                </div>
                                            </div>
                                            <div className="wrap-btn-content-job">
                                                <button className="primary-btn">{'Published'}</button>
                                            </div>
                                        </div>
                                        <hr style={{ margin: '10px 0px' }} />
                                        <div className="wrap-btm-detail-job div_flex">
                                            <div className="wrap-date-job">
                                                <label>{"Published at " + moment(item.meta.published_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                                <label>{"Modified at " + moment(item.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                            </div>
                                            <div className="wrap-update-detail-job">
                                                <Link to={{ pathname: `/website-cms/articles/form/edit/${item.id}` }} className="a-href-label" style={{ marginRight: '1rem' }}>Edit</Link>
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
                                                    <label>{isEmpty(item.authors) ? "No Authors" : formatArray(item.authors)}</label>
                                                </div>
                                            </div>
                                            <div className="wrap-btn-content-job">
                                                <button className="primary-btn">{'Draft'}</button>
                                            </div>
                                        </div>
                                        <hr style={{ margin: '10px 0px' }} />
                                        <div className="wrap-btm-detail-job div_flex">
                                            <div className="wrap-date-job">
                                                <label>{"Posted at " + moment(item.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                                <label>{"Modified at " + moment(item.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                            </div>
                                            <div className="wrap-update-detail-job">
                                                <Link to={{ pathname: `/website-cms/articles/form/edit/${item.id}` }} className="a-href-label" style={{ marginRight: '1rem' }}>Edit</Link>
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
                                                    <label>{isEmpty(item.authors) ? "No Authors" : formatArray(item.authors)}</label>
                                                </div>
                                            </div>
                                            <div className="wrap-btn-content-job">
                                                <button className="primary-btn">{'Unpublished'}</button>
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
