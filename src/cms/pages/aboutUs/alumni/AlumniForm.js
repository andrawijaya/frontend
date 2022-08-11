import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import TeamsValidators from "../../../helpers/FormValidators/TeamsValidators";
import teamAPis from "../../../services/teamCMSAPIs";
import SweetAlert from "react-bootstrap-sweetalert";
import { useFormik } from "formik";
import { capitalize, isEmpty } from "lodash";

const initialValues = {
  name: "",
  affiliation: "",
  link_url: "",
  quotes: "",
  photo_url: "",
};

export default function AlumniForm(props) {
  const [data, setData] = useHistory(initialValues);
  const history = useHistory();
  const [formType, setFormType] = useState("Add");
  const [id, setId] = useState("add");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.match.params.type !== "add") {
      getAlumniById(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
    }
  }, [props.match.params.type, props.match.params.id]);

  const getAlumniById = (id) => {
    teamAPis
      .getAlumniById(id)
      .then((res) => {
        let data = res.data.data;
        let newValues = {
          name: data.name,
          affiliation: data.affiliation,
          link_url: data.link_url,
          quotes: data.quotes,
          photo_url: data.photo_url,
        };
        setData(newValues);
        setId(data.id);
      })
      .catch((err) => {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: data || initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: TeamsValidators.Alumni,
    onSubmit: (values) => {
      let newValues = {
        name: values.name,
        affiliation: values.affiliation,
        link_url: values.link_url,
        quotes: values.quotes,
      };
      if (formType === "Add") {
        if (fileName === "") {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage("Please Upload Alumni Image First!");
          return;
        } else {
          teamAPis
            .addAlumni(newValues)
            .then((res) => {
              teamAPis
                .uploadAlumniImage(res.data.data.id, fileUpload)
                .catch((err) => {
                  setShowAlert(true);
                  setAlerType(2);
                  setAlertMessage(err.response.data.message);
                });
              teamAPis.publishAlumniById(res.data.data.id).catch((err) => {
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
        }
      } else {
        teamAPis
          .updateAlumniById(id, newValues)
          .then((res) => {
            if (fileUpload !== null) {
              teamAPis
                .uploadAlumniImage(res.data.data.id, fileUpload)
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

  const handleCancel = () => {
    history.push("/website-cms/alumni");
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
        formik.values.photo_url = URL.createObjectURL(data);
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
      history.push("/website-cms/alumni");
    }
  };

  return (
    <div className="wrap-form-alumni">
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

      <div className="wrap-inside-form-industries">
        <div className="heading-title">
          <label>{formType} Sigma Alumni</label>
          <ListBreadcrumbs
            menu={"About Us"}
            name={"Sigma Alumni"}
            subMenu={formType}
            url={"/website-cms/alumni"}
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="wrap-list-form-industries">
            <div className="mb-3">
              <label className="form-label">
                Sigma Alumni Image *recommended image size is 300 x 300 px
              </label>
              <div
                className="wrap-images-form"
                style={{
                  display: isEmpty(formik.values.photo_url) ? "none" : "block",
                }}
              >
                <img
                  className="logo-form"
                  src={formik.values.photo_url}
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
            </div>
            <div className="mb-3">
              <label className="form-label">Sigma Alumni Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={formType === "Detail"}
                required
                className="input-form form-control"
              />
              <div className="feedback-error">
                {formik.touched.name && formik.errors.name}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Sigma Alumni LinkedIn Link</label>
              <input
                type="text"
                name="link_url"
                value={formik.values.link_url}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={formType === "Detail"}
                required
                className="input-form form-control"
              />
              <div className="feedback-error">
                {formik.touched.link_url && formik.errors.link_url}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Sigma Alumni Testimoni *maximum length is 300 characters
              </label>
              <textarea
                type="text"
                name="quotes"
                rows={4}
                value={formik.values.quotes}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={formType === "Detail"}
                className="input-form form-control"
              />
              <div className="feedback-error">
                {formik.touched.quotes && formik.errors.quotes}
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
          </div>
        </form>
      </div>
    </div>
  );
}
