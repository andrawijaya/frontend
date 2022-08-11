import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

const getListMessages = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`contact/contactus`, paramsHeader)
}

const getMessageById = (id) => {
    return instance.get(`contact/contactus/${id}`, Header)
}

const deleteMessageById = (id) => {
    return instance.delete(`contact/contactus/${id}`, Header)
}

const MessagesCMSAPI = {
    getListMessages,
    getMessageById,
    deleteMessageById
}

export default MessagesCMSAPI