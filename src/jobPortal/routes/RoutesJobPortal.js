import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SidebarJobPortal from '../sideBar/SidebarJobPortal.js'
import Dashboard from '../pages/dashboard/Dashboard'
import JobVacancies from '../pages/jobVacancies/JobVacancies'
import FormJobVacancies from '../pages/jobVacancies/FormJobVacancies/FormJobVacancies'
import JobCategories from '../pages/masterData/jobCategories/JobCategories'
import JobRoles from '../pages/masterData/jobRoles/JobRoles'
import FormJobRoles from '../pages/masterData/jobRoles/FormJobRoles'
import FormJobCategories from '../pages/masterData/jobCategories/FormJobCategories'
import ListCandidates from '../pages/jobVacancies/ListCandidates/ListCandidates'
import SearchCandidates from '../pages/jobVacancies/SearchCandidates/SearchCandidatesBySkills.js'

export default function RoutesJobPortal() {
    return (
        <div>
            <Router>
                <SidebarJobPortal />
                <div className="wrap-pages">
                    <Switch>
                        <Route path="/job-portal" exact component={Dashboard} />
                        <Route path="/job-portal/job-vacancies" exact component={JobVacancies} />
                        <Route path="/job-portal/job-vacancies/list-candidates/:id" exact component={ListCandidates} />
                        <Route path="/job-portal/job-vacancies/:type/:id" exact component={FormJobVacancies} />
                        <Route path="/job-portal/job-vacancies/search-candidates" exact component={SearchCandidates} />
                        <Route path="/job-portal/job-categories" exact component={JobCategories} />
                        <Route path="/job-portal/job-categories/:type/:id" exact component={FormJobCategories} />
                        <Route path="/job-portal/job-roles" exact component={JobRoles} />
                        <Route path="/job-portal/job-roles/:type/:id" exact component={FormJobRoles} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}