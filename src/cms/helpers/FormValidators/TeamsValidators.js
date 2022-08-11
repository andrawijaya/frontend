import * as Yup from 'yup'

const Alumni = Yup.object({
    name: Yup.string()
        .required("Name is required!"),
    quotes: Yup.string()
        .required("Testimony is required!")
        .min(100, "minimum length is 20 characters!")
        .max(300, "maximum length is 300 characters!"),
    affiliation: Yup.string(),
    photo_url: Yup.string(),
    link_url: Yup.string()
        .required("LinkedIn Link is required!")
        .min(6, "minimum length is 6 characters!"),
})

const People = Yup.object({
    name: Yup.string()
        .required("Name is required!"),
    quotes: Yup.string(),
    affiliation: Yup.string(),
    photo_url: Yup.string(),
    link_url: Yup.string()
        .required("Instagram Link is required!")
        .min(6, "minimum length is 6 characters!"),
})

const TeamsValidators = {
    Alumni,
    People
}

export default TeamsValidators