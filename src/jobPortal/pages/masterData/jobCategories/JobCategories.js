import React, { useState, useEffect } from "react";
import "./JobCategories.css";
import { isEmpty, toInteger } from "lodash";
import * as ImIcons from "react-icons/im";
import ListBreadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import masterDataAPIs from "../../../services/masterDataAPIs";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

export default function JobCategories() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [countById, setCountById] = useState(0);
  const [isFetch, setisFetch] = useState(false);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    getListJobCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetch]);

  const getListJobCategories = () => {
    masterDataAPIs
      .getListCategories()
      .then((res) => {
        if (res.data.code === 200) {
          setData(paginator(res.data.data, page, limit));
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const paginator = (items, current_page, per_page_items) => {
    let page = current_page || 1,
      per_page = per_page_items || 8,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);
    let newData = {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems,
      allData: items,
    };
    return newData;
  };

  const handleFirst = () => {
    let newData = data.allData;
    setData(paginator(newData, 1, limit));
    setPage(1);
  };

  const handlePrev = () => {
    let newData = data.allData;
    setData(paginator(newData, page - 1, limit));
    setPage(page - 1);
  };
  const handleNext = () => {
    let newData = data.allData;
    setData(paginator(newData, page + 1, limit));
    setPage(page + 1);
  };
  const handleLast = () => {
    let newData = data.allData;
    setData(paginator(newData, data.total_pages, limit));
    setPage(data.total_pages);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let keyword = search;
    let listData = data;
    findString(keyword, listData);
  };

  const findString = (key, data) => {
    let newArray = [];
    let keyword = key.toLowerCase();
    data.allData.forEach((element) => {
      if (element.category.toString().toLowerCase().includes(keyword)) {
        newArray.push(element);
      }
    });
    if (newArray.length > 0) {
      setData(paginator(newArray, page, limit));
      setSearch("");
    } else {
      setSearch("");
      setisFetch(!isFetch);
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage(`Data ${key} not Found!`);
    }
  };

  const handleChange = (e) => {
    let target = e.target.value;
    setSearch(target);
  };

  const handleDeleteData = (name, count) => {
    count === null ? setCountById(0) : setCountById(count);
    setIdDelete(name);
    setShowAlert(true);
    setAlerType(3);
    setAlertMessage(`Do you really want to delete ${name}?`);
  };

  const confirmDeleteData = () => {
    if (toInteger(countById) > 0) {
      setShowAlert(true);
      setAlerType(2);
      setAlertMessage("Maaf Data tidak bisa di hapus!");
    } else {
      masterDataAPIs
        .deleteJobCategories(idDelete)
        .then((res) => {
          if (res.data.code === 200) {
            setisFetch(!isFetch);
            setShowAlert(true);
            setAlerType(1);
            setAlertMessage("Data has been Deleted!");
          } else {
            setShowAlert(true);
            setAlerType(2);
            setAlertMessage(res.data.message);
          }
        })
        .catch((err) => {
          setisFetch(!isFetch);
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(err.response.data.message);
        });
    }
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setShowAlert(false);
    setCountById(0);
    setIdDelete("");
    return;
  };

  return (
    <div className="wrap-master-data">
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
      <div className="wrap-inside-master-data">
        <div className="heading-title">
          <label>Job Categories</label>
          <ListBreadcrumbs
            menu={"list"}
            name={"Master Data"}
            subMenu={"Job Categories"}
            url={"/job-portal/job-categories"}
          />
        </div>
        <div className="wrap-search-add">
          <div style={{ paddingRight: "10px" }}>
            <form autoComplete="off" onSubmit={handleSearch}>
              <div className="navbar-search">
                <button type="submit">
                  <ImIcons.ImSearch />
                </button>
                <input
                  title="search"
                  style={{ color: "black" }}
                  onChange={handleChange}
                  placeholder="Search for job category"
                  name="search"
                  value={search}
                />
              </div>
            </form>
          </div>
          <div>
            <Link to={{ pathname: "/job-portal/job-categories/add/1" }}>
              <button className="primary-btn">Add </button>
            </Link>
          </div>
        </div>
        <div className="wrap-content-table__master-data">
          <div className="wrap-table-user">
            <div className="title-table row">
              <div className="col-9">Job Category</div>
              <div className="col-3" style={{ textAlign: "center" }}>
                Action
              </div>
            </div>
            <div className="wrap-content-table">
              {!isEmpty(data) &&
                data.data.map((v, i) => (
                  <div key={i} className="content-table row">
                    <div className="col-9">{v.category}</div>
                    <div
                      className="col-3"
                      style={{
                        justifyContent: "space-evenly",
                        display: "flex",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: `/job-portal/job-categories/edit/${v.category}`,
                        }}
                        className="a-href-label"
                      >
                        Edit
                      </Link>
                      <Link
                        to={{
                          pathname: `/job-portal/job-categories/detail/${v.category}`,
                        }}
                        className="a-href-label"
                      >
                        Detail
                      </Link>
                      <label
                        onClick={() => handleDeleteData(v.category, v.count)}
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
                          {data.total > limit * page
                            ? limit * page
                            : data.total}
                        </label>{" "}
                        of Total <label>{data.total}</label>
                      </label>
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
                        disabled={page === data.total_pages}
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleLast}
                        style={{ fontWeight: "600" }}
                        disabled={page === data.total_pages}
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
