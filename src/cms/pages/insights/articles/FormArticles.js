import { capitalize, isEmpty, last, toInteger } from "lodash";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import articlesCMSAPI from "../../../services/articlesCMSAPIs";
import SweetAlert from "react-bootstrap-sweetalert";
import topicsCMSAPIs from "../../../services/topicsCMSAPIs";
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
import Cookie from "js-cookie";

const userEmail = Cookie.get("email");

let firstAuthors = [
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

export default function FormArticles(props) {
  const history = useHistory();
  const [listTopic, setListTopic] = useState(null);
  const [listAuthors, setListAuthors] = useState(firstAuthors);
  const [formType, setFormType] = useState("Add");
  const [idArticle, setidArticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [articleStatusId, setArticleStatusId] = useState(2);
  const [articleStatus, setArticleStatus] = useState("DRAFT");
  const [createdBy, setCreatedBy] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getListTopics();
    if (props.match.params.type !== "add") {
      getListArticleById(props.match.params.id);
      setFormType(capitalize(props.match.params.type));
      setidArticle(props.match.params.id);
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
    articlesCMSAPI
      .getArticleById(id)
      .then((res) => {
        if (res.data.code === 200) {
          let status = res.data.data.status;
          setArticleTitle(res.data.data.title);
          setArticleImageUrl(res.data.data.thumbnail_image_url);
          setBannerImageUrl(res.data.data.banner_image_url);
          setTopic(res.data.data.topic);
          let authors = !isEmpty(res.data.data.authors)
            ? res.data.data.authors.map((authors) => ({
                ...authors,
                old: true,
              }))
            : firstAuthors;
          setArticleStatusId(
            status === "DRAFT" ? 2 : status === "PUBLISHED" ? 1 : 2
          );
          setArticleStatus(status);
          setListAuthors(authors);
          setCreatedBy(res.data.data.meta);
          articlesCMSAPI.getContentByArticleId(res.data.data.id).then((res) => {
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
    history.push("/website-cms/articles");
  };

  /*** Update Logo **/
  const [isUploading, setIsUploading] = useState(false);
  const [articleImage, setArticleImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [articleImageUrl, setArticleImageUrl] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [isAddAuthors, setIsAddAuthors] = useState(true);

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
        setIsUploading(false);
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
   * Upload Author's image
   */
  const handleUploadAuthors = (event, i) => {
    let data = event.target.files[0];
    if (data !== undefined) {
      const maxSizeUpload = 5000;
      const fileSize = data.size / 1024;
      if (fileSize < maxSizeUpload) {
        let image_file = URL.createObjectURL(event.target.files[0]);
        let fd = new FormData();
        fd.append("image_file", event.target.files[0]);
        let newArr = listAuthors.map((item, index) => {
          if (index === i) {
            return { ...item, image_file: fd, photo_url: image_file };
          } else {
            return item;
          }
        });
        setListAuthors(newArr);
      } else {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage("File is too Large, maximal file size is 5MB!");
      }
    }
  };

  /**
   * Upload Author's image
   */

  const handleAddList = async () => {
    let isComplete = true;
    listAuthors.forEach((element) => {
      if (
        isEmpty(element.name) ||
        isEmpty(element.affiliation) ||
        isEmpty(element.link_url) ||
        isEmpty(element.photo_url)
      ) {
        isComplete = false;
        setIsAddAuthors(false);
        return;
      }
    });
    if (isComplete === true) {
      setIsAddAuthors(true);
      let author = [];
      let list = {
        name: "",
        affiliation: "",
        link_url: "",
        image_file: "",
        photo_url: "",
        id: "",
        old: false,
      };
      author.push(...listAuthors, list);
      setListAuthors(author);
    }
  };

  const handleDeleteList = async (i, id) => {
    var array = [...listAuthors]; // make a separate copy of the array
    array.splice(i, 1);
    setListAuthors(array);
    id !== "" && deleteAuthors(id);
  };

  const deleteAuthors = (id) => {
    articlesCMSAPI.deleteAuthorsById(idArticle, id).then((res) => {
      if (res.data.code !== 200) {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(res.data.message);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let author = last(listAuthors);
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
      title: articleTitle,
      tagline: "",
      topic: topic,
    };
    let tags = {
      tags: [topic],
    };
    let newId = "";
    if (formType === "Add") {
      await articlesCMSAPI.addNewArticle(newData).then((res) => {
        if (res.data.code === 200) {
          newId = res.data.data.id;
          listAuthors.forEach((element) => {
            let author = {
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
              articlesCMSAPI
                .addAuthorsByArticleId(newId, author)
                .then((res) => {
                  let authorId = res.data.id;
                  articlesCMSAPI
                    .uploadAuthorsImage(newId, authorId, element.image_file)
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
      await articlesCMSAPI.updateArticleById(idArticle, newData).then((res) => {
        if (res.data.code === 200) {
          newId = res.data.data.id;
          let currentAuthors = listAuthors;
          currentAuthors.forEach(async (authors) => {
            let author = {
              name: authors.name,
              affiliation: authors.affiliation,
              link_url: authors.link_url,
            };
            let authorId = "";
            if (authors.old === false) {
              if (
                !isEmpty(authors.name) ||
                !isEmpty(authors.affiliation) ||
                !isEmpty(authors.link_url) ||
                !isEmpty(authors.photo_url)
              ) {
                await articlesCMSAPI
                  .addAuthorsByArticleId(newId, author)
                  .then((res) => {});
              }
            } else {
              authorId = authors.id;
              await articlesCMSAPI
                .updateAuthorsById(newId, authorId, author)
                .then((res) => {});
            }
            if (authors.image_file instanceof FormData) {
              await articlesCMSAPI
                .uploadAuthorsImage(newId, authorId, authors.image_file)
                .then((res) => {
                  if (res.data.code !== 200) {
                    setShowAlert(true);
                    setAlerType(2);
                    setAlertMessage(res.data.message);
                  }
                });
            }
          });
          if (articleStatus !== "DRAFT") {
            setShowAlert(true);
            setAlerType(1);
            setAlertMessage("Article has been Update!");
          }
        } else {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(res.data.message);
        }
      });
    }
    if (bannerImage instanceof FormData) {
      await articlesCMSAPI
        .uploadArticleBanner(newId, bannerImage)
        .then((res) => {
          if (res.data.code !== 200) {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          }
        });
    }
    if (articleImage instanceof FormData) {
      await articlesCMSAPI
        .uploadArticleImage(newId, articleImage)
        .then((res) => {
          if (res.data.code !== 200) {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          }
        });
    }
    await articlesCMSAPI.updateTagsArticleById(newId, tags).then((res) => {
      if (res.data.code !== 200) {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(res.data.message);
      }
    });
    await articlesCMSAPI
      .updateContentArticleById(newId, { text: content })
      .then((res) => {
        if (res.data.code !== 200) {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(res.data.message);
        }
      });
    if (type === 1) {
      if (articleStatusId !== 3) {
        if (articleStatus === "DRAFT") {
          await articlesCMSAPI.publishArticle(newId).then((res) => {
            if (res.data.code !== 200) {
              setShowAlert(true);
              setAlerType(2);
              setAlertMessage(res.data.message);
            } else {
              if (formType === "Add") {
                setShowAlert(true);
                setAlerType(1);
                setAlertMessage("New Article has been Created and Publish!");
              } else {
                setShowAlert(true);
                setAlerType(1);
                setAlertMessage("Article has been Update and Publish!");
              }
            }
          });
        }
      } else {
        await articlesCMSAPI.deleteArticleById(newId).then((res) => {
          if (res.data.code !== 200) {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          } else {
            setShowAlert(true);
            setAlerType(1);
            setAlertMessage("Article has been moved to Archived!");
          }
        });
      }
    } else {
      if (formType === "Add") {
        setShowAlert(true);
        setAlerType(1);
        setAlertMessage("New Article has been Created!");
      } else {
        setShowAlert(true);
        setAlerType(1);
        setAlertMessage("Article has been Updated!");
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
      history.push("/website-cms/articles");
    }
  };

  const handleChangeAuthors = (event, name, index) => {
    let newArr = listAuthors.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: event.target.value };
      } else {
        return item;
      }
    });
    setListAuthors(newArr);
  };

  const handleChangeForm = (e) => {
    switch (e.target.name) {
      case "title":
        setArticleTitle(e.target.value);
        break;
      case "topic":
        setTopic(e.target.value);
        break;
      case "status":
        setArticleStatusId(toInteger(e.target.value));
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
          <label>{capitalize(formType)} Article</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Insights"}
            subMenu={"Article"}
            url={"/website-cms/articles"}
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
            <label className="form-label">Article Title</label>
            <input
              type="text"
              required
              name="title"
              value={articleTitle}
              onChange={handleChangeForm}
              className="input-form form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Article Image *recommended image size is 300 x 300 px
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
              Article Banner *recommended image size is 1240 x 400 px
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
            <label className="form-label">Article Topic</label>
            <select
              required
              defaultValue={topic}
              onChange={handleChangeForm}
              name="topic"
              className="form-control form-select input-gray"
              aria-label="Default select example"
            >
              <option value={topic} disabled>
                {topic === "" ? "Pilih" : topic}
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
              Authors Detail *recommended image size is 300 x 300 px
            </label>
            {!isEmpty(listAuthors) &&
              listAuthors.map((v, i) => (
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
                        onChange={(e) => handleUploadAuthors(e, i)}
                      />
                      {isUploading ? (
                        <span style={{ margin: "0px" }}>
                          <i className="fa fa-spinner fa-spin"></i>Loading...
                        </span>
                      ) : (
                        <span style={{ margin: "0px" }}>
                          {v.photo_url === "" ? "Upload" : "Change"}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={v.name}
                      name="name"
                      onChange={(e) => handleChangeAuthors(e, "name", i)}
                      placeholder="Author Name"
                      required
                      className="input-form form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={v.affiliation}
                      name="affiliation"
                      onChange={(e) => handleChangeAuthors(e, "affiliation", i)}
                      required
                      placeholder="Author Position"
                      className="input-form form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={v.link_url}
                      name="link_url"
                      onChange={(e) => handleChangeAuthors(e, "link_url", i)}
                      required
                      placeholder="Author Linkedln Link"
                      className="input-form form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="button"
                      disabled={listAuthors.length <= 1}
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
              + Author Detail
            </button>
            <div
              style={{ display: !isAddAuthors ? "inherit" : "none" }}
              className="feedback-error"
            >
              {"Harap Lengkapi Form terlebih dahulu!"}
            </div>
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
          <div className="wrap-action-form" style={{ width: "fit-content" }}>
            <label>Article Posting Status</label>
            {articleStatusId !== 2 ? (
              <div className="mb-3">
                <select
                  required
                  name="status"
                  onChange={handleChangeForm}
                  defaultValue={articleStatusId}
                  style={{
                    width: "min-content",
                    paddingRight: "20px",
                    borderRadius: "10px",
                  }}
                  className="form-control form-select input-gray"
                  aria-label="Default select example"
                >
                  <option value={1}>Published</option>
                  <option value={3}>Archived</option>
                </select>
              </div>
            ) : null}
            <div className="detail-action-form">
              <p>
                Status :{" "}
                <b>
                  {articleStatusId === 1
                    ? "Published"
                    : articleStatusId === 2
                    ? "Draft"
                    : "Archived"}
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
                disabled={articleStatusId !== 2 || isLoading === true}
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
                  Publish {articleStatusId === 2 ? "Article" : "Changes"}
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
