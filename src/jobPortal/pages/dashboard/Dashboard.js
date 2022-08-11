import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import industries from '../../../assets/dashboard/industries.png'
import insights from '../../../assets/dashboard/insights.png'
import services from '../../../assets/dashboard/services.png'
import topic from '../../../assets/dashboard/topic.png'
import { isEmpty } from 'lodash'
import StatisticsAPIs from '../../../services/StatisticsAPIs'

export default function Dashboard() {
    const [data, setData] = useState(null)

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        getStatistics()
    }, [])

    const getStatistics = () => {
        StatisticsAPIs.listStatistics()
            .then((res) => {
                let data = res.data.data
                let open = ''
                let closed = ''
                let total = ''
                let monthly = ''
                data.forEach(element => {
                    if (element.id === "VACANCY_OPEN") {
                        open = element.value
                    }
                    if (element.id === "VACANCY_CLOSE") {
                        closed = element.value
                    }
                    if (element.id === "RECRUITMENT_TOTAL") {
                        total = element.value
                    }
                    if (element.id === "RECRUITMENT_MONTHLY") {
                        monthly = element.value
                    }
                });
                const contentDashboard = [
                    {
                        id: 1, name: 'Job Vacancies', child: [
                            { id: 1, name: 'Open', total: open, img: industries },
                            { id: 2, name: 'Closed', total: closed, img: services },
                        ]
                    },
                    {
                        id: 2, name: 'Job Applicants', child: [
                            { id: 1, name: 'Total', total: total, img: topic },
                            { id: 2, name: 'This Month', total: monthly, img: insights },
                        ]
                    },
                ]
                setData(contentDashboard)
            })
    }

    return (
        <div className="wrap-dashboard">
            <div className="wrap-inside-dashboard__job">
                <div className="wrap-all-card">
                    {!isEmpty(data) && data.map((v, i) => (
                        <div key={i} style={{ textAlign: 'left', paddingBottom: '50px' }}>
                            <label className="label-head--card">{v.name}</label>
                            <div className="wrap-card__job" >
                                {!isEmpty(v.child) && v.child.map((item, x) => (
                                    <div key={x} className="wrap-inside-card__job">
                                        <label>{item.total}</label>
                                        <p>{item.name}</p>
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
