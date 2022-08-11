import * as Yup from 'yup'

const Topics = Yup.object({
    name: Yup.string()
        .required("Name is required!"),
    tagline: Yup.string()
        .required("Tagline is required!")
        .min(6, "minimum length is 6 characters!"),
    thumbnail_image_url: Yup.string()
        .required("Thumbnail Topics is requires!")
})

const InsightsValidators = {
    Topics,
}

export default InsightsValidators