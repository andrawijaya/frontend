import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

const getListWebinars = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`insight/webinar`, paramsHeader)
}

const addNewWebinar = (data) => {
    return instance.post(`insight/webinar`, data, Header)
}

const getWebinarById = (id) => {
    return instance.get(`insight/webinar/${id}`, Header)
}

const updateWebinareById = (id, data) => {
    return instance.put(`insight/webinar/${id}`, data, Header)
}

const uploadWebinarBanner = (id, data) => {
    return instance.put(`insight/webinar/${id}/banner_image`, data, Header)
}

const uploadWebinarImage = (id, data) => {
    return instance.put(`insight/webinar/${id}/thumbnail_image`, data, Header)
}

const updateTagsWebinarById = (id, data) => {
    return instance.put(`insight/webinar/${id}/tags`, data, Header)
}

const addSpeakersByWebinarId = (id, data) => {
    return instance.post(`insight/webinar/${id}/speakers`, data, Header)
}

const uploadspeakersImage = (id, speakersId, data) => {
    return instance.put(`insight/webinar/${id}/speakers/${speakersId}/photo_url`, data, Header)
}

const updateSpeakersImageById = (idWebinars, idSpeakers, data) => {
    return instance.put(`insight/webinar/${idWebinars}/speakers/${idSpeakers}/photo_url`, data, Header)
}

const updateSpeakersById = (idWebinars, idSpeakers, data) => {
    return instance.put(`insight/webinar/${idWebinars}/speakers/${idSpeakers}`, data, Header)
}

const deleteSpeakersById = (idWebinars, idSpeakers) => {
    return instance.delete(`insight/webinar/${idWebinars}/speakers/${idSpeakers}`, Header)
}

const getContentByWebinarId = (id) => {
    return instance.get(`insight/webinar/${id}/overview`, Header)
}

const updateContentWebinarById = (id, data) => {
    return instance.put(`insight/webinar/${id}/overview`, data, Header)
}

// publish unpublish etc
const publishWebinar = (id) => {
    return instance.put(`insight/webinar/${id}/publish`, null, Header)
}

const unPublishWebinar = (id) => {
    return instance.put(`insight/webinar/${id}/unpublish`, null, Header)
}

const deleteWebinarById = (id) => {
    return instance.delete(`insight/webinar/${id}`, Header)
}

const restoreWebinarById = (id) => {
    return instance.post(`insight/webinar/${id}/restore`, null, Header)
}

const webinarsCMSAPI = {
    getListWebinars,
    addNewWebinar,
    getWebinarById,
    updateWebinareById,
    uploadWebinarBanner,
    uploadWebinarImage,
    updateTagsWebinarById,
    addSpeakersByWebinarId,
    uploadspeakersImage,
    updateSpeakersImageById,
    updateSpeakersById,
    deleteSpeakersById,
    getContentByWebinarId,
    updateContentWebinarById,
    publishWebinar,
    unPublishWebinar,
    deleteWebinarById,
    restoreWebinarById
}

export default webinarsCMSAPI