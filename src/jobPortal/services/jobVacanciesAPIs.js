import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

// list apis for dropdown
const listBenefit = () => {
    return instance.get(`vacancy/list_benefit`, Header)
}

const listExperience = () => {
    return instance.get(`vacancy/list_experience`, Header)
}

const listLocation = () => {
    return instance.get(`vacancy/list_location`, Header)
}

const listSkills = () => {
    return instance.get(`vacancy/list_skill`, Header)
}

const listType = () => {
    return instance.get(`vacancy/list_type`, Header)
}



// CRUD List Vacancy
const getListVacancies = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`vacancy/vacancy`, paramsHeader)
}

const createNewVacancies = (data) => {
    return instance.post(`vacancy/vacancy`, data, Header)
}

const updateVacancyById = (id, data) => {
    return instance.put(`vacancy/vacancy/${id}`, data, Header)
}

const publishVacancy = (id) => {
    return instance.put(`vacancy/vacancy/${id}/publish`, null, Header)
}

const unPublishVacancy = (id) => {
    return instance.put(`vacancy/vacancy/${id}/unpublish`, null, Header)
}

const updateDetailsRequirements = (id, data) => {
    return instance.put(`vacancy/vacancy/${id}/requirements`, data, Header)
}

const updateAdditionalInformation = (id, data) => {
    return instance.put(`vacancy/vacancy/${id}/additional_information`, data, Header)
}

const updateDecriptionsVacancy = (id, data) => {
    return instance.put(`vacancy/vacancy/${id}/description`, data, Header)
}

const getVacancyById = (id) => {
    return instance.get(`vacancy/vacancy/${id}`, Header)
}

const getUnpublishVacancyById = (id) => {
    return instance.get(`vacancy/unpublished_vacancy/${id}`, Header)
}

const deleteVacancyById = (id) => {
    return instance.delete(`vacancy/vacancy/${id}`, Header)
}

const getDetailsRequirements = (id) => {
    return instance.get(`vacancy/vacancy/${id}/requirements`, Header)
}

const getAdditionalInformation = (id) => {
    return instance.get(`vacancy/vacancy/${id}/additional_information`, Header)
}

const getDecriptionsVacancy = (id) => {
    return instance.get(`vacancy/vacancy/${id}/description`, Header)
}

const getUnpublishDetailsRequirements = (id) => {
    return instance.get(`vacancy/unpublished_vacancy/${id}/requirements`, Header)
}

const getUnpublishAdditionalInformation = (id) => {
    return instance.get(`vacancy/unpublished_vacancy/${id}/additional_information`, Header)
}

const getUnpublishDecriptionsVacancy = (id) => {
    return instance.get(`vacancy/unpublished_vacancy/${id}/description`, Header)
}

const permanentDeleteVacancy = (id) => {
    return instance.delete(`vacancy/vacancy/${id}/delete`, Header)
}


const JobVacanciesAPIs = {
    listBenefit,
    listExperience,
    listLocation,
    listSkills,
    listType,
    getListVacancies,
    createNewVacancies,
    publishVacancy,
    unPublishVacancy,
    updateDetailsRequirements,
    updateAdditionalInformation,
    updateDecriptionsVacancy,
    getVacancyById,
    updateVacancyById,
    getDetailsRequirements,
    getAdditionalInformation,
    getDecriptionsVacancy,
    getUnpublishDetailsRequirements,
    getUnpublishAdditionalInformation,
    getUnpublishDecriptionsVacancy,
    deleteVacancyById,
    getUnpublishVacancyById,
    permanentDeleteVacancy
}

export default JobVacanciesAPIs