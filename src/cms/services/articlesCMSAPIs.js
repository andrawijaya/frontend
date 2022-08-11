import instance from "../../services/AxiosGlobal";
import Header from "../../services/Headers";

const getListArticles = (params) => {
    const paramsHeader = { ...params, ...Header }
    return instance.get(`insight/article`, paramsHeader)
}

const addNewArticle = (data) => {
    return instance.post(`insight/article`, data, Header)
}

const publishArticle = (id) => {
    return instance.put(`insight/article/${id}/publish`, null, Header)
}

const unPublishArticle = (id) => {
    return instance.put(`insight/article/${id}/unpublish`, null, Header)
}

const deleteArticleById = (id) => {
    return instance.delete(`insight/article/${id}`, Header)
}

const restoreArticleById = (id) => {
    return instance.post(`insight/article/${id}/restore`, null, Header)
}

const addAuthorsByArticleId = (id, data) => {
    return instance.post(`insight/article/${id}/authors`, data, Header)
}

const uploadAuthorsImage = (id, authorsId, data) => {
    return instance.put(`insight/article/${id}/authors/${authorsId}/photo_url`, data, Header)
}

const uploadArticleBanner = (id, data) => {
    return instance.put(`insight/article/${id}/banner_image`, data, Header)
}

const uploadArticleImage = (id, data) => {
    return instance.put(`insight/article/${id}/thumbnail_image`, data, Header)
}

const updateContentArticleById = (id, data) => {
    return instance.put(`insight/article/${id}/content`, data, Header)
}

const updateTagsArticleById = (id, data) => {
    return instance.put(`insight/article/${id}/tags`, data, Header)
}

const getArticleById = (id) => {
    return instance.get(`insight/article/${id}`, Header)
}

const updateArticleById = (id, data) => {
    return instance.put(`insight/article/${id}`, data, Header)
}

const getContentByArticleId = (id) => {
    return instance.get(`insight/article/${id}/content`, Header)
}

const updateAuthorsImageById = (idArticle, idAuthors, data) => {
    return instance.put(`insight/article/${idArticle}/authors/${idAuthors}/photo_url`, data, Header)
}

const updateAuthorsById = (idArticle, idAuthors, data) => {
    return instance.put(`insight/article/${idArticle}/authors/${idAuthors}`, data, Header)
}

const deleteAuthorsById = (idArticle, idAuthors) => {
    return instance.delete(`insight/article/${idArticle}/authors/${idAuthors}`, Header)
}



const articlesCMSAPI = {
    getListArticles,
    getArticleById,
    updateArticleById,
    getContentByArticleId,
    addAuthorsByArticleId,
    updateAuthorsImageById,
    addNewArticle,
    uploadAuthorsImage,
    uploadArticleBanner,
    uploadArticleImage,
    updateContentArticleById,
    updateTagsArticleById,
    publishArticle,
    unPublishArticle,
    updateAuthorsById,
    deleteArticleById,
    deleteAuthorsById,
    restoreArticleById
}

export default articlesCMSAPI