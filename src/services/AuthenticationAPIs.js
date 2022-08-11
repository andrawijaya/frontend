import instance from "./AxiosGlobal";
import Header from "./Headers";


const loginAPIs = (value) => {
    return instance.post(`access/login`, value, Header)
}

const getListAccess = (header) => {
    return instance.get(`access/myself/roles`, header)
}

const forgotPassword = (data) => {
    return instance.post(`access/send_forgot_password/${data}`, null, Header)
}

const resetPassword = (data) => {
    return instance.post(`access/forgot_password`, data, Header)
}

const AuthenticationAPIs = {
    loginAPIs,
    getListAccess,
    forgotPassword,
    resetPassword
}

export default AuthenticationAPIs