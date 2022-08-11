import * as Yup from 'yup'

const AddClients = Yup.object({
    name: Yup.string()
        .required("Name is required!"),
    web_url: Yup.string()
        .required("Web URL is required!")
        .min(6, "minimum length is 6 characters!"),
    pic_name: Yup.string()
        .required("PIC Name is required!")
        .min(6, "minimum length is 6 characters!"),
    pic_phone: Yup.string()
        .required("PIC Phone is required!")
        .min(8, 'Minimal 8 Character!'),
    logo_image: Yup.string()
        .required("Logo Company is requires!")
})

const ClientsValidators = {
    AddClients,
}

export default ClientsValidators