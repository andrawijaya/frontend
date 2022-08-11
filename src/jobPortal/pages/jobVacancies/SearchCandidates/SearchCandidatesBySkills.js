import React, { useState, useEffect } from "react";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import ava from "../../../../assets/svg/ava-candidate.svg";
import { isEmpty } from "lodash";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import * as ImIcons from "react-icons/im";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CandidatesAPIs from "../../../services/candidatesAPIs";

export default function SearchCandidates() {
  const animatedComponents = makeAnimated();
  const [listSkills, setListSkills] = useState(null);
  const [selectedSkills, setselectedSkills] = useState(null);
  const [search, setSearch] = useState("");
  const [isFirstRender, setisFirstRender] = useState(true);
  const [activeToogle, setActiveToogle] = useState("1");
  const [candidateInfo, setCandidateInfo] = useState("1");
  const [limit] = useState(10);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const [dataPending, setDataPending] = useState(null);
  const [dataApproved, setDataApproved] = useState(null);
  const [dataInterviews, setDataInterviews] = useState(null);
  const [dataOffered, setDataOffered] = useState(null);
  const [dataHired, setDataHired] = useState(null);
  const [dataRejected, setDataRejected] = useState(null);

  const [pagePending, setPagePending] = useState(1);
  const [pageApproved, setPageApproved] = useState(1);
  const [pageInterviews, setPageInterviews] = useState(1);
  const [pageOffered, setPageOffered] = useState(1);
  const [pageHired, setPageHired] = useState(1);
  const [pageRejected, setPageRejected] = useState(1);

  const [LastPagePending, setLastPagePending] = useState(0);
  const [LastPageApproved, setLastPageApproved] = useState(0);
  const [LastPageInterviews, setLastPageInterviews] = useState(0);
  const [LastPageOffered, setLastPageOffered] = useState(0);
  const [LastPageHired, setLastPageHired] = useState(0);
  const [LastPageRejected, setLastPageRejected] = useState(0);

  const [totalDataPending, setTotalDataPending] = useState(0);
  const [totalDataApproved, setTotalDataApproved] = useState(0);
  const [totalDataInterviews, setTotalDataInterviews] = useState(0);
  const [totalDataOffered, setTotalDataOffered] = useState(0);
  const [totalDataHired, setTotalDataHired] = useState(0);
  const [totalDataRejected, setTotalDataRejected] = useState(0);

  const handleCandidateInfo = (id) => {
    setCandidateInfo(id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getListCandidates("PENDING", 1);
    getListCandidates("APPROVED", 1);
    getListCandidates("INTERVIEW", 1);
    getListCandidates("OFFERED", 1);
    getListCandidates("HIRED", 1);
    getListCandidates("REJECTED", 1);
  };

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    getListSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListSkills = () => {
    CandidatesAPIs.getListSkillsRecruitment().then((res) => {
      let skills = [];
      !isEmpty(res.data.data) &&
        res.data.data.forEach((element) => {
          skills.push({ name: element });
        });
      setListSkills(skills);
    });
  };

  const getListCandidates = (status, page) => {
    const param = {
      params: {
        sort_by: "meta.created_at",
        sort_order: "DESCENDING",
        page_number: page,
        page_size: limit,
        status: status,
        search: search,
      },
    };
    CandidatesAPIs.getListCandidatesBySkills(param).then((res) => {
      let name = status;
      switch (name) {
        case "PENDING":
          setLastPagePending(Math.ceil(res.data.meta.paging.count / limit));
          setTotalDataPending(res.data.meta.paging.count);
          setDataPending(res.data.data);
          if (isFirstRender === true && activeToogle === "1") {
            res.data.data.length > 0 && setSelectedCandidate(res.data.data[0]);
            setData(res.data.data);
            setTotalData(res.data.meta.paging.count);
            setLastPage(Math.ceil(res.data.meta.paging.count / limit));
          }
          if (activeToogle === "1") {
            res.data.data.length > 0 && setSelectedCandidate(res.data.data[0]);
            setData(res.data.data);
            setTotalData(res.data.meta.paging.count);
            setLastPage(Math.ceil(res.data.meta.paging.count / limit));
          }
          break;
        case "APPROVED":
          setLastPageApproved(Math.ceil(res.data.meta.paging.count / limit));
          setTotalDataApproved(res.data.meta.paging.count);
          setDataApproved(res.data.data);
          if (activeToogle === "2") {
            res.data.data.length > 0 && setSelectedCandidate(res.data.data[0]);
            setData(res.data.data);
            setTotalData(res.data.meta.paging.count);
            setLastPage(Math.ceil(res.data.meta.paging.count / limit));
          }
          break;
        case "INTERVIEW":
          setLastPageInterviews(Math.ceil(res.data.meta.paging.count / limit));
          setTotalDataInterviews(res.data.meta.paging.count);
          setDataInterviews(res.data.data);
          if (activeToogle === "3") {
            res.data.data.length > 0 && setSelectedCandidate(res.data.data[0]);
            setData(res.data.data);
            setTotalData(res.data.meta.paging.count);
            setLastPage(Math.ceil(res.data.meta.paging.count / limit));
          }
          break;
        case "OFFERED":
          setLastPageOffered(Math.ceil(res.data.meta.paging.count / limit));
          setTotalDataOffered(res.data.meta.paging.count);
          setDataOffered(res.data.data);
          if (activeToogle === "4") {
            res.data.data.length > 0 && setSelectedCandidate(res.data.data[0]);
            setData(res.data.data);
            setTotalData(res.data.meta.paging.count);
            setLastPage(Math.ceil(res.data.meta.paging.count / limit));
          }
          break;
        case "HIRED":
          setLastPageHired(Math.ceil(res.data.meta.paging.count / limit));
          setTotalDataHired(res.data.meta.paging.count);
          setDataHired(res.data.data);
          if (activeToogle === "5") {
            res.data.data.length > 0 && setSelectedCandidate(res.data.data[0]);
            setData(res.data.data);
            setTotalData(res.data.meta.paging.count);
            setLastPage(Math.ceil(res.data.meta.paging.count / limit));
          }
          break;
        case "REJECTED":
          setLastPageRejected(Math.ceil(res.data.meta.paging.count / limit));
          setTotalDataRejected(res.data.meta.paging.count);
          setDataRejected(res.data.data);
          if (activeToogle === "6") {
            res.data.data.length > 0 && setSelectedCandidate(res.data.data[0]);
            setData(res.data.data);
            setTotalData(res.data.meta.paging.count);
            setLastPage(Math.ceil(res.data.meta.paging.count / limit));
          }
          break;
        default:
          break;
      }
      setisFirstRender(false);
    });
  };

  const handleSelectCandidate = (data) => {
    setSelectedCandidate(data);
  };
  const handleFirst = (type) => {
    let name = activeToogle;
    setPage(1);
    switch (name) {
      case "1":
        setPagePending(1);
        getListCandidates("PENDING", 1);
        break;
      case "2":
        setPageApproved(1);
        getListCandidates("APPROVED", 1);
        break;
      case "3":
        setPageInterviews(1);
        getListCandidates("INTERVIEW", 1);
        break;
      case "4":
        setPageOffered(1);
        getListCandidates("INTERVIEW", 1);
        break;
      case "5":
        setPageHired(1);
        getListCandidates("OFFERED", 1);
        break;
      case "6":
        setPageRejected(1);
        getListCandidates("REJECTED", 1);
        break;
      default:
        break;
    }
  };

  const handlePrev = (type) => {
    let name = activeToogle;
    switch (name) {
      case "1":
        setPagePending(pagePending - 1);
        setPage(pagePending - 1);
        getListCandidates("PENDING", pagePending - 1);
        break;
      case "2":
        setPageApproved(pageApproved - 1);
        setPage(pageApproved - 1);
        getListCandidates("APPROVED", pageApproved - 1);
        break;
      case "3":
        setPageInterviews(pageInterviews - 1);
        setPage(pageInterviews - 1);
        getListCandidates("INTERVIEW", pageInterviews - 1);
        break;
      case "4":
        setPageOffered(pageOffered - 1);
        setPage(pageOffered - 1);
        getListCandidates("OFFERED", pageOffered - 1);
        break;
      case "5":
        setPageHired(pageHired - 1);
        setPage(pageHired - 1);
        getListCandidates("HIRED", pageHired - 1);
        break;
      case "6":
        setPageRejected(pageRejected - 1);
        setPage(pageRejected - 1);
        getListCandidates("REJECTED", pageRejected - 1);
        break;
      default:
        break;
    }
  };
  const handleNext = (type) => {
    let name = activeToogle;
    switch (name) {
      case "1":
        setPagePending(pagePending + 1);
        setPage(pagePending + 1);
        getListCandidates("PENDING", pagePending + 1);
        break;
      case "2":
        setPageApproved(pageApproved + 1);
        setPage(pageApproved + 1);
        getListCandidates("APPROVED", pageApproved + 1);
        break;
      case "3":
        setPageInterviews(pageInterviews + 1);
        setPage(pageInterviews + 1);
        getListCandidates("INTERVIEW", pageInterviews + 1);
        break;
      case "4":
        setPageOffered(pageOffered + 1);
        setPage(pageOffered + 1);
        getListCandidates("OFFERED", pageOffered + 1);
        break;
      case "5":
        setPageHired(pageHired + 1);
        setPage(pageHired + 1);
        getListCandidates("HIRED", pageHired + 1);
        break;
      case "6":
        setPageRejected(pageRejected + 1);
        setPage(pageRejected + 1);
        getListCandidates("REJECTED", pageRejected + 1);
        break;
      default:
        break;
    }
  };

  const handleLast = (type) => {
    let name = activeToogle;
    switch (name) {
      case "1":
        setPagePending(LastPagePending);
        setPage(LastPagePending);
        getListCandidates("PENDING", LastPagePending);
        break;
      case "2":
        setPageApproved(LastPageApproved);
        setPage(LastPageApproved);
        getListCandidates("APPROVED", LastPageApproved);
        break;
      case "3":
        setPageInterviews(LastPageInterviews);
        setPage(LastPageInterviews);
        getListCandidates("INTERVIEW", LastPageInterviews);
        break;
      case "4":
        setPageOffered(LastPageOffered);
        setPage(LastPageOffered);
        getListCandidates("INTERVIEW", LastPageOffered);
        break;
      case "5":
        setPageHired(LastPageHired);
        setPage(LastPageHired);
        getListCandidates("OFFERED", LastPageHired);
        break;
      case "6":
        setPageRejected(LastPageRejected);
        setPage(LastPageRejected);
        getListCandidates("REJECTED", LastPageRejected);
        break;
      default:
        break;
    }
  };

  const handleToggle = (id) => {
    setSelectedCandidate(null);
    setActiveToogle(id);
    switch (id) {
      case "1":
        if (!isEmpty(dataPending)) {
          dataPending.length > 0 && setSelectedCandidate(dataPending[0]);
          setData(dataPending);
        }
        setPage(pagePending);
        setTotalData(totalDataPending);
        setLastPage(LastPagePending);
        break;
      case "2":
        if (!isEmpty(dataApproved)) {
          dataApproved.length > 0 && setSelectedCandidate(dataApproved[0]);
          setData(dataApproved);
        }
        setPage(pageApproved);
        setTotalData(totalDataApproved);
        setLastPage(LastPageApproved);
        break;
      case "3":
        if (!isEmpty(dataInterviews)) {
          dataInterviews.length > 0 && setSelectedCandidate(dataInterviews[0]);
          setData(dataInterviews);
        }
        setPage(pageInterviews);
        setTotalData(totalDataInterviews);
        setLastPage(LastPageInterviews);
        break;
      case "4":
        if (!isEmpty(dataOffered)) {
          dataOffered.length > 0 && setSelectedCandidate(dataOffered[0]);
          setData(dataOffered);
        }
        setPage(pageOffered);
        setTotalData(totalDataOffered);
        setLastPage(LastPageOffered);
        break;
      case "5":
        if (!isEmpty(dataHired)) {
          dataHired.length > 0 && setSelectedCandidate(dataHired[0]);
          setData(dataHired);
        }
        setPage(pageHired);
        setTotalData(totalDataHired);
        setLastPage(LastPageHired);
        break;
      case "6":
        if (!isEmpty(dataRejected)) {
          dataRejected.length > 0 && setSelectedCandidate(dataRejected[0]);
          setData(dataRejected);
        }
        setPage(pageRejected);
        setTotalData(totalDataRejected);
        setLastPage(LastPageRejected);
        break;
      default:
        break;
    }
  };

  // function formatArray(arr) {
  //     var outStr = "";
  //     if (arr.length === 1) {
  //         outStr = arr[0];
  //     } else if (arr.length === 2) {
  //         outStr = arr.join(' and ');
  //     } else if (arr.length > 2) {
  //         outStr = arr.slice(0, -1).join(', ') + ', and ' + arr.slice(-1);
  //     }
  //     return outStr;
  // }

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const [statusCandidate, setStatusCandidate] = useState("");

  const confirmMoveCandidate = () => {
    setShowAlert(true);
    setAlerType(1);
    setAlertMessage(
      `${selectedCandidate.name} success moved to ${statusCandidate}?`
    );
  };

  const hideAlert = () => {
    setShowAlert(false);
    setStatusCandidate("");
    setSelectedCandidate(null);
    return;
  };

  const handleMultiChange = (option) => {
    setselectedSkills(option);
    setSearch(option.name);
  };

  return (
    <div className="wrap-vacancies">
      <SweetAlert
        show={showAlert}
        showCancel={alertType === 3}
        cancelBtnText={"Cancel"}
        cancelBtnBsStyle={"outline-secondary"}
        onCancel={hideAlert}
        confirmBtnText={alertType === 3 ? "Delete" : "OK"}
        confirmBtnBsStyle={
          alertType === 3 ? "danger" : alertType === 2 ? "warning" : "success"
        }
        title={
          alertType === 1
            ? "Succes!"
            : alertType === 2
            ? "Warning!"
            : "Are you sure?"
        }
        onConfirm={alertType === 2 ? confirmMoveCandidate : hideAlert}
        danger={alertType === 3}
        warning={alertType === 2}
        success={alertType === 1}
      >
        {alertMessage}
      </SweetAlert>
      <div className="wrap-inside-vacancies">
        <div className="heading-title">
          <label>Search Candidates by Skill</label>
          <div
            className="wrap-breadcrumb div_flex"
            style={{ paddingBottom: "10px", alignItems: "flex-start" }}
          >
            <ListBreadcrumbs
              menu={"list"}
              name={"List Job Vacancies"}
              subMenu={`List Candidates`}
              url={"/job-portal/job-vacancies"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-8"></div>
          <div className="col-4">
            <form autoComplete="off" onSubmit={handleSearch}>
              <div
                className="mb-3 input-search-candidate"
                style={{ display: "flex" }}
              >
                <Select
                  value={selectedSkills}
                  onChange={(option) => handleMultiChange(option)}
                  components={animatedComponents}
                  isMulti={false}
                  options={listSkills}
                  getOptionLabel={(option) => option["name"]}
                  getOptionValue={(option) => option["name"]}
                />
                <button type="submit">
                  <ImIcons.ImSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="blockTabs"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button
              className={
                activeToogle === "1"
                  ? "button-tabs__candidate"
                  : "button-tabs__candidate"
              }
              onClick={() => handleToggle("1")}
            >
              <label
                className={
                  activeToogle === "1" ? "active-slider-text" : "opacity_half"
                }
                style={{ paddingLeft: "0.5rem" }}
              >
                Pending
                <label className="total-slider__candidate">
                  {totalDataPending}
                </label>
              </label>
              <label className="border-slider opacity_half">|</label>
            </button>
            <button
              className={
                activeToogle === "2"
                  ? "button-tabs__candidate"
                  : "button-tabs__candidate"
              }
              onClick={() => handleToggle("2")}
            >
              <label
                className={
                  activeToogle === "2" ? "active-slider-text" : "opacity_half"
                }
                style={{ paddingLeft: "0.5rem" }}
              >
                Approved
                <label className="total-slider__candidate">
                  {totalDataApproved}
                </label>
              </label>
              <label className="border-slider opacity_half">|</label>
            </button>
            <button
              className={
                activeToogle === "3"
                  ? "button-tabs__candidate"
                  : "button-tabs__candidate"
              }
              onClick={() => handleToggle("3")}
            >
              <label
                className={
                  activeToogle === "3" ? "active-slider-text" : "opacity_half"
                }
                style={{ paddingLeft: "0.5rem" }}
              >
                Interviews
                <label className="total-slider__candidate">
                  {totalDataInterviews}
                </label>
              </label>
              <label className="border-slider opacity_half">|</label>
            </button>
            <button
              className={
                activeToogle === "4"
                  ? "button-tabs__candidate"
                  : "button-tabs__candidate"
              }
              onClick={() => handleToggle("4")}
            >
              <label
                className={
                  activeToogle === "4" ? "active-slider-text" : "opacity_half"
                }
                style={{ paddingLeft: "0.5rem" }}
              >
                Offered
                <label className="total-slider__candidate">
                  {totalDataOffered}
                </label>
              </label>
              <label className="border-slider opacity_half">|</label>
            </button>
            <button
              className={
                activeToogle === "5"
                  ? "button-tabs__candidate"
                  : "button-tabs__candidate"
              }
              onClick={() => handleToggle("5")}
            >
              <label
                className={
                  activeToogle === "5" ? "active-slider-text" : "opacity_half"
                }
                style={{ paddingLeft: "0.5rem" }}
              >
                Hired
                <label className="total-slider__candidate">
                  {totalDataHired}
                </label>
              </label>
              <label className="border-slider opacity_half">|</label>
            </button>
            <button
              className={
                activeToogle === "6"
                  ? "button-tabs__candidate"
                  : "button-tabs__candidate"
              }
              onClick={() => handleToggle("6")}
            >
              <label
                className={
                  activeToogle === "6" ? "active-slider-text" : "opacity_half"
                }
                style={{ paddingLeft: "0.5rem" }}
              >
                Rejected
                <label className="total-slider__candidate">
                  {totalDataRejected}
                </label>
              </label>
              <label className="border-slider opacity_half">|</label>
            </button>
          </div>
        </div>
        {/* list candidates */}
        {/* list candidates */}
        <div style={{ marginTop: "1rem", fontFamily: "Inter" }}>
          {!isEmpty(data) ? (
            <div className="row">
              <div className="col-4">
                <label style={{ textAlign: "left", fontSize: "12px" }}>
                  Sort by : Newest to Oldest
                </label>
                <div className="scrollable-table">
                  {!isEmpty(data) &&
                    data.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectCandidate(item)}
                        className={
                          !isEmpty(selectedCandidate) &&
                          selectedCandidate.id === item.id
                            ? "wrap-card-candidate__active"
                            : "wrap-card-candidate"
                        }
                      >
                        <div className="wrap-candidate-ava">
                          <img src={ava} alt="ava" />
                        </div>
                        <div>
                          <label className="candidate-name">{item.name}</label>
                        </div>
                      </div>
                    ))}
                </div>
                {!isEmpty(data) ? (
                  <div style={{ marginTop: "1rem" }}>
                    <div
                      className="group-button"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn"
                        onClick={handleFirst}
                        style={{ fontWeight: "600" }}
                        disabled={page === 1}
                      >
                        First
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={handlePrev}
                        style={{ fontWeight: "600" }}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleNext}
                        style={{ fontWeight: "600" }}
                        disabled={page === lastPage}
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleLast}
                        style={{ fontWeight: "600" }}
                        disabled={page === lastPage}
                      >
                        Last
                      </button>
                    </div>
                    <label
                      style={{
                        marginTop: "1rem",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                      className="pagination-info"
                    >
                      <label>{page * limit - limit + 1}</label> to{" "}
                      <label>
                        {totalData > limit * page ? limit * page : totalData}
                      </label>{" "}
                      of Total <label>{totalData}</label>
                    </label>
                  </div>
                ) : null}
              </div>

              <div className="col-8">
                {!isEmpty(selectedCandidate) ? (
                  <div className="wrap-details-candidate-selected">
                    <label className="title-candidate-name">
                      {selectedCandidate.name}
                    </label>
                    <div style={{ fontSize: "12px" }}>
                      {activeToogle !== "1" && (
                        <label style={{ marginLeft: "1rem" }}>
                          Moved by : <b>{selectedCandidate.meta.updated_by}</b>
                        </label>
                      )}
                    </div>
                    <div className="wrap-select-candidate-status"></div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="blockTabs" style={{ display: "flex" }}>
                        <button
                          className={
                            candidateInfo === "1"
                              ? "button-tabs__home button-tabs__home-active"
                              : "button-tabs__home"
                          }
                          onClick={() => handleCandidateInfo("1")}
                        >
                          Profile<label className="border-slider">|</label>
                        </button>
                        <button
                          className={
                            candidateInfo === "2"
                              ? "button-tabs__home button-tabs__home-active"
                              : "button-tabs__home"
                          }
                          onClick={() => handleCandidateInfo("2")}
                        >
                          Resume
                        </button>
                      </div>
                    </div>
                    <div className="wrap-details-candidates">
                      <div className="wrap-inside-details-candidate">
                        {candidateInfo === "1" ? (
                          <div>
                            <div className="grouping-form">
                              <div
                                style={{ width: "50%", paddingRight: "0.5rem" }}
                                className="mb-3 desc-candidate"
                              >
                                <label className="form-label">Email</label>
                                <p>{selectedCandidate.email}</p>
                              </div>
                              <div
                                style={{ width: "50%", paddingLeft: "0.5rem" }}
                                className="mb-3 desc-candidate"
                              >
                                <label className="form-label">
                                  Telephone Number
                                </label>
                                <p>{selectedCandidate.phone}</p>
                              </div>
                            </div>
                            <div
                              className="grouping-form"
                              style={{
                                display:
                                  activeToogle === "5" ? "block" : "none",
                              }}
                            >
                              <div
                                style={{ width: "50%", paddingRight: "0.5rem" }}
                                className="mb-3 desc-candidate"
                              >
                                <label className="form-label">Hired as</label>
                                <p>{selectedCandidate.vacancy_title}</p>
                              </div>
                            </div>
                            <div className="grouping-form">
                              <div
                                style={{ width: "50%", paddingRight: "0.5rem" }}
                                className="mb-3 desc-candidate"
                              >
                                <label className="form-label">
                                  Applied Date
                                </label>
                                <p>
                                  {moment(
                                    selectedCandidate.meta.created_at
                                  ).format("DD MMMM YYYY, hh:mm:ss A")}
                                </p>
                              </div>
                              <div
                                style={{ width: "50%", paddingLeft: "0.5rem" }}
                                className="mb-3 desc-candidate"
                              >
                                <label className="form-label">
                                  Job Vacancy
                                </label>
                                <p>{selectedCandidate.vacancy_title}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <embed
                              src={selectedCandidate.cv_url}
                              width="100%"
                              height="320px"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div style={{ height: "100vh", color: "red" }}>
              <label>No candidate found!</label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
