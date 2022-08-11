import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ListBreadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import subscriptionsCMSAPIs from "../../services/subscriptionsCMSAPIs";
import * as FaICons from "react-icons/fa";
import * as moment from "moment";
import { isEmpty } from "lodash";
import { capitalize } from "lodash-es";

export default function SubscriptionsForm(props) {
  const [data, setData] = useState(null);
  const history = useHistory();
  const [formType, setFormType] = useState("Detail On Going");

  useEffect(() => {
    window.scrollTo(0, 0);
    getSubscriptionDetail(props.match.params.id);
    setFormType(
      capitalize(props.match.params.type) === "Start"
        ? "Detail On Going"
        : "Detail Stopped"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id, props.match.params.type]);

  const getSubscriptionDetail = async (id) => {
    let type =
      props.match.params.type === "start"
        ? subscriptionsCMSAPIs.getSubscriptionById(id)
        : subscriptionsCMSAPIs.getUnsubscriptionById(id);
    await type
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCancel = () => {
    history.push("/website-cms/subscriptions");
  };

  return (
    <div className="wrap-form-subscribe">
      <div className="wrap-inside-form-industries">
        <div className="heading-title">
          <label>Detail Subscription</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Subscription"}
            subMenu={formType}
            url={"/website-cms/subscriptions"}
          />
        </div>
        {!isEmpty(data) ? (
          <div className="wrap-list-form-industries">
            <div className="grouping-form">
              <div
                style={{ width: "50%", paddingRight: "0.5rem" }}
                className="mb-3"
              >
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  disabled
                  value={data.name}
                  required
                  className="input-form form-control"
                />
              </div>
              <div
                style={{ width: "50%", paddingLeft: "0.5rem" }}
                className="mb-3"
              >
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={data.email}
                  required
                  className="input-form form-control"
                />
              </div>
            </div>
            <div className="grouping-form">
              <div
                style={{ width: "50%", paddingRight: "0.5rem" }}
                className="mb-3"
              >
                <label className="form-label">Telephone Number</label>
                <input
                  type="text"
                  name="phone"
                  disabled
                  value={data.phone}
                  required
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
                  required
                  className="input-form form-control"
                />
              </div>
            </div>
            <div className="grouping-form">
              <div
                style={{ width: "50%", paddingRight: "0.5rem" }}
                className="mb-3"
              >
                <label className="form-label">Starting Date</label>
                <input
                  type="text"
                  name="created_at"
                  disabled
                  value={moment(data.meta.created_at).format(
                    "DD MMMM YYYY, hh:mm:ss A"
                  )}
                  required
                  className="input-form form-control"
                />
              </div>
              <div
                style={{
                  width: "50%",
                  paddingLeft: "0.5rem",
                  display:
                    formType === "Detail Stopped" ? "inline-grid" : "none",
                }}
                className="mb-3"
              >
                <label className="form-label">Stop Date</label>
                <input
                  type="text"
                  name="updated_at"
                  disabled
                  value={moment(data.meta.updated_at).format(
                    "DD MMMM YYYY, hh:mm:ss A"
                  )}
                  required
                  className="input-form form-control"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Subscription</label>
              <div>
                {!isEmpty(data.article_topics) ? (
                  <div>
                    <div style={{ margin: "0.5rem 0rem" }}>
                      <FaICons.FaSquare
                        style={{ color: "#79BCC4", fontSize: "medium" }}
                      />
                      <label
                        style={{ marginBottom: "0px", paddingLeft: "0.5rem" }}
                      >
                        Article Topic
                      </label>
                    </div>
                    <div className="grouping-form">
                      {data.article_topics.map((data, index) => (
                        <div className="wrap-list-subscribe" key={index}>
                          <button className="list-subscribe">{data}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {!isEmpty(data.webinar_topics) ? (
                  <div>
                    <div style={{ margin: "0.5rem 0rem" }}>
                      <FaICons.FaSquare
                        style={{ color: "#79BCC4", fontSize: "medium" }}
                      />
                      <label
                        style={{ marginBottom: "0px", paddingLeft: "0.5rem" }}
                      >
                        Webinar Topics
                      </label>
                    </div>
                    <div className="grouping-form">
                      {data.webinar_topics.map((data, index) => (
                        <div className="wrap-list-subscribe" key={index}>
                          <button className="list-subscribe">{data}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {!isEmpty(data.career_topics) ? (
                  <div>
                    <div style={{ margin: "0.5rem 0rem" }}>
                      <FaICons.FaSquare
                        style={{ color: "#79BCC4", fontSize: "medium" }}
                      />
                      <label
                        style={{ marginBottom: "0px", paddingLeft: "0.5rem" }}
                      >
                        Job Vacancies
                      </label>
                    </div>
                    <div className="grouping-form">
                      {data.career_topics.map((data, index) => (
                        <div className="wrap-list-subscribe" key={index}>
                          <button className="list-subscribe">{data}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
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
                {"Back"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
