import * as Yup from 'yup'

const AddSliders = Yup.object({
    link_url: Yup.string()
        .required("Link URL is required!")
        .min(4, 'Minimal 4 Character!'),
    title: Yup.string()
        .required("Title Slider is required!")
        .min(35, "minimum length is 35 characters!")
        .max(45, "Maximum length is 45 characters!"),
    tagline: Yup.string()
        .required("Tagline Slider is required!")
        .min(25, "minimum length is 25 characters!")
        .max(60, "Maximum length is 60 characters!"),
    index: Yup.number()
        .required("Index Slider is required!"),
    image_url: Yup.string()
})

const HomeValidators = {
    AddSliders,
}

export default HomeValidators