import { capitalize, isEmpty } from "lodash";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import masterDataAPIs from "../../../services/masterDataAPIs";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import SweetAlert from "react-bootstrap-sweetalert";

export default function FormJobRoles(props) {
  const animatedComponents = makeAnimated();
  const history = useHistory();
  const [id, setId] = useState("add");
  const [formType, setFormType] = useState("Add");
  const [categories, setCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (props.match.params.type !== "add") {
      setId(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
      getRolesDetail(props.match.params.id);
    } else {
      getListJobCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id, props.match.params.type]);

  const getRolesDetail = (id) => {
    masterDataAPIs
      .getJobRolesById(id)
      .then((res) => {
        setRoleName(res.data.data.role);
        getListJobCategories(res.data.data.category);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getListJobCategories = (name) => {
    masterDataAPIs
      .getListCategories()
      .then((res) => {
        if (res.data.code === 200) {
          setCategories(res.data.data);
          if (!isEmpty(name)) {
            res.data.data.forEach((element) => {
              element.category === name && setSelectedCategories(element);
            });
            setCategoryName(name);
          } else {
            setSelectedCategories(res.data.data[0]);
          }
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCancel = () => {
    history.push("/job-portal/job-roles");
  };

  const handleCategoryChange = (option) => {
    setSelectedCategories(option);
    setCategoryName(option.category);
  };

  const handleInputChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = {
      category: categoryName,
      role: roleName,
    };
    if (formType === "Add") {
      masterDataAPIs
        .createJobRoles(newData)
        .then((res) => {
          setShowAlert(true);
          setAlerType(1);
          setAlertMessage("New Role has been Added!");
        })
        .catch((err) => {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(err.response.data.message);
        });
    } else {
      masterDataAPIs
        .updateJobRoles(id, newData)
        .then((res) => {
          setShowAlert(true);
          setAlerType(1);
          setAlertMessage("Role has been Updated!");
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
      history.push("/job-portal/job-roles");
    }
  };

  return (
    <div className="wrap-master-data__form">
      <SweetAlert
        show={showAlert}
        confirmBtnBsStyle="success"
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
          <label>{formType} Job Roles</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Master Data"}
            subMenu={"Job Roles"}
            url={"/job-portal/job-roles"}
            subMenu2={formType}
            subMenuType={formType}
          />
        </div>
      </div>
      <div className="content-form-master-data">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Job Role</label>
            <input
              disabled={formType === "Detail"}
              value={roleName}
              type="text"
              onChange={handleInputChange}
              minLength={3}
              required
              className="input-form form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Category</label>
            <Select
              isDisabled={formType === "Detail" || isEmpty(selectedCategories)}
              value={selectedCategories}
              onChange={(option) => handleCategoryChange(option)}
              components={animatedComponents}
              options={categories}
              getOptionLabel={(option) => option["category"]}
              getOptionValue={(option) => option["category"]}
            />
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
