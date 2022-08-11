import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

// Industry
const getIndustries = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`organization/industry`, paramsHeader)
}

const addIndustries = (data) => {
    return instance.post(`organization/industry`, data, Header)
}

const getIndustryById = (id) => {
    return instance.get(`organization/industry/${id}`, Header)
}

const getIndustryOverviewById = (id) => {
    return instance.get(`organization/industry/${id}/overview`, Header)
}

const updateIndustryById = (id, data) => {
    return instance.put(`organization/industry/${id}`, data, Header)
}

const updateIndustryOverviewById = (id, data) => {
    return instance.put(`organization/industry/${id}/overview`, data, Header)
}

const updateIndustryTopicsById = (id, data) => {
    return instance.put(`organization/industry/${id}/tags`, data, Header)
}

const addIndustryClientsById = (idIndustry, IdClients) => {
    return instance.post(`organization/industry/${idIndustry}/clients/${IdClients}`, null, Header)
}

const deleteIndustryById = (id) => {
    return instance.delete(`organization/industry/${id}`, Header)
}

const deleteIndustryClientsById = (idIndustry, IdClients) => {
    return instance.delete(`organization/industry/${idIndustry}/clients/${IdClients}`, Header)
}

const uploadIndustryThumbnailById = (id, data) => {
    return instance.put(`organization/industry/${id}/thumbnail_image`, data, Header)
}

const uploadIndustryBannerById = (id, data) => {
    return instance.put(`organization/industry/${id}/banner_image`, data, Header)
}

// Publish and Unpublish APIs
const publishIndustryById = (id) => {
    return instance.put(`organization/industry/${id}/publish`, null, Header)
}

const unpublishIndustryById = (id) => {
    return instance.put(`organization/industry/${id}/unpublish`, null, Header)
}


// Services
const getServices = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`organization/service`, paramsHeader)
}

const addServices = (data) => {
    return instance.post(`organization/service`, data, Header)
}

const getServiceById = (id) => {
    return instance.get(`organization/service/${id}`, Header)
}

const deleteServiceById = (id) => {
    return instance.delete(`organization/service/${id}`, Header)
}

const getServiceOverviewById = (id) => {
    return instance.get(`organization/service/${id}/overview`, Header)
}

const updateServiceById = (id, data) => {
    return instance.put(`organization/service/${id}`, data, Header)
}

const uploadImageServiceById = (id, image) => {
    return instance.put(`organization/service/${id}/thumbnail_image`, image, Header)
}

const uploadBannerServiceById = (id, image) => {
    return instance.put(`organization/service/${id}/banner_image`, image, Header)
}

const updateServiceOverviewById = (id, data) => {
    return instance.put(`organization/service/${id}/overview`, data, Header)
}

const updateServiceTopicById = (id, topic) => {
    return instance.put(`organization/service/${id}/tags`, topic, Header)
}

// Publish and Unpublish APIs
const publishServiceById = (id) => {
    return instance.put(`organization/service/${id}/publish`, null, Header)
}

const unpublishServiceById = (id) => {
    return instance.put(`organization/service/${id}/unpublish`, null, Header)
}

const OrganizationAPIs = {
    getIndustries,
    addIndustries,
    getIndustryById,
    getIndustryOverviewById,
    updateIndustryTopicsById,
    updateIndustryOverviewById,
    deleteIndustryById,
    uploadIndustryThumbnailById,
    uploadIndustryBannerById,
    addIndustryClientsById,
    deleteIndustryClientsById,
    updateIndustryById,
    publishIndustryById,
    unpublishIndustryById,
    getServices,
    addServices,
    getServiceById,
    deleteServiceById,
    getServiceOverviewById,
    updateServiceById,
    uploadImageServiceById,
    updateServiceOverviewById,
    updateServiceTopicById,
    uploadBannerServiceById,
    publishServiceById,
    unpublishServiceById
}

export default OrganizationAPIs