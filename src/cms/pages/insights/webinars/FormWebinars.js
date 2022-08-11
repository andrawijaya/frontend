import { capitalize, isEmpty, last } from "lodash";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import webinarsCMSAPI from "../../../services/webinarsCMSAPIs";
import SweetAlert from "react-bootstrap-sweetalert";
import topicsCMSAPIs from "../../../services/topicsCMSAPIs";
import * as moment from "moment";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
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
import Cookie from "js-cookie";

const userEmail = Cookie.get("email");

let firstSpeakers = [
  {
    name: "",
    affiliation: "",
    link_url: "",
    image_file: "",
    photo_url: "",
    id: "",
    old: false,
  },
];

let initialData = {
  title: "",
  registration_url: "",
  event_datetime: "",
  registration_deadline_datetime: "",
  event_duration_minutes: 0,
  tagline: "",
  video_url: "",
  topic: "",
};

export default function FormWebinars(props) {
  const history = useHistory();
  const [data, setData] = useState(initialData);
  const [listTopic, setListTopic] = useState(null);
  const [listSpeakers, setListSpeakers] = useState(firstSpeakers);
  const [formType, setFormType] = useState("Add");
  const [idWebinar, setidWebinar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const [webinarStatus, setWebinarStatus] = useState(2);
  const [isFinish, setIsFinish] = useState(false);
  const [createdBy, setCreatedBy] = useState(null);
  const [statusWebinars, setStatusWebinars] = useState("DRAFT");
  const [isFinished, setIsFinished] = useState(false);

  // only in webinars

  useEffect(() => {
    window.scrollTo(0, 0);
    getListTopics();
    if (props.match.params.type !== "add") {
      getListArticleById(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
      setidWebinar(props.match.params.id);
    }
  }, [props.match.params.id, props.match.params.type]);

  const getListTopics = () => {
    topicsCMSAPIs
      .getListTopics()
      .then((res) => {
        setListTopic(res.data.data);
      })
      .catch((err) => {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(err.response.data.message);
      });
  };

  const getListArticleById = (id) => {
    webinarsCMSAPI
      .getWebinarById(id)
      .then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data;
          let newData = {
            title: data.title,
            registration_url: data.registration_url,
            event_datetime: moment(data.event_datetime).format(
              "YYYY-MM-DDTHH:mm"
            ),
            registration_deadline_datetime: moment(
              data.registration_deadline_datetime
            ).format("YYYY-MM-DDTHH:mm"),
            event_duration_minutes: data.event_duration_minutes,
            tagline: data.tagline,
            video_url: data.video_url,
            topic: data.topic,
          };
          setData(newData);
          let status = res.data.data.status;
          setArticleImageUrl(res.data.data.thumbnail_image_url);
          setBannerImageUrl(res.data.data.banner_image_url);
          // let speakers = res.data.data.speakers
          let speakers = !isEmpty(res.data.data.speakers)
            ? res.data.data.speakers.map((speakers) => ({
                ...speakers,
                old: true,
              }))
            : firstSpeakers;
          setWebinarStatus(
            status === "DRAFT"
              ? 2
              : status === "UPCOMING"
              ? 1
              : status === "FINISHED"
              ? 3
              : status === "COMPLETED"
              ? 4
              : 5
          );
          setIsFinish(
            status === "FINISHED" ? true : status === "COMPLETED" ? true : false
          );
          setListSpeakers(speakers);
          setStatusWebinars(status);
          setCreatedBy(res.data.data.meta);
          webinarsCMSAPI.getContentByWebinarId(data.id).then((res) => {
            if (res.data.code === 200) {
              let content = res.data.data.content;
              setContent(content);
            } else {
              setContent("");
            }
          });
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
  };

  const handleCancel = () => {
    history.push("/website-cms/webinars");
  };

  /*** Update Logo **/
  const [isUploading, setIsUploading] = useState(false);
  const [articleImage, setArticleImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [articleImageUrl, setArticleImageUrl] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [isAddSpeaker, setIsAddSpeaker] = useState(true);

  const fileSelectHandler = (event, name) => {
    setIsUploading(true);
    fileUploadHandler(event.target.files[0], name);
  };
  const fileUploadHandler = (data, name) => {
    if (data !== undefined) {
      const maxSizeUpload = 5000;
      const fileSize = data.size / 1024;
      if (fileSize < maxSizeUpload) {
        let image_file = URL.createObjectURL(data);
        let fd = new FormData();
        fd.append("image_file", data);
        if (name === "article") {
          setArticleImage(fd);
          setArticleImageUrl(image_file);
        } else {
          setBannerImage(fd);
          setBannerImageUrl(image_file);
        }
      } else {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage("File is too Large, maximal file size is 5MB!");
      }
    }
    setIsUploading(false);
  };

  /**
   * Upload Speaker's image
   */
  const handleUploadSpeaker = (event, i) => {
    let image_file = URL.createObjectURL(event.target.files[0]);
    let data = event.target.files[0];
    let fd = new FormData();
    if (data !== undefined) {
      const maxSizeUpload = 5000;
      const fileSize = data.size / 1024;
      if (fileSize < maxSizeUpload) {
        fd.append("image_file", event.target.files[0]);
        let newArr = listSpeakers.map((item, index) => {
          if (index === i) {
            return { ...item, image_file: fd, photo_url: image_file };
          } else {
            return item;
          }
        });
        setListSpeakers(newArr);
      } else {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage("File is too Large, maximal file size is 5MB!");
      }
    }
  };
  /**
   * Upload Speaker's image
   */

  const handleAddList = async () => {
    let isComplete = true;
    listSpeakers.forEach((element) => {
      if (
        isEmpty(element.name) ||
        isEmpty(element.affiliation) ||
        isEmpty(element.link_url) ||
        isEmpty(element.photo_url)
      ) {
        isComplete = false;
        setIsAddSpeaker(false);
        return;
      }
    });
    if (isComplete === true) {
      setIsAddSpeaker(true);
      let speaker = [];
      let list = {
        name: "",
        affiliation: "",
        link_url: "",
        image_file: "",
        photo_url: "",
        id: "",
        old: false,
      };
      speaker.push(...listSpeakers, list);
      setListSpeakers(speaker);
    }
  };

  const handleDeleteList = async (i, id) => {
    var array = [...listSpeakers]; // make a separate copy of the array
    array.splice(i, 1);
    setListSpeakers(array);
    id !== "" && deleteSpeaker(id);
  };

  const deleteSpeaker = (id) => {
    webinarsCMSAPI.deleteSpeakersById(idWebinar, id).then((res) => {
      if (res.data.code !== 200) {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(res.data.message);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let author = last(listSpeakers);
    if (isEmpty(articleImageUrl)) {
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage("Please Upload Article Image First!");
      return;
    } else if (isEmpty(bannerImageUrl)) {
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage("Please Upload Article Banner First!");
      return;
    } else if (
      author.old !== true &&
      !(author.image_file instanceof FormData)
    ) {
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage("Please Complete Author details First!");
      return;
    } else if (isEmpty(content)) {
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage("Please fill Content Form!!");
      return;
    } else {
      submitForm(1);
    }
  };

  const submitForm = async (type) => {
    setIsLoading(true);
    let newData = {
      title: data.title,
      registration_url: data.registration_url,
      event_datetime: moment(data.event_datetime).utc().format(),
      registration_deadline_datetime: data.registration_deadline_datetime,
      event_duration_minutes: data.event_duration_minutes,
      tagline: data.tagline,
      video_url: data.video_url,
      topic: data.topic,
    };
    let updateVideoUrl = {
      video_url: data.video_url,
    };
    let tags = {
      tags: [data.topic],
    };
    let newId = "";
    if (formType === "Add") {
      await webinarsCMSAPI.addNewWebinar(newData).then((res) => {
        if (res.data.code === 200) {
          newId = res.data.data.id;
          listSpeakers.forEach((element) => {
            let speaker = {
              name: element.name,
              affiliation: element.affiliation,
              link_url: element.link_url,
            };
            if (
              !isEmpty(element.name) ||
              !isEmpty(element.affiliation) ||
              !isEmpty(element.link_url) ||
              !isEmpty(element.photo_url)
            ) {
              webinarsCMSAPI
                .addSpeakersByWebinarId(newId, speaker)
                .then((res) => {
                  let speakerId = res.data.id;
                  webinarsCMSAPI
                    .uploadspeakersImage(newId, speakerId, element.image_file)
                    .then((res) => {
                      if (res.data.code !== 200) {
                        setShowAlert(true);
                        setAlerType(2);
                        setAlertMessage(res.data.message);
                      }
                    });
                });
            }
          });
        } else {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(res.data.message);
        }
      });
    } else {
      let updatedData;
      if (isFinished === true) {
        updatedData = updateVideoUrl;
      } else {
        updatedData = newData;
      }
      await webinarsCMSAPI
        .updateWebinareById(idWebinar, updatedData)
        .then((res) => {
          if (res.data.code === 200) {
            newId = res.data.data.id;
            let currentSpeakers = listSpeakers;
            currentSpeakers.forEach(async (speakers) => {
              let speaker = {
                name: speakers.name,
                affiliation: speakers.affiliation,
                link_url: speakers.link_url,
              };
              let speakerId = "";
              if (speakers.old === false) {
                if (
                  !isEmpty(speakers.name) ||
                  !isEmpty(speakers.affiliation) ||
                  !isEmpty(speakers.link_url) ||
                  !isEmpty(speakers.photo_url)
                ) {
                  await webinarsCMSAPI
                    .addSpeakersByWebinarId(newId, speaker)
                    .then((res) => {
                      speakerId = res.data.id;
                      if (res.data.code !== 200) {
                        setShowAlert(true);
                        setAlerType(2);
                        setAlertMessage(res.data.message);
                      }
                    });
                }
              } else {
                speakerId = speakers.id;
                await webinarsCMSAPI
                  .updateSpeakersById(newId, speakerId, speaker)
                  .then((res) => {});
              }
              if (speakers.image_file instanceof FormData) {
                await webinarsCMSAPI
                  .uploadspeakersImage(newId, speakerId, speakers.image_file)
                  .then((res) => {
                    if (res.data.code !== 200) {
                      setShowAlert(true);
                      setAlerType(2);
                      setAlertMessage(res.data.message);
                    }
                  });
              }
            });
            if (webinarStatus !== 2 && statusWebinars !== "DRAFT") {
              setShowAlert(true);
              setAlerType(1);
              setAlertMessage("Webinar has been Update!");
            }
          } else {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          }
        });
    }
    if (bannerImage instanceof FormData) {
      await webinarsCMSAPI
        .uploadWebinarBanner(newId, bannerImage)
        .then((res) => {
          if (res.data.code !== 200) {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          }
        });
    }
    if (articleImage instanceof FormData) {
      await webinarsCMSAPI
        .uploadWebinarImage(newId, articleImage)
        .then((res) => {
          if (res.data.code !== 200) {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          }
        });
    }
    await webinarsCMSAPI.updateTagsWebinarById(newId, tags).then((res) => {
      if (res.data.code !== 200) {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(res.data.message);
      }
    });
    await webinarsCMSAPI
      .updateContentWebinarById(newId, { text: content })
      .then((res) => {
        if (res.data.code !== 200) {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(res.data.message);
        }
      });
    if (type === 1) {
      if (webinarStatus !== 5) {
        if (statusWebinars === "DRAFT") {
          await webinarsCMSAPI.publishWebinar(newId).then((res) => {
            if (res.data.code !== 200) {
              setShowAlert(true);
              setAlerType(2);
              setAlertMessage(res.data.message);
            } else {
              if (formType === "Add") {
                setShowAlert(true);
                setAlerType(1);
                setAlertMessage("New Webinars has been Created and Publish!");
              } else {
                setShowAlert(true);
                setAlerType(1);
                setAlertMessage("Webinar has been Update and Publish!");
              }
            }
          });
        }
      } else {
        await webinarsCMSAPI.deleteWebinarById(newId).then((res) => {
          if (res.data.code !== 200) {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          } else {
            setShowAlert(true);
            setAlerType(1);
            setAlertMessage("Webinars has been moved to Archived!");
          }
        });
      }
    } else {
      if (formType === "Add") {
        setShowAlert(true);
        setAlerType(1);
        setAlertMessage("New Webinars has been Created!");
      } else {
        setShowAlert(true);
        setAlerType(1);
        setAlertMessage("Webinars has been Updated!");
      }
    }
    setIsLoading(false);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setShowAlert(false);
    setIsLoading(false);
    if (alertType === 2) {
      return;
    } else {
      history.push("/website-cms/webinars");
    }
  };

  const handleChangeSpeakers = (event, name, index) => {
    let newArr = listSpeakers.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: event.target.value };
      } else {
        return item;
      }
    });
    setListSpeakers(newArr);
  };

  const handleChangeForm = (e) => {
    switch (e.target.name) {
      case "title":
        setData({ ...data, title: e.target.value });
        break;
      case "topic":
        setData({ ...data, topic: e.target.value });
        break;
      case "datetime":
        setData({ ...data, event_datetime: e.target.value });
        break;
      case "duration":
        setData({ ...data, event_duration_minutes: e.target.value });
        break;
      case "registration_link":
        setData({ ...data, registration_url: e.target.value });
        break;
      case "deadline":
        setData({ ...data, registration_deadline_datetime: e.target.value });
        break;
      case "video_url":
        setIsFinished(true);
        setData({ ...data, video_url: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleWysiwyg = (value) => {
    setContent(value);
  };

  return (
    <div className="wrap-article-data__form">
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
          <label>{capitalize(formType)} Webinar</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Insights"}
            subMenu={"List Webinars"}
            url={"/website-cms/webinars"}
            subMenu2={capitalize(formType)}
            subMenuType={capitalize(formType)}
          />
        </div>
      </div>
      <div
        className="content-form-master-data"
        style={{
          padding: "20px 100px",
          backgroundColor: "white",
          borderRadius: "10px",
          margin: "10px 0px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Webinar Title</label>
            <input
              type="text"
              required
              name="title"
              value={data.title}
              onChange={handleChangeForm}
              className="input-form form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Webinar Image *recommended image size is 300 x 300 px
            </label>
            <div
              className="wrap-images-form"
              style={{
                display: isEmpty(articleImageUrl) ? "none" : "block",
                textAlign: "center",
              }}
            >
              <img
                style={{ height: "100px", padding: "0.5rem" }}
                src={articleImageUrl}
                alt="logo"
              />
            </div>
            <label className="wrap-button-upload-file" style={{ width: "25%" }}>
              <input
                style={{ display: "none" }}
                type="file"
                onChange={(e) => fileSelectHandler(e, "article")}
              />
              {isUploading ? (
                <span style={{ margin: "0px" }}>
                  <i className="fa fa-spinner fa-spin"></i>Loading...
                </span>
              ) : (
                <span style={{ margin: "0px" }}>
                  {articleImageUrl !== ""
                    ? "Change"
                    : articleImage !== null
                    ? "Change"
                    : "Upload"}
                </span>
              )}
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Webinar Background *recommended image size is 1240 x 400 px
            </label>
            <div
              className="wrap-images-form"
              style={{
                display: isEmpty(bannerImageUrl) ? "none" : "block",
                textAlign: "center",
              }}
            >
              <img
                style={{ height: "100px", padding: "0.5rem" }}
                src={bannerImageUrl}
                alt="logo"
              />
            </div>
            <label className="wrap-button-upload-file" style={{ width: "25%" }}>
              <input
                style={{ display: "none" }}
                type="file"
                onChange={(e) => fileSelectHandler(e, "banner")}
              />
              {isUploading ? (
                <span style={{ margin: "0px" }}>
                  <i className="fa fa-spinner fa-spin"></i>Loading...
                </span>
              ) : (
                <span style={{ margin: "0px" }}>
                  {bannerImageUrl !== ""
                    ? "Change"
                    : bannerImage !== null
                    ? "Changes"
                    : "Upload"}
                </span>
              )}
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">Webinar Topic</label>
            <select
              required
              defaultValue={data.topic}
              onChange={handleChangeForm}
              name="topic"
              className="form-control form-select input-gray"
              aria-label="Default select example"
            >
              <option value={data.topic} disabled>
                {data.topic === "" ? "Select" : data.topic}
              </option>
              {!isEmpty(listTopic) &&
                listTopic.map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="form-label">
              Webinar Speakers Detail *recommended image size is 300 x 300 px
            </label>
            {!isEmpty(listSpeakers) &&
              listSpeakers.map((v, i) => (
                <div key={i} className="group-input-form">
                  <div className="mb-3">
                    <div
                      className="wrap-images-form"
                      style={{
                        display: isEmpty(v.photo_url) ? "none" : "block",
                        textAlign: "center",
                      }}
                    >
                      <img
                        style={{ height: "100px", padding: "0.5rem" }}
                        src={v.photo_url}
                        alt="logo"
                      />
                    </div>
                    <label
                      className="wrap-button-upload-file"
                      style={{ marginBottom: "0" }}
                    >
                      <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => handleUploadSpeaker(e, i)}
                      />
                      {isUploading ? (
                        <span style={{ margin: "0px" }}>
                          <i className="fa fa-spinner fa-spin"></i>Loading...
                        </span>
                      ) : (
                        <span style={{ margin: "0px" }}>
                          {v.name === "" ? "Upload" : "Change"}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={v.name}
                      name="name"
                      onChange={(e) => handleChangeSpeakers(e, "name", i)}
                      placeholder="Speaker Name"
                      required
                      className="input-form form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={v.affiliation}
                      name="affiliation"
                      onChange={(e) =>
                        handleChangeSpeakers(e, "affiliation", i)
                      }
                      required
                      placeholder="Speaker Position"
                      className="input-form form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={v.link_url}
                      name="link_url"
                      onChange={(e) => handleChangeSpeakers(e, "link_url", i)}
                      required
                      placeholder="Speaker Linkedln Link"
                      className="input-form form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="button"
                      disabled={listSpeakers.length <= 1}
                      onClick={() => handleDeleteList(i, v.id)}
                      className="x-btn"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="primary-btn"
              onClick={handleAddList}
              style={{ borderRadius: "0.25rem" }}
            >
              + Speaker Detail
            </button>
            <div
              style={{ display: !isAddSpeaker ? "inherit" : "none" }}
              className="feedback-error"
            >
              {"Harap Lengkapi Form terlebih dahulu!"}
            </div>
          </div>
          <div className="group-input-form">
            <div className="mb-3" style={{ width: "100%" }}>
              <label className="form-label">Starting Date time</label>
              <input
                type="datetime-local"
                required
                onChange={handleChangeForm}
                name="datetime"
                value={data.event_datetime}
                className="input-form form-control"
              />
            </div>
            <div style={{ textAlign: "left" }} className="mb-3">
              <label className="form-label">Duration</label>
              <input
                type="number"
                required
                onChange={handleChangeForm}
                name="duration"
                value={data.event_duration_minutes}
                className="input-form form-control"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Webinar Registration Link</label>
            <input
              type="text"
              required
              onChange={handleChangeForm}
              name="registration_link"
              value={data.registration_url}
              className="input-form form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <div className="wrap-react-quill">
              <SunEditor
                key={content ? "notLoadedYet" : "loaded"}
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
                defaultValue={content}
                onChange={handleWysiwyg}
              />
            </div>
          </div>
          <div className="mb-3" style={{ width: "100%" }}>
            <label className="form-label">Deadline Registration</label>
            <input
              type="datetime-local"
              required
              onChange={handleChangeForm}
              name="deadline"
              value={data.registration_deadline_datetime}
              className="input-form form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Recorded Webinar Video Link</label>
            <input
              type="text"
              disabled={!isFinish}
              name="video_url"
              value={data.video_url}
              onChange={handleChangeForm}
              className="input-form form-control"
            />
          </div>

          <div className="wrap-action-form" style={{ width: "fit-content" }}>
            <label>Webinar Posting Status</label>
            <div className="detail-action-form">
              <p>
                Status :{" "}
                <b>
                  {statusWebinars === "DRAFT"
                    ? "Draft"
                    : statusWebinars === "UPCOMING"
                    ? "Upcoming"
                    : statusWebinars === "FINISHED"
                    ? "Finished"
                    : statusWebinars === "COMPLETED"
                    ? "Recorded"
                    : "DRAFT"}
                </b>
              </p>
              <p>
                Created by :{" "}
                <b>{isEmpty(createdBy) ? userEmail : createdBy.created_by}</b>
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
                disabled={webinarStatus !== 2 || isLoading === true}
                onClick={() => submitForm(2)}
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
                  Post {webinarStatus === 2 ? "Webinar" : "Changes"}
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
        </form>
      </div>
    </div>
  );
}
