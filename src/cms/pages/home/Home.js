import React, { useState, useEffect } from 'react'
import './Home.css'
import ListBreadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { isEmpty } from 'lodash'
import * as moment from 'moment'
import ContentAPIs from '../../../services/ContentAPIs'
import { Link } from 'react-router-dom'

export default function Home() {
    const [activeToogle, setActiveToogle] = useState('1')
    const [slider1, setSlider1] = useState(null)
    const [slider2, setSlider2] = useState(null)
    const [slider3, setSlider3] = useState(null)
    const [slider4, setSlider4] = useState(null)
    const [pageSlider1, setpageSlider1] = useState(1)
    const [pageSlider2, setpageSlider2] = useState(1)
    const [pageSlider3, setpageSlider3] = useState(1)
    const [pageSlider4, setpageSlider4] = useState(1)
    const [limit] = useState(10)

    const handleToggle = (id) => {
        setActiveToogle(id)
    }

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        getlistSlider('1')
        getlistSlider('2')
        getlistSlider('3')
        getlistSlider('4')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getlistSlider = (index) => {
        const param = {
            params: {
                sort_order: 'DESCENDING',
                index: index,
            }
        }
        ContentAPIs.getListSliderByIndex(param)
            .then((res) => {
                switch (index) {
                    case '1':
                        setSlider1(paginator(res.data.data, pageSlider1, limit))
                        break;
                    case '2':
                        setSlider2(paginator(res.data.data, pageSlider2, limit))
                        break;
                    case '3':
                        setSlider3(paginator(res.data.data, pageSlider3, limit))
                        break;
                    case '4':
                        setSlider4(paginator(res.data.data, pageSlider4, limit))
                        break;
                    default:
                        break;
                }
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }


    const paginator = (items, current_page, per_page_items) => {
        let page = current_page || 1,
            per_page = per_page_items || 10,
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
        switch (activeToogle) {
            case '1':
                setSlider1(paginator(slider1.allData, 1, limit))
                setpageSlider1(1)
                break;
            case '2':
                setSlider2(paginator(slider2.allData, 1, limit))
                setpageSlider2(1)
                break;
            case '3':
                setSlider3(paginator(slider3.allData, 1, limit))
                setpageSlider3(1)
                break;
            case '4':
                setSlider4(paginator(slider4.allData, 1, limit))
                setpageSlider4(1)
                break;
            default:
                break;
        }
    }

    const handlePrev = () => {
        switch (activeToogle) {
            case '1':
                setSlider1(paginator(slider1.allData, pageSlider1 - 1, limit))
                setpageSlider1(pageSlider1 - 1)
                break;
            case '2':
                setSlider2(paginator(slider2.allData, pageSlider2 - 1, limit))
                setpageSlider2(pageSlider2 - 1)
                break;
            case '3':
                setSlider3(paginator(slider3.allData, pageSlider3 - 1, limit))
                setpageSlider3(pageSlider3 - 1)
                break;
            case '4':
                setSlider4(paginator(slider4.allData, pageSlider4 - 1, limit))
                setpageSlider4(pageSlider4 - 1)
                break;
            default:
                break;
        }
    }
    const handleNext = () => {
        switch (activeToogle) {
            case '1':
                setSlider1(paginator(slider1.allData, pageSlider1 + 1, limit))
                setpageSlider1(pageSlider1 + 1)
                break;
            case '2':
                setSlider2(paginator(slider2.allData, pageSlider2 + 1, limit))
                setpageSlider2(pageSlider2 + 1)
                break;
            case '3':
                setSlider3(paginator(slider3.allData, pageSlider3 + 1, limit))
                setpageSlider3(pageSlider3 + 1)
                break;
            case '4':
                setSlider4(paginator(slider4.allData, pageSlider4 + 1, limit))
                setpageSlider4(pageSlider4 + 1)
                break;
            default:
                break;
        }
    }

    const handleLast = () => {
        switch (activeToogle) {
            case '1':
                setSlider1(paginator(slider1.allData, slider1.total_pages, limit))
                setpageSlider1(slider1.total_pages)
                break;
            case '2':
                setSlider2(paginator(slider2.allData, slider2.total_pages, limit))
                setpageSlider2(slider2.total_pages)
                break;
            case '3':
                setSlider3(paginator(slider3.allData, slider3.total_pages, limit))
                setpageSlider3(slider3.total_pages)
                break;
            case '4':
                setSlider4(paginator(slider4.allData, slider4.total_pages, limit))
                setpageSlider4(slider4.total_pages)
                break;
            default:
                break;
        }
    }

    return (
        <div className="wrap-home">
            <div className="wrap-nside-home">
                <div className="heading-title">
                    <label>Homepage</label>
                    <div className="wrap-breadcrumb">
                        <ListBreadcrumbs menu={'list'} name={'Homepage'} subMenu={''} url={'/website-cms/home'} />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="blockTabs" style={{ display: 'flex' }}>
                        <button className={activeToogle === '1' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('1')}>Slider 1 <label className="total-slider">{!isEmpty(slider1) ? slider1.total : 0}</label> </button>
                        <button className={activeToogle === '2' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('2')}>Slider 2<label className="total-slider">{!isEmpty(slider2) ? slider2.total : 0}</label></button>
                        <button className={activeToogle === '3' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('3')}>Slider 3<label className="total-slider">{!isEmpty(slider3) ? slider3.total : 0}</label></button>
                        <button className={activeToogle === '4' ? "button-tabs__home button-tabs__home-active" : "button-tabs__home"} onClick={() => handleToggle('4')}>Slider 4<label className="total-slider">{!isEmpty(slider4) ? slider4.total : 0}</label></button>
                    </div>
                    <div className="wrap-add-btn" style={{ marginRight: '50px' }}>
                        <Link to={{ pathname: "/website-cms/home/form/add/1" }}>
                            <button className="primary-btn">Add Slider</button>
                        </Link>
                    </div>
                </div>

                {/* Slider */}
                <div className="wrap-content-toogle">

                    {/* Slider 1 */}
                    <div style={{ display: activeToogle === '1' ? 'block' : 'none' }}>
                        {!isEmpty(slider1) && slider1.data.map((v, i) => (
                            <div key={i} className="content-toogle">
                                <div className="heading-content-toogle">
                                    <label>{v.title.slice(0, 45)}</label>
                                    <button>{v.active === true ? 'Active' : 'Inactive'}</button>
                                </div>
                                <div className="detail-content-toogle">
                                    <div className="detail-content-toogle">
                                        <label>{v.tagline.slice(0, 60)}</label><br />
                                        <label>{"Created at " + moment(v.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                        <label>{"Modified at " + moment(v.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                    </div>
                                    {v.active === true ?
                                        <Link to={{ pathname: `/website-cms/home/form/edit/${v.id}` }} className="link-href">Edit Slider</Link>
                                        :
                                        <Link to={{ pathname: `/website-cms/home/form/detail/${v.id}` }} className="link-href">Detail Slider</Link>
                                    }
                                </div>
                                <hr style={{ marginTop: '5px', marginLeft: '50px', marginRight: '50px' }} />
                            </div>
                        ))}

                        {!isEmpty(slider1) ?
                            <div className="wrap-button-pagination">
                                <div className="d-flex">
                                    <div className="p-2 flex-grow-1">
                                    </div>
                                    <div className="p-2">
                                        <div className="group-button" role="group" aria-label="Basic example">
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageSlider1 * limit - limit + 1}</label> to <label>{slider1.total > limit * pageSlider1 ? (limit * pageSlider1) : (slider1.total)}</label> of Total <label>{slider1.total}</label></label>
                                            <button type="button" className="btn" onClick={handleFirst} style={{ fontWeight: '600' }} disabled={pageSlider1 === 1}>First</button>
                                            <button type="button" className="btn" onClick={handlePrev} style={{ fontWeight: '600' }} disabled={pageSlider1 === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={handleNext} style={{ fontWeight: '600' }} disabled={pageSlider1 === slider1.total_pages}>Next</button>
                                            <button type="button" className="btn" onClick={handleLast} style={{ fontWeight: '600' }} disabled={pageSlider1 === slider1.total_pages}>Last</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>

                    {/* Slider 2 */}
                    <div style={{ display: activeToogle === '2' ? 'block' : 'none' }}>
                        {!isEmpty(slider2) && slider2.data.map((v, i) => (
                            <div key={i} className="content-toogle">
                                <div className="heading-content-toogle">
                                    <label>{v.title.slice(0, 45)}</label>
                                    <button>{v.active === true ? 'Active' : 'Inactive'}</button>
                                </div>
                                <div className="detail-content-toogle">
                                    <div className="detail-content-toogle">
                                        <label>{v.tagline.slice(0, 60)}</label><br />
                                        <label>{"Created at " + moment(v.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                        <label>{"Modified at " + moment(v.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                    </div>
                                    {v.active === true ?
                                        <Link to={{ pathname: `/website-cms/home/form/edit/${v.id}` }} className="link-href">Edit Slider</Link>
                                        :
                                        <Link to={{ pathname: `/website-cms/home/form/detail/${v.id}` }} className="link-href">Detail Slider</Link>
                                    }
                                </div>
                                <hr style={{ marginTop: '5px', marginLeft: '50px', marginRight: '50px' }} />
                            </div>
                        ))}

                        {!isEmpty(slider2) ?
                            <div className="wrap-button-pagination">
                                <div className="d-flex">
                                    <div className="p-2 flex-grow-1">
                                    </div>
                                    <div className="p-2">
                                        <div className="group-button" role="group" aria-label="Basic example">
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageSlider2 * limit - limit + 1}</label> to <label>{slider2.total > limit * pageSlider2 ? (limit * pageSlider2) : (slider2.total)}</label> of Total <label>{slider2.total}</label></label>
                                            <button type="button" className="btn" onClick={handleFirst} style={{ fontWeight: '600' }} disabled={pageSlider2 === 1}>First</button>
                                            <button type="button" className="btn" onClick={handlePrev} style={{ fontWeight: '600' }} disabled={pageSlider2 === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={handleNext} style={{ fontWeight: '600' }} disabled={pageSlider2 === slider2.total_pages}>Next</button>
                                            <button type="button" className="btn" onClick={handleLast} style={{ fontWeight: '600' }} disabled={pageSlider2 === slider2.total_pages}>Last</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>

                    {/* Slider 3 */}
                    <div style={{ display: activeToogle === '3' ? 'block' : 'none' }}>
                        {!isEmpty(slider3) && slider3.data.map((v, i) => (
                            <div key={i} className="content-toogle">
                                <div className="heading-content-toogle">
                                    <label>{v.title.slice(0, 45)}</label>
                                    <button>{v.active === true ? 'Active' : 'Inactive'}</button>
                                </div>
                                <div className="detail-content-toogle">
                                    <div className="detail-content-toogle">
                                        <label>{v.tagline.slice(0, 60)}</label><br />
                                        <label>{"Created at " + moment(v.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                        <label>{"Modified at " + moment(v.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                    </div>
                                    {v.active === true ?
                                        <Link to={{ pathname: `/website-cms/home/form/edit/${v.id}` }} className="link-href">Edit Slider</Link>
                                        :
                                        <Link to={{ pathname: `/website-cms/home/form/detail/${v.id}` }} className="link-href">Detail Slider</Link>
                                    }                             </div>
                                <hr style={{ marginTop: '5px', marginLeft: '50px', marginRight: '50px' }} />
                            </div>
                        ))}

                        {!isEmpty(slider3) ?
                            <div className="wrap-button-pagination">
                                <div className="d-flex">
                                    <div className="p-2 flex-grow-1">
                                    </div>
                                    <div className="p-2">
                                        <div className="group-button" role="group" aria-label="Basic example">
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageSlider3 * limit - limit + 1}</label> to <label>{slider3.total > limit * pageSlider3 ? (limit * pageSlider3) : (slider3.total)}</label> of Total <label>{slider3.total}</label></label>
                                            <button type="button" className="btn" onClick={handleFirst} style={{ fontWeight: '600' }} disabled={pageSlider3 === 1}>First</button>
                                            <button type="button" className="btn" onClick={handlePrev} style={{ fontWeight: '600' }} disabled={pageSlider3 === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={handleNext} style={{ fontWeight: '600' }} disabled={pageSlider3 === slider3.total_pages}>Next</button>
                                            <button type="button" className="btn" onClick={handleLast} style={{ fontWeight: '600' }} disabled={pageSlider3 === slider3.total_pages}>Last</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>

                    {/* Slider 4 */}
                    <div style={{ display: activeToogle === '4' ? 'block' : 'none' }}>
                        {!isEmpty(slider4) && slider4.data.map((v, i) => (
                            <div key={i} className="content-toogle">
                                <div className="heading-content-toogle">
                                    <label>{v.title.slice(0, 45)}</label>
                                    <button>{v.active === true ? 'Active' : 'Inactive'}</button>
                                </div>
                                <div className="detail-content-toogle">
                                    <div className="detail-content-toogle">
                                        <label>{v.tagline.slice(0, 60)}</label><br />
                                        <label>{"Created at " + moment(v.meta.created_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                        <label>{"Modified at " + moment(v.meta.updated_at).format('DD MMMM YYYY, hh:mm:ss A')}</label>
                                    </div>
                                    {v.active === true ?
                                        <Link to={{ pathname: `/website-cms/home/form/edit/${v.id}` }} className="link-href">Edit Slider</Link>
                                        :
                                        <Link to={{ pathname: `/website-cms/home/form/detail/${v.id}` }} className="link-href">Detail Slider</Link>
                                    }                           </div>
                                <hr style={{ marginTop: '5px', marginLeft: '50px', marginRight: '50px' }} />
                            </div>
                        ))}

                        {!isEmpty(slider4) ?
                            <div className="wrap-button-pagination">
                                <div className="d-flex">
                                    <div className="p-2 flex-grow-1">
                                    </div>
                                    <div className="p-2">
                                        <div className="group-button" role="group" aria-label="Basic example">
                                            <label className="pagination-info" style={{ margin: '0px', paddingRight: '10px', fontSize: '12px' }}>Showing Row <label>{pageSlider4 * limit - limit + 1}</label> to <label>{slider4.total > limit * pageSlider4 ? (limit * pageSlider4) : (slider4.total)}</label> of Total <label>{slider4.total}</label></label>
                                            <button type="button" className="btn" onClick={handleFirst} style={{ fontWeight: '600' }} disabled={pageSlider4 === 1}>First</button>
                                            <button type="button" className="btn" onClick={handlePrev} style={{ fontWeight: '600' }} disabled={pageSlider4 === 1}>Prev</button>
                                            <button type="button" className="btn" onClick={handleNext} style={{ fontWeight: '600' }} disabled={pageSlider4 === slider4.total_pages}>Next</button>
                                            <button type="button" className="btn" onClick={handleLast} style={{ fontWeight: '600' }} disabled={pageSlider4 === slider4.total_pages}>Last</button>
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
