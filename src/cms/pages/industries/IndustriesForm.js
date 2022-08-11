import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { useFormik } from "formik";
import SweetAlert from "react-bootstrap-sweetalert";
import { capitalize, isEmpty } from "lodash";
import OrganizationsValidators from "../../helpers/FormValidators/OrganizationsValidators";
import OrganizationAPIs from "../../services/organizationsCMSAPIs";
import clientsCMSAPIs from "../../services/clientsCMSAPIs";
import topicsCMSAPIs from "../../services/topicsCMSAPIs";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link,
} from "suneditor/src/plugins";

const initialValues = {
  name: "",
  tagline: "",
  thumbnail_image_url: "",
  banner_image_url: "",
};

export default function IndustriesForm(props) {
  const animatedComponents = makeAnimated();
  const [data, setData] = useState(null);
  const [overView, setoverView] = useState("");
  const history = useHistory();
  const [listTopic, setListTopic] = useState(null);
  const [selectedTopics, setselectedTopics] = useState(null);
  const [listClients, setListClients] = useState(null);
  const [initialClients, setInitialClients] = useState(null);
  const [selectedClients, setselectedClients] = useState(null);
  const [formType, setFormType] = useState("Add");
  const [id, setId] = useState("add");
  const [showRaw] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getListDropdown();
    if (props.match.params.type !== "add") {
      getIndustries(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
      setId(props.match.params.id);
    }
  }, [props.match.params.id, props.match.params.type]);

  const handleCancel = () => {
    history.push("/website-cms/industries");
  };

  const getListDropdown = () => {
    clientsCMSAPIs
      .getClients()
      .then((res) => {
        setListClients(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    topicsCMSAPIs
      .getListTopics()
      .then((res) => {
        setListTopic(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleMultiChange = (option, type) => {
    if (type === "clients") {
      setselectedClients(option);
    } else {
      setselectedTopics(option);
    }
  };

  const getIndustries = (id) => {
    OrganizationAPIs.getIndustryById(id)
      .then((res) => {
        setData(res.data.data);
        setInitialClients(res.data.data.clients);
        setselectedClients(res.data.data.clients);
        let tag = res.data.data.tags;
        let newTopics = [];
        tag.forEach((element, i) => {
          let newObj = { id: i, name: element };
          newTopics.push(newObj);
        });
        setselectedTopics(newTopics);
        OrganizationAPIs.getIndustryOverviewById(id)
          .then((res) => {
            setoverView(res.data.data.content);
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const filterClients = (type) => {
    let newClients = [];
    let deletedClients = [];
    if (type === "delete") {
      // check deleted clients
      !isEmpty(initialClients) &&
        initialClients.forEach((client) => {
          let idClient = client.id;
          let isExist = false;
          !isEmpty(selectedClients) &&
            selectedClients.forEach((element) => {
              if (idClient === element.id) {
                isExist = true;
              }
            });
          if (isExist === false) {
            deletedClients.push(client);
          }
        });
      return deletedClients;
    } else {
      // check is new clients
      !isEmpty(selectedClients) &&
        selectedClients.forEach((client) => {
          let idClient = client.id;
          let isExist = false;
          !isEmpty(initialClients) &&
            initialClients.forEach((element) => {
              if (idClient === element.id) {
                isExist = true;
              }
            });
          if (isExist === false) {
            newClients.push(client);
          }
        });
      return newClients;
    }
  };

  const handleClientsAPI = (industryId) => {
    let newClients = filterClients("create");
    newClients.forEach((element) => {
      OrganizationAPIs.addIndustryClientsById(industryId, element.id).catch(
        (err) => {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(err.response.data.message);
          return;
        }
      );
    });
    let deletedClients = filterClients("delete");
    deletedClients.forEach((element) => {
      OrganizationAPIs.deleteIndustryClientsById(industryId, element.id).catch(
        (err) => {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(err.response.data.message);
          return;
        }
      );
    });
  };

  const filterTopics = () => {
    let newTopics = [];
    selectedTopics.forEach((element) => {
      newTopics.push(element.name);
    });
    return newTopics;
  };

  const formik = useFormik({
    initialValues: data || initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: OrganizationsValidators.Industries,
    onSubmit: (values) => {
      if (
        isEmpty(overView) ||
        isEmpty(selectedClients) ||
        isEmpty(selectedTopics)
      ) {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage("Harap Lengkapi semua form terlebih dahulu!");
        return;
      } else {
        let result = {
          name: values.name,
          tagline: values.tagline,
        };
        if (id === "add") {
          if (fileName === "") {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage("Harap Lengkapi semua form terlebih dahulu!");
            return;
          } else {
            OrganizationAPIs.addIndustries(result)
              .then((res) => {
                let industryId = res.data.data.id;
                OrganizationAPIs.uploadIndustryThumbnailById(
                  res.data.data.id,
                  fileUpload
                ).catch((err) => {
                  setShowAlert(true);
                  setAlerType(2);
                  setAlertMessage(err.response.data.message);
                  return;
                });
                OrganizationAPIs.uploadIndustryBannerById(
                  res.data.data.id,
                  fileUploadBanner
                ).catch((err) => {
                  setShowAlert(true);
                  setAlerType(2);
                  setAlertMessage(err.response.data.message);
                  return;
                });
                handleClientsAPI(industryId);
                let newTopics = filterTopics();
                OrganizationAPIs.updateIndustryTopicsById(
                  industryId,
                  newTopics
                ).catch((err) => {
                  setShowAlert(true);
                  setAlerType(2);
                  setAlertMessage(err.response.data.message);
                  return;
                });
                // Overview
                let overviewData = {
                  text: overView,
                };
                OrganizationAPIs.updateIndustryOverviewById(
                  industryId,
                  overviewData
                ).catch((err) => {
                  setShowAlert(true);
                  setAlerType(2);
                  setAlertMessage(err.response.data.message);
                  return;
                });
                OrganizationAPIs.publishIndustryById(industryId).catch(
                  (err) => {
                    setShowAlert(true);
                    setAlerType(2);
                    setAlertMessage(err.response.data.message);
                    return;
                  }
                );
                setShowAlert(true);
                setAlerType(1);
                setAlertMessage("Data has been Created!");
                formik.resetForm();
              })
              .catch((err) => {
                setShowAlert(true);
                setAlerType(2);
                setAlertMessage(err.response.data.message);
              });
          }
        } else {
          OrganizationAPIs.updateIndustryById(id, result)
            .then((res) => {
              let industryId = res.data.data.id;
              if (fileUpload !== null) {
                OrganizationAPIs.uploadIndustryThumbnailById(
                  industryId,
                  fileUpload
                ).catch((err) => {
                  setShowAlert(true);
                  setAlerType(2);
                  setAlertMessage(err.response.data.message);
                  return;
                });
              }
              if (fileUploadBanner !== null) {
                OrganizationAPIs.uploadIndustryBannerById(
                  res.data.data.id,
                  fileUploadBanner
                ).catch((err) => {
                  setShowAlert(true);
                  setAlerType(2);
                  setAlertMessage(err.response.data.message);
                  return;
                });
              }
              handleClientsAPI(industryId);
              let newTopics = filterTopics();
              OrganizationAPIs.updateIndustryTopicsById(
                industryId,
                newTopics
              ).catch((err) => {
                setShowAlert(true);
                setAlerType(2);
                setAlertMessage(err.response.data.message);
                return;
              });
              let overviewData = {
                text: overView,
              };
              OrganizationAPIs.updateIndustryOverviewById(
                industryId,
                overviewData
              ).catch((err) => {
                setShowAlert(true);
                setAlerType(2);
                setAlertMessage(err.response.data.message);
                return;
              });
              setShowAlert(true);
              setAlerType(1);
              setAlertMessage("Data has been Updated!");
              formik.resetForm();
            })
            .catch((err) => {
              setShowAlert(true);
              setAlerType(2);
              setAlertMessage(err.response.data.message);
            });
        }
      }
    },
  });

  /*** Update Logo **/
  const [fileUpload, setFileUpload] = useState(null);
  const [fileUploadBanner, setFileUploadBanner] = useState(null);
  const [fileName, setFileName] = useState("");
  const [bannerName, setBannerName] = useState("");

  const fileSelectHandler = (event, type) => {
    fileUploadHandler(event.target.files[0], type);
  };
  const fileUploadHandler = (data, type) => {
    const maxSizeUpload = 5000;
    let fd = new FormData();
    if (data !== undefined) {
      const fileSize = data.size / 1024;
      if (fileSize < maxSizeUpload) {
        fd.append("image_file", data);
        if (type === "banner") {
          formik.values.banner_image_url = URL.createObjectURL(data);
          setBannerName(data.name);
          setFileUploadBanner(fd);
        } else {
          formik.values.thumbnail_image_url = URL.createObjectURL(data);
          setFileName(data.name);
          setFileUpload(fd);
        }
      } else {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage("File is too Large, maximal file size is 5MB!");
      }
    }
  };
  /*** Update Logo **/

  const handleOverview = (value) => {
    if (!showRaw) {
      setoverView(value);
    }
  };

  // const handleChangeQuill = (e) => {
  //     setoverView(e.target.value)
  // }

  // const handelShowRaw = () => {
  //     setShowRaw(!showRaw)
  // }

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setShowAlert(false);
    if (alertType === 2) {
      return;
    } else {
      history.push("/website-cms/industries");
    }
  };

  return (
    <div className="wrap-form-industries">
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
          <label>{formType} Industry</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Industries"}
            subMenu={formType}
            url={"/website-cms/industries"}
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="wrap-list-form-industries">
            <div className="mb-3">
              <label className="form-label">Industry Name</label>
              <input
                type="text"
                name="name"
                disabled={formType === "Detail"}
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
              <label className="form-label">Industry Tagline</label>
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
                Industry Thumbnail Photo *recommended image size is 300 x 300 px
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
                  onChange={(e) => fileSelectHandler(e, "thumbnail")}
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
            <div className="mb-3">
              <label className="form-label">
                Industry Banner Image *recommended image size is 200 x 1080px
              </label>
              <div
                className="wrap-images-form"
                style={{
                  display: isEmpty(formik.values.banner_image_url)
                    ? "none"
                    : "block",
                }}
              >
                <img
                  className="logo-form"
                  src={formik.values.banner_image_url}
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
                  onChange={(e) => fileSelectHandler(e, "banner")}
                />
                <span style={{ margin: "0px" }}>
                  {id !== "add"
                    ? "Change"
                    : bannerName === ""
                    ? "Upload"
                    : "Change"}
                </span>
              </label>
              <div className="feedback-error">
                {formik.touched.banner_image_url &&
                  formik.errors.banner_image_url}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Industry Overview</label>
              <div className="wrap-react-quill">
                <SunEditor
                  disable={formType === "Detail"}
                  key={overView ? "notLoadedYet" : "loaded"}
                  setOptions={{
                    showPathLabel: false,
                    minHeight: "50vh",
                    height: "auto",
                    videoWidth: "80%",
                    youtubeQuery: "autoplay=1&mute=1&enablejsapi=1",
                    popupDisplay: "local",
                    resizingBar: true,
                    placeholder: "Enter your text here!!!",
                    plugins: [
                      align,
                      font,
                      fontColor,
                      fontSize,
                      formatBlock,
                      hiliteColor,
                      horizontalRule,
                      lineHeight,
                      list,
                      paragraphStyle,
                      table,
                      template,
                      textStyle,
                      image,
                      link,
                    ],
                    buttonList: [
                      ["undo", "redo"],
                      ["font", "fontSize", "formatBlock"],
                      ["paragraphStyle", "blockquote"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                      ],
                      ["fontColor", "hiliteColor"],
                      ["removeFormat"],
                      "/", // Line break
                      ["outdent", "indent"],
                      ["align", "horizontalRule", "list", "lineHeight"],
                      ["table", "link", "image"],
                      ["fullScreen", "showBlocks", "codeView"],
                    ],
                    formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
                    font: [
                      "Arial",
                      "Calibri",
                      "Comic Sans",
                      "Courier",
                      "Garamond",
                      "Georgia",
                      "Impact",
                      "Lucida Console",
                      "Palatino Linotype",
                      "Segoe UI",
                      "Tahoma",
                      "Times New Roman",
                      "Trebuchet MS",
                    ],
                  }}
                  defaultValue={overView}
                  onChange={handleOverview}
                />
                {/* <button className="btn-wysiwyg" style={{ border: '1px solid #ccc' }} type={'button'} onClick={handelShowRaw}>{!showRaw ? 'Show raw' : 'Show WYSIWYG'}</button> */}
                {/* <ReactQuill theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Write something..."
                                    readOnly={formType === 'Detail'}
                                    onChange={handleOverview}
                                    value={overView}
                                    style={{ display: showRaw ? 'none' : 'initial' }}
                                >
                                </ReactQuill> */}
                {/* <div className="wrap-raw_html" style={{ display: !showRaw ? 'none' : 'initial' }}>
                                    <textarea
                                        className="input-form form-control"
                                        onChange={handleChangeQuill}
                                        value={overView}
                                        rows={10}
                                    >
                                    </textarea>
                                </div> */}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Industry Clients</label>
              <Select
                isDisabled={formType === "Detail"}
                value={selectedClients}
                onChange={(option) => handleMultiChange(option, "clients")}
                components={animatedComponents}
                isMulti
                options={listClients}
                getOptionLabel={(option) => option["name"]}
                getOptionValue={(option) => option["id"]}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Industry Topics</label>
              <Select
                isDisabled={formType === "Detail"}
                value={selectedTopics}
                onChange={(option) => handleMultiChange(option, "topics")}
                components={animatedComponents}
                isMulti
                options={listTopic}
                getOptionLabel={(option) => option["name"]}
                getOptionValue={(option) => option["id"]}
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
          </div>
        </form>
      </div>
    </div>
  );
}
