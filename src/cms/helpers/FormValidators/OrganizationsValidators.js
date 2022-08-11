import * as Yup from 'yup'

const Industries = Yup.object({
    name: Yup.string()
        .required("Name is required!"),
    tagline: Yup.string()
        .required("Tagline is required!")
        .min(6, "minimum length is 6 characters!"),
    thumbnail_image_url: Yup.string(),
    banner_image_url: Yup.string()
})

const OrganizationsValidators = {
    Industries,
}

export default OrganizationsValidators