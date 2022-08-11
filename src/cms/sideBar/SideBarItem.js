import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as IcIcons from "react-icons/io5";

export const SidebarItem = [
    {
        title: 'Dashboard',
        route: 'website-cms',
        path: '/website-cms',
        icon: <IcIcons.IoTimerSharp style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text',
    },
    {
        title: 'Home Page',
        route: 'home',
        path: '/website-cms/home',
        icon: <IcIcons.IoHome style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text',
    },
    {
        title: 'Clients',
        route: 'clients',
        path: '/website-cms/clients',
        icon: <IcIcons.IoBusinessSharp style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text',
    },
    {
        title: 'Industries',
        route: 'industries',
        path: '/website-cms/industries',
        icon: <FaIcons.FaIndustry style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text',
    },
    {
        title: 'Services',
        route: 'services',
        path: '/website-cms/services',
        icon: <FaIcons.FaScrewdriver style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text',
    },
    {
        title: 'Insights',
        route: 'job-vacancies',
        path: '#',
        icon: <IcIcons.IoNewspaper style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text-a',
        child: [
            {
                title: 'Topics',
                route: 'topics',
                path: '/website-cms/topics',
                icon: <FaIcons.FaThList style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
                cName: 'nav-text'
            },
            {
                title: 'Articles',
                route: 'articles',
                path: '/website-cms/articles',
                icon: <IcIcons.IoPersonAddSharp style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
                cName: 'nav-text'
            },
            {
                title: 'Webinars',
                route: 'webinars',
                path: '/website-cms/webinars',
                icon: <IcIcons.IoPersonAddSharp style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
                cName: 'nav-text'
            },
        ]
    },
    {
        title: 'About Us',
        route: 'about-us',
        path: '#',
        icon: <BsIcons.BsFillInfoSquareFill style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text-a',
        child: [
            {
                title: 'Sigma People',
                route: 'people',
                path: '/website-cms/people',
                icon: <FaIcons.FaThList style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
                cName: 'nav-text'
            },
            {
                title: 'Sigma Alumni',
                route: 'alumni',
                path: '/website-cms/alumni',
                icon: <IcIcons.IoPersonAddSharp style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
                cName: 'nav-text'
            }
        ]
    },
    {
        title: 'Messages',
        route: 'messages',
        path: '/website-cms/messages',
        icon: <FaIcons.FaEnvelopeOpenText style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text-a margin-top-100'
    },
    {
        title: 'Subscriptions',
        route: 'subscriptions',
        path: '/website-cms/subscriptions',
        icon: <FaIcons.FaChartBar style={{ color: '#212529', fontWeight: 'bold', fontSize: '16px' }} />,
        cName: 'nav-text-a margin-top-100'
    },

];
