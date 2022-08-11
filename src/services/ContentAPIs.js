import instance from "./AxiosGlobal";
import Header from "./Headers";

const getListSliderByIndex = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`content/slider`, paramsHeader)
}

const ContentAPIs = {
    getListSliderByIndex
}

export default ContentAPIs