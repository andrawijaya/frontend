import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IcIcons from "react-icons/io5";

export const SidebarItem = [
    {
        title: 'Dashboard',
        path: '/job-portal',
        route: 'job-portal',
        icon: <IcIcons.IoTimerSharp style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text',
    },
    {
        title: 'Job Vacancies',
        route: 'job-vacancies',
        path: '/job-portal/job-vacancies',
        icon: <IcIcons.IoHome style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text',
    },
    {
        title: 'Master Data',
        path: '#',
        route: 'master-data',
        icon: <IcIcons.IoBusinessSharp style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text',
        child: [
            {
                title: 'Job Categories',
                path: '/job-portal/job-categories',
                route: 'job-categories',
                icon: <IcIcons.IoPersonAddSharp style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
                cName: 'nav-text'
            },
            {
                title: 'Job Roles',
                path: '/job-portal/job-roles',
                route: 'job-roles',
                icon: <FaIcons.FaThList style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
                cName: 'nav-text'
            },

        ]
    },
];
