import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import topicsCMSAPIs from "../../../services/topicsCMSAPIs";
import { useFormik } from "formik";
import SweetAlert from "react-bootstrap-sweetalert";
import InsightsValidators from "../../../helpers/FormValidators/InsightsValidators";
import { capitalize, isEmpty } from "lodash";

const initialValues = {
  name: "",
  web_url: "",
  pic_name: "",
  pic_phone: "",
  logo_image: "",
  thumbnail_image_url: "",
};

export default function FormTopics(props) {
  const history = useHistory();
  const [id, setId] = useState("add");
  const [data, setData] = useState(null);
  const [formType, setFormType] = useState("Add");

  useEffect(() => {
    if (props.match.params.type !== "add") {
      getTopics(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
      setId(props.match.params.id);
    }
  }, [props.match.params.id, props.match.params.type]);

  const getTopics = (id) => {
    topicsCMSAPIs
      .getTopicById(id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCancel = () => {
    history.push("/website-cms/topics");
  };

  const formik = useFormik({
    initialValues: data || initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: InsightsValidators.Topics,
    onSubmit: (values) => {
      let result = {
        name: values.name,
        tagline: values.tagline,
      };
      if (id === "add") {
        topicsCMSAPIs
          .addTopic(result)
          .then((res) => {
            topicsCMSAPIs
              .uploadTopicThumbnails(res.data.data.id, fileUpload)
              .then((res) => {
                setShowAlert(true);
                setAlerType(1);
                setAlertMessage("Data has been Added!");
                formik.resetForm();
              });
          })
          .catch((err) => {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(err.response.data.message);
          });
      } else {
        topicsCMSAPIs
          .updateTopicById(id, result)
          .then((res) => {
            if (fileUpload !== null) {
              topicsCMSAPIs
                .uploadTopicThumbnails(res.data.data.id, fileUpload)
                .then((res) => {
                  setShowAlert(true);
                  setAlerType(1);
                  setAlertMessage("Data has been Updated!");
                  formik.resetForm();
                });
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

  /*** Update Logo **/
  const [fileUpload, setFileUpload] = useState(null);
  const [fileName, setFileName] = useState("");

  const fileSelectHandler = (event) => {
    fileUploadHandler(event.target.files[0]);
  };

  const fileUploadHandler = (data) => {
    const maxSizeUpload = 5000;
    if (data !== undefined) {
      const fileSize = data.size / 1024;
      if (fileSize < maxSizeUpload) {
        let image_file = URL.createObjectURL(data);
        formik.values.thumbnail_image_url = image_file;
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

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setShowAlert(false);
    if (alertType === 2) {
      return;
    } else {
      history.push("/website-cms/topics");
    }
  };

  return (
    <div className="wrap-master-data__form">
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
      <div className="wrap-inside-master-data">
        <div className="heading-title">
          <label>{formType} Topic</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Insights"}
            subMenu={"Topic"}
            url={"/website-cms/topics"}
            subMenu2={formType}
            subMenuType={formType}
          />
        </div>
      </div>
      <div className="content-form-master-data">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Topic Name</label>
            <input
              type="text"
              disabled={formType === "Detail"}
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="input-form form-control"
            />
            <div className="feedback-error">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Topic Tagline</label>
            <input
              type="text"
              disabled={formType === "Detail"}
              name="tagline"
              value={formik.values.tagline}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="input-form form-control"
            />
            <div className="feedback-error">
              {formik.touched.tagline && formik.errors.tagline}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Topic Thumbnail *recommended image size is 300 x 300 px
            </label>
            <div
              className="wrap-images-form"
              style={{
                display: isEmpty(formik.values.thumbnail_image_url)
                  ? "none"
                  : "block",
              }}
            >
              <img
                className="logo-form"
                src={formik.values.thumbnail_image_url}
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
                {id !== "add"
                  ? "Change"
                  : fileName === ""
                  ? "Upload"
                  : "Change"}
              </span>
            </label>
            <div className="feedback-error">
              {formik.touched.thumbnail_image_url &&
                formik.errors.thumbnail_image_url}
            </div>
          </div>
          <div
            className="group-button-form"
            style={{ textAlign: "center", width: "auto", marginTop: "2rem" }}
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
              {id === "add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
