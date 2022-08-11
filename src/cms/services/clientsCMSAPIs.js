import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

const addClients = (data) => {
    return instance.post(`organization/clients`, data, Header)
}

const getClients = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`organization/clients`, paramsHeader)
}

const getClientById = (id) => {
    return instance.get(`organization/clients/${id}`, Header)
}

const uploadLogoClients = (id, file) => {
    return instance.put(`organization/clients/${id}/logo_image`, file, Header)
}

const updateClientsById = (id, data) => {
    return instance.put(`organization/clients/${id}`, data, Header)
}

const deleteClientById = (id) => {
    return instance.delete(`organization/clients/${id}`, Header)
}

const clientsCMSAPIs = {
    addClients,
    getClients,
    getClientById,
    uploadLogoClients,
    updateClientsById,
    deleteClientById
}

export default clientsCMSAPIs