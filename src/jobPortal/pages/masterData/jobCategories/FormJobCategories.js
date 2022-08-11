import React, { useState, useEffect } from "react";
import { capitalize } from "lodash";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import SweetAlert from "react-bootstrap-sweetalert";
import masterDataAPIs from "../../../services/masterDataAPIs";

export default function FormJobCategories(props) {
  const history = useHistory();
  const [id, setId] = useState("add");
  const [formType, setFormType] = useState("Add");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (props.match.params.type !== "add") {
      setId(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
      getJobCategoriesDetails(props.match.params.id);
    }
  }, [props.match.params.id, props.match.params.type]);

  const getJobCategoriesDetails = (id) => {
    masterDataAPIs
      .getJobCategoriesById(id)
      .then((res) => {
        setCategoryName(res.data.data.category);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCancel = () => {
    history.push("/job-portal/job-categories");
  };

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = {
      category: categoryName,
    };
    if (formType === "Add") {
      masterDataAPIs
        .createJobCategories(newData)
        .then((res) => {
          if (res.data.code === 200) {
            setShowAlert(true);
            setAlerType(1);
            setAlertMessage("New Category has been Added!");
          } else {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          }
        })
        .catch((err) => {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(err.response.data.message);
        });
    } else {
      masterDataAPIs
        .updateJobCategories(id, newData)
        .then((res) => {
          if (res.data.code === 200) {
            setShowAlert(true);
            setAlerType(1);
            setAlertMessage("Category has been Updated!");
          } else {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          }
        })
        .catch((err) => {
          setShowAlert(true);
          setAlerType(2);
          // setAlertMessage(err.response.data.message)
        });
    }
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setShowAlert(false);
    if (alertType === 2) {
      return;
    } else {
      history.push("/job-portal/job-categories");
    }
  };

  return (
    <div className="wrap-master-data__form">
      <SweetAlert
        show={showAlert}
        confirmBtnBsStyle={alertType === 1 ? "success" : "warning"}
        confirmBtnText="Close"
        title={alertType === 1 ? "Success!" : "Invalid!"}
        onConfirm={hideAlert}
        warning={alertType === 2}
        success={alertType === 1}
      >
        {alertMessage}
      </SweetAlert>
      <div className="wrap-inside-master-data">
        <div className="heading-title">
          <label>{formType} Categories</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Master Data"}
            subMenu={"Job Category"}
            url={"/job-portal/job-categories"}
            subMenu2={formType}
            subMenuType={formType}
          />
        </div>
      </div>
      <div className="content-form-master-data">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Job Category</label>
            <input
              type="text"
              disabled={formType === "Detail"}
              value={categoryName}
              onChange={handleInputChange}
              minLength={3}
              required
              className="input-form form-control"
            />
          </div>
          <div
            className="group-button-form"
            style={{ textAlign: "center", width: "auto" }}
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
