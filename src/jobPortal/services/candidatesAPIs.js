import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

const getCandidateByIdVacancies = (id, params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`vacancy/vacancy/${id}/recruitment`, paramsHeader)
}

const UpdateStatusCandidate = (id, params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.put(`vacancy/recruitment/${id}/status`, null, paramsHeader)
}

const getListSkillsRecruitment = () => {
    return instance.get(`vacancy/recruitment_skills`, Header)
}

const getListCandidatesBySkills = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`vacancy/recruitment`, paramsHeader)
}


const CandidatesAPIs = {
    getCandidateByIdVacancies,
    UpdateStatusCandidate,
    getListSkillsRecruitment,
    getListCandidatesBySkills
}

export default CandidatesAPIs