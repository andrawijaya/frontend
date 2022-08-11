import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

//Job Categories 
const getListCategories = () => {
    return instance.get(`vacancy/job_category`, Header)
}

const createJobCategories = (data) => {
    return instance.post(`vacancy/job_category`, data, Header)
}

const getJobCategoriesById = (id) => {
    return instance.get(`vacancy/job_category/${id}`, Header)
}

const deleteJobCategories = (id) => {
    return instance.delete(`vacancy/job_category/${id}`, Header)
}

const updateJobCategories = (id, data) => {
    return instance.put(`vacancy/job_category/${id}`, data, Header)
}

// Job Roles
const getListJobRoles = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`vacancy/job_role`, paramsHeader)
}

const createJobRoles = (data) => {
    return instance.post(`vacancy/job_role`, data, Header)
}

const getJobRolesById = (id) => {
    return instance.get(`vacancy/job_role/${id}`, Header)
}

const deleteJobRoles = (id) => {
    return instance.delete(`vacancy/job_role/${id}`, Header)
}

const updateJobRoles = (id, data) => {
    return instance.put(`vacancy/job_role/${id}`, data, Header)
}


const masterDataAPIs = {
    getListCategories,
    createJobCategories,
    getJobCategoriesById,
    deleteJobCategories,
    updateJobCategories,
    getListJobRoles,
    createJobRoles,
    getJobRolesById,
    deleteJobRoles,
    updateJobRoles
}

export default masterDataAPIs