import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

const getListSubscriptions = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`contact/subscription`, paramsHeader)
}

const getSubscriptionById = (id) => {
    return instance.get(`contact/subscription/${id}`, Header)
}

const getListUnsubscriptions = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`contact/subscription_archived`, paramsHeader)
}

const getUnsubscriptionById = (id) => {
    return instance.get(`contact/subscription_archived/${id}`, Header)
}

const subscriptionsCMSAPIs = {
    getListSubscriptions,
    getSubscriptionById,
    getListUnsubscriptions,
    getUnsubscriptionById
}

export default subscriptionsCMSAPIs