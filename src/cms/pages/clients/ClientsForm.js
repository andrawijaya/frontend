import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import clientsCMSAPIs from "../../services/clientsCMSAPIs";
import { useFormik } from "formik";
import SweetAlert from "react-bootstrap-sweetalert";
import ClientsValidators from "../../helpers/FormValidators/ClientsValidators";
import { capitalize, isEmpty } from "lodash";

const initialValues = {
  name: "",
  web_url: "",
  pic_name: "",
  pic_phone: "",
  logo_image: "",
};

export default function ClientsForm(props) {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [id, setId] = useState("add");
  const [formType, setFormType] = useState("Add");

  useEffect(() => {
    if (props.match.params.type !== "add") {
      setId(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
      getClients(props.match.params.id);
    }
  }, [props.match.params.id, props.match.params.type]);

  const getClients = (id) => {
    clientsCMSAPIs
      .getClientById(id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCancel = () => {
    history.push("/website-cms/clients/");
  };

  const formik = useFormik({
    initialValues: data || initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: ClientsValidators.AddClients,
    onSubmit: (values) => {
      let result = {
        name: values.name,
        web_url: values.web_url,
        pic_name: values.pic_name,
        pic_phone: values.pic_phone,
      };
      if (id === "add") {
        clientsCMSAPIs
          .addClients(result)
          .then((res) => {
            clientsCMSAPIs
              .uploadLogoClients(res.data.data.id, fileUpload)
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
        clientsCMSAPIs
          .updateClientsById(id, result)
          .then((res) => {
            if (fileUpload !== null) {
              clientsCMSAPIs
                .uploadLogoClients(res.data.data.id, fileUpload)
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
    if (data !== undefined) {
      const maxSizeUpload = 5000;
      const fileSize = data.size / 1024;
      formik.values.logo_image = URL.createObjectURL(data);
      setFileName(data.name);
      let fd = new FormData();
      fd.append("image_file", data);
      setFileUpload(fd);
      if (fileSize < maxSizeUpload) {
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
      history.push("/website-cms/clients");
    }
  };

  return (
    <div className="wrap-master-data__form-clients">
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
          <label>{formType} Client</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Clients"}
            subMenu={formType}
            url={"/website-cms/clients"}
          />
        </div>
      </div>
      <div className="content-form-master-data">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label"> Client Company Name</label>
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
            <label className="form-label">
              Client Company Logo *recommended image size is 300 x 300 px
            </label>
            <div
              className="wrap-images-form"
              style={{
                display: isEmpty(formik.values.logo_image) ? "none" : "block",
              }}
            >
              <img
                className="logo-form"
                src={formik.values.logo_image}
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
              {formik.touched.logo_image && formik.errors.logo_image}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Website Link</label>
            <input
              type="text"
              disabled={formType === "Detail"}
              name="web_url"
              value={formik.values.web_url}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="input-form form-control"
            />
            <div className="feedback-error">
              {formik.touched.web_url && formik.errors.web_url}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">PIC Name</label>
            <input
              type="text"
              disabled={formType === "Detail"}
              name="pic_name"
              value={formik.values.pic_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="input-form form-control"
            />
            <div className="feedback-error">
              {formik.touched.pic_name && formik.errors.pic_name}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">PIC Telephone Number</label>
            <input
              type="text"
              disabled={formType === "Detail"}
              name="pic_phone"
              pattern="^[0-9*#+()\\-]+$"
              value={formik.values.pic_phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="input-form form-control"
            />
            <div className="feedback-error">
              {formik.touched.pic_phone && formik.errors.pic_phone}
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
              {formType === "Add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
