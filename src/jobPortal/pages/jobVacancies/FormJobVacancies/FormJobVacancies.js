import React, { useState, useEffect } from "react";
import "./FormJobVacancies.css";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import { useHistory } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import NumberFormat from "react-number-format";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import SweetAlert from "react-bootstrap-sweetalert";
import masterDataAPIs from "../../../services/masterDataAPIs";
import JobVacanciesAPIs from "../../../services/jobVacanciesAPIs";
import { capitalize, isEmpty, toInteger } from "lodash";
import ImageResize from "quill-image-resize-module-react";
import Cookie from "js-cookie";
Quill.register("modules/imageResize", ImageResize);

const userEmail = Cookie.get("email");

export default function FormJobVacancies(props) {
  const animatedComponents = makeAnimated();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const history = useHistory();
  const [id, setId] = useState("add");
  const [formType, setFormType] = useState("Add");
  const [jobStatus, setJobStatus] = useState(2);

  // related dropdown
  const [listCategory, setListCategory] = useState(null);
  const [listSkills, setlistSkills] = useState(null);
  const [listBenefit, setListBenefit] = useState(null);
  const [listLocation, setListLocation] = useState(null);
  const [listJobType, setlistJobType] = useState(null);
  const [listExperience, setListExperience] = useState(null);

  // values
  const [jobTitle, setJobTitle] = useState("");
  const [numberOfVacancy, setNumberOfVacancy] = useState(1);
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedSkills, setselectedSkills] = useState(null);
  const [selectedProvince, setselectedProvince] = useState(null);
  const [selectedRegency, setselectedRegency] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    category: "",
    role: "",
    role_id: "",
  });
  const [collectionRole, setCollectionRole] = useState(null);
  // const [selectedBenefit, setSelectedBenefit] = useState([])
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedWorkExperience, setSelectedWorkExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    district: "",
    regency: "",
    province: "",
  });
  const [currency, setCurrency] = useState({
    exposed: true,
    min: 0,
    max: 0,
    currency: "IDR",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getListRelatedForm(props.match.params.type);
    if (props.match.params.type !== "add") {
      setId(props.match.params.id);
      props.match.params.type === "reopen"
        ? setFormType("Add")
        : setFormType(capitalize(props.match.params.type));
      getVacancyDetail(props.match.params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id, props.match.params.type]);

  const getListRelatedForm = (type) => {
    JobVacanciesAPIs.listLocation()
      .then((res) => {
        if (res.data.code === 200) {
          setListLocation(res.data.data);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    if (props.match.params.type === "add") {
      JobVacanciesAPIs.listBenefit()
        .then((res) => {
          if (res.data.code === 200) {
            let data = res.data.data;
            data.map((item) => {
              item["isChecked"] = true;
              return data;
            });
            setListBenefit(data);
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
    JobVacanciesAPIs.listExperience()
      .then((res) => {
        if (res.data.code === 200) {
          setListExperience(res.data.data);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    JobVacanciesAPIs.listSkills()
      .then((res) => {
        if (res.data.code === 200) {
          setlistSkills(res.data.data);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    JobVacanciesAPIs.listType()
      .then((res) => {
        if (res.data.code === 200) {
          setlistJobType(res.data.data);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    masterDataAPIs
      .getListCategories()
      .then((res) => {
        if (res.data.code === 200) {
          setListCategory(res.data.data);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getVacancyDetail = async (id) => {
    let type =
      props.match.params.type === "reopen"
        ? JobVacanciesAPIs.getUnpublishVacancyById(id)
        : JobVacanciesAPIs.getVacancyById(id);
    await type.then((res) => {
      let location = res.data.data.location;
      let category = res.data.data.category;
      let status = res.data.data.status;
      setData(res.data.data);
      setJobTitle(res.data.data.title);
      setNumberOfVacancy(res.data.data.number_of_vacancy);
      setSelectedJobType(res.data.data.type);
      setSelectedWorkExperience(res.data.data.experience_level);
      setSelectedLocation(res.data.data.location);

      setJobStatus(status === "DRAFT" ? 2 : status === "PUBLISHED" ? 1 : 2);
      let skills = [];
      res.data.data.skills.forEach((element) => {
        let newObj = { name: element };
        skills.push(newObj);
      });
      setselectedSkills(skills);
      setCurrency({
        ...currency,
        max: res.data.data.salary.max,
        min: res.data.data.salary.min,
      });
      // get list benefit
      let selectedBenefit = res.data.data.benefits;
      JobVacanciesAPIs.listBenefit()
        .then((res) => {
          if (res.data.code === 200) {
            let data = res.data.data;
            data.map((item) => {
              item["isChecked"] = false;
              selectedBenefit.forEach((benefit) => {
                if (benefit === item.name) {
                  item["isChecked"] = true;
                }
              });
              return data;
            });
            setListBenefit(data);
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });

      // get related data
      getDetailById(res.data.data.id, props.match.params.type);
      //get list location
      JobVacanciesAPIs.listLocation()
        .then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              if (location.province === element.name) {
                setselectedProvince(element);
                element.regencies.forEach((regency) => {
                  if (location.regency === regency.name) {
                    setselectedRegency(regency);
                  }
                });
              }
            });
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      // get selected category
      masterDataAPIs
        .getListCategories()
        .then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              element.roles.forEach((role) => {
                if (role.role_id === category.role_id) {
                  setSelectedCategory({
                    category: element.category,
                    role: role.role,
                    role_id: role.role_id,
                  });
                }
              });
            });
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    });
  };

  const getDetailById = (id, type) => {
    let additionalInfo =
      type === "reopen"
        ? JobVacanciesAPIs.getUnpublishAdditionalInformation(id)
        : JobVacanciesAPIs.getAdditionalInformation(id);
    let describtions =
      type === "reopen"
        ? JobVacanciesAPIs.getUnpublishDecriptionsVacancy(id)
        : JobVacanciesAPIs.getDecriptionsVacancy(id);
    let requirements =
      type === "reopen"
        ? JobVacanciesAPIs.getUnpublishDetailsRequirements(id)
        : JobVacanciesAPIs.getDetailsRequirements(id);

    additionalInfo.then((res) => {
      if (res.data.code === 200) {
        setAdditionalInfo(res.data.data.content);
      }
    });
    describtions.then((res) => {
      if (res.data.code === 200) {
        setJobDescription(res.data.data.content);
      }
    });
    requirements.then((res) => {
      if (res.data.code === 200) {
        setJobRequirements(res.data.data.content);
      }
    });
  };

  const filterSkills = () => {
    let newSkills = [];
    !isEmpty(selectedSkills) &&
      selectedSkills.forEach((element) => {
        newSkills.push(element.name);
      });
    return newSkills;
  };

  const filterSelectedBenefits = () => {
    let selectedBenefits = [];
    listBenefit.forEach((element) => {
      element.isChecked === true && selectedBenefits.push(element.name);
    });
    return selectedBenefits;
  };

  const submitData = async (type) => {
    setIsLoading(true);
    let listSkills = filterSkills();
    let newData = {
      title: jobTitle,
      number_of_vacancy: numberOfVacancy,
      location: {
        district: selectedLocation.district,
        regency: selectedLocation.regency,
        province: selectedLocation.province,
      },
      experience_level: selectedWorkExperience,
      role_id: selectedCategory.role_id,
      type: selectedJobType,
      salary: currency,
      skills: listSkills,
      benefits: filterSelectedBenefits(),
    };
    let newId = "";
    if (formType === "Add") {
      await JobVacanciesAPIs.createNewVacancies(newData).then((res) => {
        if (res.data.code === 200) {
          newId = res.data.data.id;
        } else {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(res.data.message);
        }
      });
    } else {
      await JobVacanciesAPIs.updateVacancyById(id, newData).then((res) => {
        if (res.data.code === 200) {
          newId = res.data.data.id;
        } else {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(res.data.message);
        }
      });
    }
    await JobVacanciesAPIs.updateAdditionalInformation(newId, {
      text: additionalInfo,
    }).then((res) => {
      if (res.data.code !== 200) {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(res.data.message);
      }
    });

    await JobVacanciesAPIs.updateDecriptionsVacancy(newId, {
      text: jobDescription,
    }).then((res) => {
      if (res.data.code !== 200) {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(res.data.message);
      }
    });
    await JobVacanciesAPIs.updateDetailsRequirements(newId, {
      text: jobRequirements,
    }).then((res) => {
      if (res.data.code !== 200) {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(res.data.message);
      }
    });
    if (type === 1) {
      if (jobStatus !== 3) {
        if (jobStatus !== 1) {
          await JobVacanciesAPIs.publishVacancy(newId).then((res) => {
            if (res.data.code !== 200) {
              setShowAlert(true);
              setAlerType(2);
              setAlertMessage(res.data.message);
            } else {
              if (formType === "Add") {
                setShowAlert(true);
                setAlerType(1);
                setAlertMessage("New Vacancy has been Created and Publish!");
              } else {
                setShowAlert(true);
                setAlerType(1);
                setAlertMessage("Vacancy has been Publish!");
              }
            }
          });
        }
      } else {
        await JobVacanciesAPIs.unPublishVacancy(newId).then((res) => {
          if (res.data.code !== 200) {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          } else {
            setShowAlert(true);
            setAlerType(1);
            setAlertMessage("Vacancy has been Closed!");
          }
        });
      }
    } else {
      if (formType === "Add") {
        setShowAlert(true);
        setAlerType(1);
        setAlertMessage("New Vacancy has been Created!");
      } else {
        setShowAlert(true);
        setAlerType(1);
        setAlertMessage("Vacancy has been Updated!");
      }
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(selectedSkills)) {
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage("Please select at least 1 Skills!");
    } else if (isEmpty(jobRequirements)) {
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage("Please fill Job Requirements Form!");
    } else if (isEmpty(jobDescription)) {
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage("Please fill Job Descriptions Form!");
    } else {
      submitData(1);
    }
  };

  const handleMultiChange = (option) => {
    setselectedSkills(option);
  };

  const handleJobDescription = (value) => {
    setJobDescription(value);
  };

  const handleJobRequirements = (value) => {
    setJobRequirements(value);
  };
  const handleAdditionalInfo = (value) => {
    setAdditionalInfo(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large"] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "code-block",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleCancel = () => {
    history.push("/job-portal/job-vacancies");
  };

  const handleChangeForm = (e) => {
    switch (e.target.name) {
      case "title":
        setJobTitle(e.target.value);
        break;
      case "vacancy":
        setNumberOfVacancy(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleChangeLocation = (e) => {
    let data = JSON.parse(e.target.value);
    let type = e.target.name;
    switch (type) {
      case "province":
        setselectedProvince(data);
        setselectedRegency(null);
        setSelectedLocation({
          ...selectedLocation,
          province: data.name,
          regency: "",
          district: "",
        });
        break;
      case "regency":
        setselectedRegency(data);
        setSelectedLocation({
          ...selectedLocation,
          regency: data.name,
          district: "",
        });
        break;
      case "district":
        setSelectedLocation({ ...selectedLocation, district: data.name });
        break;
      default:
        break;
    }
  };

  const handleChangeCategories = (e) => {
    let data = JSON.parse(e.target.value);
    let type = e.target.name;
    switch (type) {
      case "category":
        setCollectionRole(data);
        setSelectedCategory({
          ...selectedCategory,
          category: data.category,
          role: "",
          role_id: "",
        });
        break;
      case "role":
        setSelectedCategory({
          ...selectedCategory,
          role: data.role,
          role_id: data.role_id,
        });
        break;
      default:
        break;
    }
  };

  const handleSelectBenefit = (e) => {
    let name = e.target.value;
    let isChecked = e.target.checked;
    let newArr = listBenefit.map((item) => {
      if (name === item.name) {
        return { ...item, isChecked: isChecked };
      } else {
        return item;
      }
    });
    setListBenefit(newArr);
  };

  const handleFormSelect = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    switch (name) {
      case "type":
        setSelectedJobType(value);
        break;
      case "experience":
        setSelectedWorkExperience(value);
        break;
      case "job-status":
        setJobStatus(toInteger(value));
        break;
      default:
        break;
    }
  };

  const handleChangeSalary = (e, name) => {
    if (name === "min") {
      setCurrency({ ...currency, min: e.value });
    } else {
      setCurrency({ ...currency, max: e.value });
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
      history.push("/job-portal/job-vacancies");
    }
  };

  return (
    <div className="wrap-form-job-vacancies">
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
      <form onSubmit={handleSubmit}>
        <div className="wrap-content-form-job-vacancies">
          <div className="wrap-left-content-form">
            <div className="heading-title">
              <label>Job Vacancies</label>
              <div
                className="wrap-breadcrumb div_flex"
                style={{ paddingBottom: "10px", alignItems: "flex-start" }}
              >
                <ListBreadcrumbs
                  menu={"list"}
                  name={"List Job Vacancies"}
                  subMenu={`${formType} Job Vacancies`}
                  url={"/job-portal/job-vacancies"}
                />
              </div>
            </div>
            <div className="wrap-detail-form-job-vacancies">
              <label>Information</label>
              <div>
                <div className="mb-3">
                  <label className="form-label">Job Title *</label>
                  <input
                    value={jobTitle}
                    onChange={handleChangeForm}
                    name="title"
                    type="text"
                    required
                    className="input-form form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Job Type*</label>
                  <select
                    required
                    defaultValue={selectedJobType}
                    onChange={handleFormSelect}
                    name="type"
                    className="form-control form-select input-gray"
                    aria-label="Default select example"
                  >
                    <option value={selectedJobType} disabled>
                      {selectedJobType === "" ? "Pilih" : selectedJobType}
                    </option>
                    {!isEmpty(listJobType) &&
                      listJobType.map((item, i) => (
                        <option key={i} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Office Location *</label>
                  <div className="form-control-group">
                    <select
                      required
                      defaultValue={selectedLocation.province}
                      onChange={handleChangeLocation}
                      name="province"
                      className="form-select input-gray"
                      aria-label="Default select example"
                    >
                      <option value={selectedLocation.province} disabled>
                        {selectedLocation.province === ""
                          ? "Provinsi"
                          : selectedLocation.province}
                      </option>
                      {!isEmpty(listLocation) &&
                        listLocation.map((item, i) => (
                          <option
                            key={i}
                            id={item.name}
                            value={JSON.stringify(item)}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <select
                      onChange={handleChangeLocation}
                      disabled={selectedProvince === null}
                      required
                      defaultValue={selectedLocation.regency}
                      name="regency"
                      className="form-select input-gray"
                      aria-label="Default select example"
                    >
                      <option value={selectedLocation.regency} disabled>
                        {selectedLocation.regency === ""
                          ? "Kota/Kabupaten"
                          : selectedLocation.regency}
                      </option>
                      {!isEmpty(selectedProvince) &&
                        selectedProvince.regencies.map((item, i) => (
                          <option key={i} value={JSON.stringify(item)}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <select
                      onChange={handleChangeLocation}
                      name="district"
                      disabled={selectedRegency === null}
                      required
                      defaultValue={selectedLocation.district}
                      className="form-select input-gray"
                      aria-label="Default select example"
                      style={{ margin: "0px" }}
                    >
                      <option value={selectedLocation.district} disabled>
                        {selectedLocation.district === ""
                          ? "Kecamatan"
                          : selectedLocation.district}
                      </option>
                      {!isEmpty(selectedRegency) &&
                        selectedRegency.districts.map((item, i) => (
                          <option key={i} value={JSON.stringify(item)}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Number of Vacancies *</label>
                  <input
                    type="number"
                    value={numberOfVacancy}
                    onChange={handleChangeForm}
                    name="vacancy"
                    required
                    className="input-form form-control"
                  />
                </div>
                <div className="mb-3">
                  <div className="form-control-group">
                    <div
                      className="mb-3"
                      style={{ width: "100%", margin: "0px 5px 0px 0px" }}
                    >
                      <label className="form-label">Job Category *</label>
                      <select
                        onChange={handleChangeCategories}
                        name="category"
                        required
                        defaultValue={selectedCategory.category}
                        className="form-control form-select input-gray"
                        aria-label="Default select example"
                      >
                        <option value={selectedCategory.category} disabled>
                          {selectedCategory.category === ""
                            ? "Pilih"
                            : selectedCategory.category}
                        </option>
                        {!isEmpty(listCategory) &&
                          listCategory.map((item, i) => (
                            <option key={i} value={JSON.stringify(item)}>
                              {item.category}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div
                      className="mb-3"
                      style={{ width: "100%", margin: "0px 0px 0px 5px" }}
                    >
                      <label className="form-label">Job Role</label>
                      <select
                        onChange={handleChangeCategories}
                        name="role"
                        disabled={collectionRole === null}
                        required
                        defaultValue={selectedCategory.role}
                        className="form-control form-select input-gray"
                        aria-label="Default select example"
                      >
                        <option value={selectedCategory.role} disabled>
                          {selectedCategory.role === ""
                            ? "Pilih"
                            : selectedCategory.role}
                        </option>
                        {!isEmpty(collectionRole) &&
                          collectionRole.roles.map((item, i) => (
                            <option key={i} value={JSON.stringify(item)}>
                              {item.role}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Job Allowance & Benefits *
                  </label>
                  <div
                    className="form-control-group"
                    style={{ width: "100%", display: "block" }}
                  >
                    {!isEmpty(listBenefit) &&
                      listBenefit.map((item, i) => (
                        <div key={i} className="allowance-benefit">
                          <div className="form-check">
                            <input
                              onChange={handleSelectBenefit}
                              checked={item.isChecked === true}
                              className="form-check-input"
                              type="checkbox"
                              value={item.name}
                              id="benefit"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="benefit"
                            >
                              {item.name}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Work Experience *</label>
                  <select
                    required
                    defaultValue={selectedWorkExperience}
                    onChange={handleFormSelect}
                    name="experience"
                    className="form-control form-select input-gray"
                    aria-label="Default select example"
                  >
                    <option value={selectedWorkExperience} disabled>
                      {selectedWorkExperience === ""
                        ? "Pilih"
                        : selectedWorkExperience}
                    </option>
                    {!isEmpty(listExperience) &&
                      listExperience.map((item, i) => (
                        <option key={i} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Skills *</label>
                  <Select
                    value={selectedSkills}
                    onChange={(option) => handleMultiChange(option)}
                    components={animatedComponents}
                    isMulti
                    is
                    options={listSkills}
                    getOptionLabel={(option) => option["name"]}
                    getOptionValue={(option) => option["name"]}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Salary *</label>
                  <div
                    className="form-control-group"
                    style={{ alignItems: "inherit" }}
                  >
                    <select
                      required
                      defaultValue={1}
                      className="form-select input-gray"
                      aria-label="Default select example"
                    >
                      <option value={1}>IDR (Indonesia Rupiah)</option>
                      <option disabled value={2}>
                        USD (US Dollar)
                      </option>
                      <option disabled value={3}>
                        SGD (Singapore Dollar)
                      </option>
                    </select>
                    <div
                      className="input-group mb-3"
                      style={{ width: "100%", margin: "0px 5px 0px 0px" }}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          Min
                        </span>
                      </div>
                      <NumberFormat
                        className="input-form form-control"
                        thousandsGroupStyle="thousand"
                        prefix="Rp. "
                        value={currency.min}
                        decimalSeparator="."
                        displayType="input"
                        type="text"
                        onValueChange={(value) =>
                          handleChangeSalary(value, "min")
                        }
                        thousandSeparator={true}
                        allowNegative={true}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          Max
                        </span>
                      </div>
                      <NumberFormat
                        className="input-form form-control"
                        thousandsGroupStyle="thousand"
                        prefix="Rp. "
                        value={currency.max}
                        onValueChange={(value) =>
                          handleChangeSalary(value, "max")
                        }
                        decimalSeparator="."
                        displayType="input"
                        type="text"
                        thousandSeparator={true}
                        allowNegative={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="wrap-wyswyg">
                  <label>Detail</label>
                  <div className="mb-3">
                    <label className="form-label">Job Requirements*</label>
                    <div className="wrap-react-quill">
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="Write something..."
                        value={jobRequirements}
                        onChange={handleJobRequirements}
                      ></ReactQuill>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Job Description*</label>
                    <div className="wrap-react-quill">
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="Write something..."
                        value={jobDescription}
                        onChange={handleJobDescription}
                      ></ReactQuill>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Additional Information</label>
                    <div className="wrap-react-quill">
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="Write something..."
                        value={additionalInfo}
                        onChange={handleAdditionalInfo}
                      ></ReactQuill>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap-right-content-form">
            <div className="wrap-action-form">
              <label>Job Vacancy Posting Status</label>
              {jobStatus !== 2 ? (
                <div className="mb-3">
                  <select
                    required
                    name="job-status"
                    onChange={handleFormSelect}
                    defaultValue={jobStatus}
                    style={{
                      width: "min-content",
                      paddingRight: "20px",
                      borderRadius: "10px",
                    }}
                    className="form-control form-select input-gray"
                    aria-label="Default select example"
                  >
                    <option value={1}>Open</option>
                    <option value={3}>Closed</option>
                  </select>
                </div>
              ) : null}
              <div className="detail-action-form">
                <p>
                  Status :{" "}
                  <b>
                    {jobStatus === 1
                      ? "Open"
                      : jobStatus === 2
                      ? "Draft"
                      : "Closed"}
                  </b>
                </p>
                <p>
                  Created by :{" "}
                  <b>{isEmpty(data) ? userEmail : data.meta.created_by}</b>
                </p>
              </div>
              <div className="group-button-form">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading === true}
                  className="third-btn"
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    marginRight: "5px",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={jobStatus !== 2 || isLoading === true}
                  onClick={() => submitData(2)}
                  className="primary-btn"
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    marginRight: "5px",
                  }}
                >
                  Save as Draft
                </button>
                {isLoading !== true ? (
                  <button
                    type={"submit"}
                    className="primary-btn"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  >
                    Post {jobStatus === 2 ? "Job" : "Changes"}
                  </button>
                ) : (
                  <button
                    type={"submit"}
                    className="primary-btn"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  >
                    <i className="fa fa-spinner fa-spin"></i> Loading...
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
