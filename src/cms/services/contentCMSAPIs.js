import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

const getListSliderByIndex = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`content/slider`, paramsHeader)
}

const addSliderByIndex = (data) => {
    return instance.post(`content/slider`, data, Header)
}

const uploadSliderImage = (id, file) => {
    return instance.put(`content/slider/${id}/image`, file, Header)
}

const getSliderById = (id) => {
    return instance.get(`content/slider/${id}`, Header)
}

const updateSliderById = (id, data) => {
    return instance.put(`content/slider/${id}`, data, Header)
}

const activateSliderById = (id) => {
    return instance.put(`content/slider/${id}/activate`, null, Header)
}

const ContentAPIs = {
    getListSliderByIndex,
    addSliderByIndex,
    uploadSliderImage,
    getSliderById,
    updateSliderById,
    activateSliderById
}

export default ContentAPIs