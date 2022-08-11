import instance from "./AxiosGlobal";
import Header from "./Headers";


const getTopics = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`insight/topic`, paramsHeader)
}

const InsightsAPIs = {
    getTopics
}

export default InsightsAPIs