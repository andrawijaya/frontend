import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

// People
const getListPeople = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`team/people`, paramsHeader)
}
const getPeopleById = (id) => {
    return instance.get(`team/people/${id}`, Header)
}

const addPeople = (data) => {
    return instance.post(`team/people`, data, Header)
}

const updatePeopleById = (id, data) => {
    return instance.put(`team/people/${id}`, data, Header)
}

const uploadPeopleImage = (id, file) => {
    return instance.put(`team/people/${id}/photo`, file, Header)
}

const publishPeopleById = (id) => {
    return instance.put(`team/people/${id}/publish`, null, Header)
}

const DeletePeopleById = (id) => {
    return instance.delete(`team/people/${id}`, Header)
}


// Alumni
const getListAlumni = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`team/alumni`, paramsHeader)
}
const getAlumniById = (id) => {
    return instance.get(`team/alumni/${id}`, Header)
}

const addAlumni = (data) => {
    return instance.post(`team/alumni`, data, Header)
}

const updateAlumniById = (id, data) => {
    return instance.put(`team/alumni/${id}`, data, Header)
}

const publishAlumniById = (id) => {
    return instance.put(`team/alumni/${id}/publish`, null, Header)
}

const uploadAlumniImage = (id, file) => {
    return instance.put(`team/alumni/${id}/photo`, file, Header)
}

const DeleteAlumniById = (id) => {
    return instance.delete(`team/alumni/${id}`, Header)
}

const teamAPis = {
    getListPeople,
    addPeople,
    getPeopleById,
    updatePeopleById,
    publishPeopleById,
    uploadPeopleImage,
    getListAlumni,
    DeletePeopleById,
    addAlumni,
    getAlumniById,
    updateAlumniById,
    uploadAlumniImage,
    publishAlumniById,
    DeleteAlumniById
}

export default teamAPis