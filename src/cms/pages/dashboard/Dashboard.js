import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import industries from '../../../assets/dashboard/industries.png'
import insights from '../../../assets/dashboard/insights.png'
import clients from '../../../assets/dashboard/clients.png'
import services from '../../../assets/dashboard/services.png'
import subscribe from '../../../assets/dashboard/subscribes.png'
import Webinars from '../../../assets/dashboard/webinars.png'
import topic from '../../../assets/dashboard/topic.png'
import NumberFormat from 'react-number-format'
import { isEmpty } from 'lodash'
import StatisticsAPIs from '../../../services/StatisticsAPIs'

export default function Dashboard() {
    const [listStatistics, setListStatistics] = useState(null)

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        getStatistics()
    }, [])

    const getStatistics = () => {
        StatisticsAPIs.listStatistics()
            .then((res) => {
                let contentDashboard = [
                    {
                        id: 1, name: 'Contents', child: [
                            { id: 1, name: 'Industries', total: 0, img: industries },
                            { id: 2, name: 'Services', total: 0, img: services },
                            { id: 3, name: 'Clients', total: 0, img: clients },
                        ]
                    },
                    {
                        id: 2, name: 'Insights', child: [
                            { id: 1, name: 'Topic', total: 0, img: topic },
                            { id: 2, name: 'Published Insights', total: 0, img: insights },
                            {
                                id: 3, name: 'Webinars', img: Webinars, child: [
                                    { id: 1, name: 'Recorded', total: 0 },
                                    { id: 2, name: 'Upcoming', total: 0 },
                                ]
                            },
                        ]
                    },
                    {
                        id: 3, name: 'Subscription', child: [
                            { id: 1, name: 'Total Subscribers', total: 0, img: subscribe },
                            { id: 1, name: 'This Month +', total: 0, img: subscribe },
                        ]
                    },
                ]
                let data = res.data.data
                data.forEach(element => {
                    element.id === "INDUSTRY_COUNT" ? contentDashboard[0].child[0].total = element.value :
                        element.id === "SERVICE_COUNT" ? contentDashboard[0].child[1].total = element.value :
                            element.id === "CLIENTS_COUNT" ? contentDashboard[0].child[2].total = element.value :
                                element.id === "TOPIC_COUNT" ? contentDashboard[1].child[0].total = element.value :
                                    element.id === "ARTICLE_COUNT" ? contentDashboard[1].child[1].total = element.value :
                                        element.id === "WEBINAR_RECORDED_COUNT" ? contentDashboard[1].child[2].child[0].total = element.value :
                                            element.id === "WEBINAR_UPCOMING_COUNT" ? contentDashboard[1].child[2].child[1].total = element.value :
                                                element.id === "SUBSCRIPTION_COUNT" ? contentDashboard[2].child[0].total = element.value :
                                                    element.id === "SUBSCRIPTION_MONTHLY" && (contentDashboard[2].child[1].total = element.value)
                });
                setListStatistics(contentDashboard)
            })
    }

    return (
        <div className="wrap-dashboard">
            <div className="wrap-inside-dashboard">
                <div className="wrap-all-card">
                    {!isEmpty(listStatistics) && listStatistics.map((v, i) => (
                        <div key={i} style={{ textAlign: 'left', marginBottom: '30px' }}>
                            <label className="label-head--card">{v.name}</label>
                            <div className="wrap-card" >
                                {!isEmpty(v.child) && v.child.map((item, x) => (
                                    <div key={x} className="wrap-inside-card" style={{ backgroundImage: "url(" + item.img + ")", padding: !isEmpty(item.child) && '1rem', textAlign: !isEmpty(item.child) && 'center' }}>
                                        {!isEmpty(item.child) ?
                                            <>
                                                <label className="dashboard-label-webinar">Webinars</label>
                                                <div className="wrap-webinars-dashboard">
                                                    {item.child.map((data, index) => (
                                                        <div key={index}>
                                                            <p style={{ marginBottom: '0.2rem' }}>{data.name}</p>
                                                            <NumberFormat decimalSeparator="." style={{}} value={data.total} displayType={'text'} thousandSeparator={true} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                            :
                                            <>
                                                <NumberFormat decimalSeparator="." style={{}} value={item.total} displayType={'text'} thousandSeparator={true} />
                                                <p>{item.name}</p>
                                            </>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
