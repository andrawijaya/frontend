import React, { useState, useEffect } from "react";
import "./Messages.css";
import ListBreadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { isEmpty } from "lodash";
import * as moment from "moment";
import MessagesCMSAPI from "../../services/messagesCMSAPIs";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

export default function Messages() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [isFetch, setIsFetch] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    getListMessages(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetch]);

  const getListMessages = (page) => {
    const param = {
      params: {
        sort_by: `meta.created_at`,
        sort_order: "DESCENDING",
        page_number: page,
        page_size: limit,
      },
    };
    MessagesCMSAPI.getListMessages(param)
      .then((res) => {
        let data = res.data.data;
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          item.inquiry.general === true
            ? (item["selectedInquiry"] = "General")
            : item.inquiry.career === true
            ? (item["selectedInquiry"] = "Career")
            : !isEmpty(item.inquiry.industries)
            ? (item["selectedInquiry"] = "Industries")
            : (item["selectedInquiry"] = "Services");
        });
        setData(data);
        setLastPage(Math.ceil(res.data.meta.paging.count / limit));
        setTotalData(res.data.meta.paging.count);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleFirst = () => {
    getListMessages(1);
    setPage(1);
  };

  const handlePrev = () => {
    getListMessages(page - 1);
    setPage(page - 1);
  };
  const handleNext = () => {
    getListMessages(page + 1);
    setPage(page + 1);
  };
  const handleLast = () => {
    getListMessages(lastPage);
    setPage(lastPage);
  };

  const handleDeleteData = (id) => {
    setIdDelete(id);
    setShowAlert(true);
    setAlerType(3);
    setAlertMessage(`Do you really want to delete this messages?`);
  };

  const confirmDeleteData = () => {
    MessagesCMSAPI.deleteMessageById(idDelete)
      .then((res) => {
        setIsFetch(!isFetch);
        setShowAlert(true);
        setAlerType(1);
        setAlertMessage("Data has been Deleted!");
      })
      .catch((err) => {
        setIsFetch(!isFetch);
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage(err.response.data.message);
      });
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setIdDelete("");
    setShowAlert(false);
    return;
  };

  return (
    <div className="wrap-message">
      <SweetAlert
        show={showAlert}
        showCancel={alertType === 3}
        cancelBtnText={"Cancel"}
        cancelBtnBsStyle={"outline-secondary"}
        onCancel={hideAlert}
        confirmBtnText={alertType === 3 ? "Delete" : "OK"}
        confirmBtnBsStyle={alertType === 3 ? "danger" : "success"}
        title={
          alertType === 1
            ? "Succes!"
            : alertType === 2
            ? "Invalid!"
            : "Are you sure?"
        }
        onConfirm={alertType === 3 ? confirmDeleteData : hideAlert}
        danger={alertType === 3}
        warning={alertType === 2}
        success={alertType === 1}
      >
        {alertMessage}
      </SweetAlert>
      <div className="wrap-inside-industries">
        <div className="heading-title">
          <label>Messages</label>
          <div
            className="wrap-breadcrumb div_flex"
            style={{ paddingBottom: "10px", alignItems: "flex-start" }}
          >
            <ListBreadcrumbs
              menu={"list"}
              name={"Messages"}
              subMenu={""}
              url={"/website-cms/messages"}
            />
            {/* <div className="wrap-btn">
                            <button onClick={handleAdd} className="primary-btn">Add</button>
                        </div> */}
          </div>
        </div>

        <div className="wrap-content-table__master-data">
          <div className="wrap-table-user">
            <div className="title-table row">
              <div className="col-3">Name</div>
              <div className="col-3">Inquiry</div>
              <div className="col-3">Date and Time</div>
              <div className="col-3" style={{ textAlign: "center" }}>
                Action
              </div>
            </div>
            <div className="wrap-content-table">
              {!isEmpty(data) &&
                data.map((v, i) => (
                  <div key={i} className="content-table row">
                    <div className="col-3">{v.name}</div>
                    <div className="col-3">{v.selectedInquiry}</div>
                    <div className="col-3">
                      {moment(v.meta.created_at).format(
                        "DD MMMM YYYY, hh:mm:ss A"
                      )}
                    </div>
                    <div
                      className="col-3"
                      style={{
                        justifyContent: "space-evenly",
                        display: "flex",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{ pathname: `/website-cms/messages/${v.id}` }}
                        className="a-href-label"
                      >
                        Detail
                      </Link>
                      <label
                        onClick={() => handleDeleteData(v.id)}
                        className="a-href-label"
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                ))}
            </div>
            {!isEmpty(data) ? (
              <div
                className="wrap-button-pagination"
                style={{ padding: "0px" }}
              >
                <div className="d-flex">
                  <div className="p-2 flex-grow-1"></div>
                  <div className="p-2">
                    <div
                      className="group-button"
                      role="group"
                      aria-label="Basic example"
                    >
                      <label
                        className="pagination-info"
                        style={{
                          margin: "0px",
                          paddingRight: "10px",
                          fontSize: "12px",
                        }}
                      >
                        Showing Row <label>{page * limit - limit + 1}</label> to{" "}
                        <label>
                          {totalData > limit * page ? limit * page : totalData}
                        </label>{" "}
                        of Total <label>{totalData}</label>
                      </label>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleFirst()}
                        style={{ fontWeight: "600" }}
                        disabled={page === 1}
                      >
                        First
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handlePrev()}
                        style={{ fontWeight: "600" }}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleNext()}
                        style={{ fontWeight: "600" }}
                        disabled={page === lastPage}
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleLast()}
                        style={{ fontWeight: "600" }}
                        disabled={page === lastPage}
                      >
                        Last
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
