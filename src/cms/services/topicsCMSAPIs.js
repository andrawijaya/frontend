import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

const getListTopics = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`insight/topic`, paramsHeader)
}

const getTopicById = (id) => {
    return instance.get(`insight/topic/${id}`, Header)
}

const addTopic = (data) => {
    return instance.post(`insight/topic`, data, Header)
}

const updateTopicById = (id, data) => {
    return instance.put(`insight/topic/${id}`, data, Header)
}

const deleteTopicById = (id) => {
    return instance.delete(`insight/topic/${id}`, Header)
}

const uploadTopicThumbnails = (id, file) => {
    return instance.put(`insight/topic/${id}/thumbnail_image`, file, Header)
}

const topicsCMSAPIs = {
    getListTopics,
    addTopic,
    updateTopicById,
    deleteTopicById,
    uploadTopicThumbnails,
    getTopicById
}

export default topicsCMSAPIs