import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import * as moment from "moment";
import MessagesCMSAPI from "../../services/messagesCMSAPIs";
import { isEmpty } from "lodash";

export default function MessagesForm(props) {
  const [data, setData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetDetailsMessage(props.match.params.id);
  }, [props.match.params.id]);

  const handleGetDetailsMessage = (id) => {
    MessagesCMSAPI.getMessageById(id)
      .then((res) => {
        let data = res.data.data;
        data.inquiry.general === true
          ? (data["selectedInquiry"] = "General")
          : data.inquiry.career === true
          ? (data["selectedInquiry"] = "Career")
          : !isEmpty(data.inquiry.industries)
          ? (data["selectedInquiry"] = "Industries")
          : (data["selectedInquiry"] = "Services");
        setData(data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCancel = () => {
    history.push("/website-cms/messages");
  };

  return (
    <div className="wrap-form-messages">
      <div className="wrap-inside-form-industries">
        <div className="heading-title">
          <label>{"Detail"} Messages</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Messages"}
            subMenu={"Detail"}
            url={"/website-cms/messages"}
          />
        </div>
        {!isEmpty(data) ? (
          <div className="wrap-list-form-industries">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                disabled
                value={data.name}
                className="input-form form-control"
              />
            </div>
            <div className="grouping-form">
              <div
                style={{ width: "25%", paddingRight: "0.5rem" }}
                className="mb-3"
              >
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  disabled
                  value={data.email}
                  className="input-form form-control"
                />
              </div>
              <div
                style={{
                  width: "25%",
                  paddingRight: "0.5rem",
                  paddingLeft: "0.5rem",
                }}
                className="mb-3"
              >
                <label className="form-label">Telephone Number</label>
                <input
                  type="text"
                  name="phone"
                  disabled
                  value={data.phone}
                  className="input-form form-control"
                />
              </div>
              <div
                style={{ width: "50%", paddingLeft: "0.5rem" }}
                className="mb-3"
              >
                <label className="form-label">Organization</label>
                <input
                  type="text"
                  name="organization"
                  disabled
                  value={data.organization}
                  className="input-form form-control"
                />
              </div>
            </div>
            <div className="grouping-form">
              <div
                style={{ width: "50%", paddingRight: "0.5rem" }}
                className="mb-3"
              >
                <label className="form-label">Inquiry</label>
                <input
                  type="text"
                  name="inquiry"
                  disabled
                  value={data.selectedInquiry}
                  className="input-form form-control"
                />
              </div>
              <div
                style={{ width: "50%", paddingLeft: "0.5rem" }}
                className="mb-3"
              >
                <label className="form-label">Date & Time</label>
                <input
                  type="text"
                  name="updated_at"
                  disabled
                  value={moment(data.updated_at).format(
                    "DD MMMM YYYY, hh:mm:ss A"
                  )}
                  required
                  className="input-form form-control"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                disabled
                value={data.subject}
                className="input-form form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                type="text"
                name="message"
                rows={5}
                disabled
                value={data.message}
                className="input-form form-control"
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
                {"Back"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
