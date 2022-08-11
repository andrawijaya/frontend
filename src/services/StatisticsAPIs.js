import instance from "./AxiosGlobal";
import Header from "./Headers";


const listStatistics = () => {
    return instance.get(`/commons/statistics`, Header)
}

const StatisticsAPIs = {
    listStatistics
}

export default StatisticsAPIs