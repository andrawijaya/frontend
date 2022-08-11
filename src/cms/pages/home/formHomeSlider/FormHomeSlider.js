import React, { useEffect, useState } from "react";
import "./FormHomeSlider.css";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import { useHistory } from "react-router";
import HomeValidators from "../../../helpers/FormValidators/HomeValidators";
import { useFormik } from "formik";
import SweetAlert from "react-bootstrap-sweetalert";
import ContentAPIs from "../../../services/contentCMSAPIs";
import { capitalize, isEmpty } from "lodash";

const initialValues = {
  link_url: "",
  title: "",
  tagline: "",
  image_url: "",
  index: 1,
};

export default function FormHomeSlider(props) {
  const history = useHistory();
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
  const [idSlider, setIdSlider] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.match.params.type !== "add") {
      setId(props.match.params.id);
      getSliderById(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
    }
  }, [props.match.params.id, props.match.params.type]);

  const handleCancel = () => {
    history.push("/website-cms/home");
  };

  const getSliderById = (id) => {
    ContentAPIs.getSliderById(id)
      .then((res) => {
        let data = res.data.data;
        let newValues = {
          link_url: data.link_url,
          title: data.title,
          tagline: data.tagline,
          image_url: data.image_url,
          index: data.index,
        };
        setData(newValues);
        setIdSlider(data.id);
      })
      .catch((err) => {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(err.response.data.message);
      });
  };

  /*** Update Logo **/
  const [fileUpload, setFileUpload] = useState(null);
  const [fileName, setFileName] = useState("");

  const fileSelectHandler = (event) => {
    fileUploadHandler(event.target.files[0]);
  };

  const fileUploadHandler = (data) => {
    if (data !== undefined) {
      const maxSizeUpload = 5000;
      const fileSize = data.size / 1024;
      if (fileSize < maxSizeUpload) {
        formik.values.image_url = URL.createObjectURL(data);
        setFileName(data.name);
        let fd = new FormData();
        fd.append("image_file", data);
        setFileUpload(fd);
      } else {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage("File is too Large, maximal file size is 5MB!");
      }
    }
  };

  /*** Update Logo **/
  const formik = useFormik({
    initialValues: data || initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: HomeValidators.AddSliders,
    onSubmit: (values) => {
      let result = {
        link_url: values.link_url,
        title: values.title,
        tagline: values.tagline,
        index: values.index,
      };
      if (formType === "Add") {
        ContentAPIs.addSliderByIndex(result)
          .then((res) => {
            ContentAPIs.uploadSliderImage(res.data.data.id, fileUpload).catch(
              (err) => {
                setShowAlert(true);
                setAlerType(2);
                setAlertMessage(err.response.data.message);
              }
            );
            ContentAPIs.activateSliderById(res.data.data.id).catch((err) => {
              setShowAlert(true);
              setAlerType(2);
              setAlertMessage(err.response.data.message);
            });
            setShowAlert(true);
            setAlerType(1);
            setAlertMessage("Data has been Added!");
            formik.resetForm();
          })
          .catch((err) => {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(err.response.data.message);
          });
      } else {
        ContentAPIs.updateSliderById(idSlider, result)
          .then((res) => {
            if (fileUpload !== null) {
              ContentAPIs.uploadSliderImage(res.data.data.id, fileUpload).then(
                (res) => {
                  setShowAlert(true);
                  setAlerType(1);
                  setAlertMessage("Data has been Updated!");
                  formik.resetForm();
                }
              );
            } else {
              setShowAlert(true);
              setAlerType(1);
              setAlertMessage("Data has been Updated!");
              formik.resetForm();
            }
          })
          .catch((err) => {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(err.response.data.message);
          });
      }
    },
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setShowAlert(false);
    if (alertType === 2) {
      return;
    } else {
      history.push("/website-cms/home");
    }
  };

  return (
    <div>
      <SweetAlert
        show={showAlert}
        confirmBtnBsStyle={alertType === 1 ? "success" : "warning"}
        confirmBtnText="Close"
        title={alertType === 1 ? "Succes!" : "Invalid!"}
        onConfirm={hideAlert}
        warning={alertType === 2}
        success={alertType === 1}
      >
        {alertMessage}
      </SweetAlert>
      <div className="wrap-form-home">
        <div className="wrap-nside-home">
          <div className="heading-title">
            <label>{formType} Homepage Slider</label>
            <div className="wrap-breadcrumb">
              <ListBreadcrumbs
                menu={"list"}
                name={"Homepage"}
                subMenu={`${formType}`}
                url={"/website-cms/home"}
              />
            </div>
          </div>

          {/* contentform */}
          <form onSubmit={formik.handleSubmit}>
            <div className="wrap-form-slider">
              <div className="mb-3">
                <label className="form-label">Slider Title</label>
                <input
                  type="text"
                  className="input-form form-control"
                  disabled={formType === "Detail"}
                  style={
                    formik.errors.title && formik.touched.title
                      ? { border: "1px solid red" }
                      : { border: "1px solid #ced4da" }
                  }
                  name="title"
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <div className="feedback-error">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Slider Tagline</label>
                <input
                  type="text"
                  className="input-form form-control"
                  disabled={formType === "Detail"}
                  style={
                    formik.errors.tagline && formik.touched.tagline
                      ? { border: "1px solid red" }
                      : { border: "1px solid #ced4da" }
                  }
                  name="tagline"
                  value={formik.values.tagline}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <div className="feedback-error">
                  {formik.touched.tagline && formik.errors.tagline}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Slider Background *recommended image size is 1440 x 600 px
                </label>
                <div
                  className="wrap-images-form"
                  style={{
                    display: isEmpty(formik.values.image_url)
                      ? "none"
                      : "block",
                  }}
                >
                  <img
                    className="logo-form"
                    src={formik.values.image_url}
                    alt="logo"
                  />
                </div>
                <label
                  className="wrap-button-upload-file"
                  style={{
                    width: "25%",
                    display: formType === "Detail" ? "none" : "grid",
                  }}
                >
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => fileSelectHandler(e)}
                  />
                  <span style={{ margin: "0px" }}>
                    {id !== ""
                      ? "Change"
                      : fileName === ""
                      ? "Upload"
                      : "Change"}
                  </span>
                </label>
                <div className="feedback-error">
                  {formik.touched.image_url && formik.errors.image_url}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Hyperlink</label>
                <input
                  type="text"
                  className="input-form form-control"
                  disabled={formType === "Detail"}
                  style={
                    formik.errors.link_url && formik.touched.link_url
                      ? { border: "1px solid red" }
                      : { border: "1px solid #ced4da" }
                  }
                  name="link_url"
                  value={formik.values.link_url}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <div className="feedback-error">
                  {formik.touched.link_url && formik.errors.link_url}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Slider</label>
                {formType !== "Add" ? (
                  <input
                    type="text"
                    className="input-form form-control"
                    value={"Slider" + formik.values.index}
                    disabled
                  />
                ) : (
                  <select
                    defaultValue={formik.values.index}
                    onChange={formik.handleChange}
                    name="index"
                    required
                    className="form-control form-select input-gray"
                    aria-label="Default select example"
                  >
                    <option disabled>Pilih</option>
                    <option name="index" value={1}>
                      Slider 1
                    </option>
                    <option name="index" value={2}>
                      Slider 2
                    </option>
                    <option name="index" value={3}>
                      Slider 3
                    </option>
                    <option name="index" value={4}>
                      Slider 4
                    </option>
                  </select>
                )}
                <div className="feedback-error">
                  {formik.touched.index && formik.errors.index}
                </div>
              </div>
              <div className="mb-3">
                <div
                  className="group-button-form"
                  style={{
                    textAlign: "center",
                    width: "auto",
                    marginTop: "2rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="third-btn"
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                      marginRight: "5px",
                    }}
                  >
                    {formType === "Detail" ? "Back" : "Cancel"}
                  </button>
                  <button
                    type={"submit"}
                    className="primary-btn"
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                      display: formType === "Detail" ? "none" : "initial",
                    }}
                  >
                    {formType === "Add" ? "Add" : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
