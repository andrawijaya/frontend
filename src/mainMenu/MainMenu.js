import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

import { ReactComponent as JobIconsBlack } from "../assets/svg/icon-portal.svg";
import { ReactComponent as JobIconsWhite } from "../assets/svg/portal-white.svg";
import { ReactComponent as CmsIconsBlack } from "../assets/svg/cms-black.svg";
import { ReactComponent as CmsIconsWhite } from "../assets/svg/icon-cms.svg";
import { ReactComponent as EmployeeIconsBlack } from "../assets/svg/employee-black.svg";
import { ReactComponent as EmployeeIconsWhite } from "../assets/svg/employee-white.svg";
import { ReactComponent as HrIconsBlack } from "../assets/svg/hr-black.svg";
import { ReactComponent as HrIconsWhite } from "../assets/svg/hr-white.svg";
import { ReactComponent as BizdevBlack } from "../assets/svg/bizdev-black.svg";
import { ReactComponent as BizdevWhite } from "../assets/svg/bizdev-white.svg";

import "./MainMenu.css";

export default function MainMenu() {
  const [isCMS, setIsCMS] = useState(false);
  const [isJobPortal, setIsJobPortal] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isHumanResource, setIsHumanResource] = useState(false);
  const [isBizdev, setIsBizdev] = useState(false);
  const [hoverCMS, setHoverCMS] = useState(false);
  const [hoverJob, setHoverJob] = useState(false);
  const [hoverEmployee, setHoverEmployee] = useState(false);
  const [hoverHr, setHoverHr] = useState(false);
  const [hoverBizdev, setHoverBizdev] = useState(false);

  useEffect(() => {
    let superUser = Cookie.get("qPsGdPU4nG");
    let cms = Cookie.get("cKnLtPqq");
    let jobPortal = Cookie.get("pQesRTM0");
    let employee = Cookie.get("nQjoQ8niN");
    let hr = Cookie.get("jIqd9UoqOW");
    let bizdev = Cookie.get("hI2qdG9qHK");
    let admin_cms = Cookie.get("jWb2nOnqE9");
    let admin_job = Cookie.get("pM9biA2Nwa5");
    let admin_hr = Cookie.get("nQ9Jnap7Wkn");
    let admin_bizdev = Cookie.get("kU4boiBa2ho");

    if (!isEmpty(superUser)) {
      setIsJobPortal(true);
      setIsCMS(true);
      setIsEmployee(true);
      setIsHumanResource(true);
      setIsBizdev(true);
    }
    if (!isEmpty(cms) || !isEmpty(admin_cms)) {
      setIsCMS(true);
    }
    if (!isEmpty(jobPortal) || !isEmpty(admin_job)) {
      setIsJobPortal(true);
    }
    if (!isEmpty(employee)) {
      setIsEmployee(true);
    }
    if (!isEmpty(hr) || !isEmpty(admin_hr)) {
      setIsHumanResource(true);
    }
    if (!isEmpty(bizdev) || !isEmpty(admin_bizdev)) {
      setIsBizdev(true);
    }
  }, []);

  const hoverButton = (type) => {
    type === "cms"
      ? setHoverCMS(true)
      : type === "portal"
      ? setHoverJob(true)
      : type === "employee"
      ? setHoverEmployee(true)
      : type === "hr"
      ? setHoverHr(true)
      : type === "bizdev" && setHoverBizdev(true);
  };
  const unHoverButton = (type) => {
    type === "cms"
      ? setHoverCMS(false)
      : type === "portal"
      ? setHoverJob(false)
      : type === "employee"
      ? setHoverEmployee(false)
      : type === "hr"
      ? setHoverHr(false)
      : type === "bizdev" && setHoverBizdev(false);
  };

  return (
    <div
      className="wrap-main-menu"
      style={{
        backgroundImage:
          "url(https://s3.ap-southeast-1.amazonaws.com/repo.sigma-tech.co.id/space_assets/main-menu.png)",
      }}
    >
      {/* this section is only for christmas season to make snowfall */}
      <div
        className="background-animation"
        style={{ position: "relative", height: "auto" }}
      >
        {/* end section for christmas season */}
        <div
          className="wrap-inside-menu"
          style={{ height: `calc(100vh - 60px)` }}
        >
          <div>
            <div className="wrap-logo-company__space">
              <img
                src={
                  "https://s3.ap-southeast-1.amazonaws.com/repo.sigma-tech.co.id/space_assets/logo-main-menu.png"
                }
                alt="logo"
                className="logo-company__space"
                style={{ height: window.innerWidth > 768 ? 150 : 130 }}
              />
            </div>
            <div
              className="wrap-list-main-menu"
              style={{ flexWrap: "wrap", justifyContent: "center" }}
            >
              <div style={{ display: isCMS ? "block" : "none" }}>
                <Link to={{ pathname: "/website-cms" }}>
                  <button
                    onMouseOver={() => hoverButton("cms")}
                    onMouseOut={() => unHoverButton("cms")}
                    className="btn-list-menu"
                  >
                    <div style={{ display: !hoverCMS ? "block" : "none" }}>
                      <CmsIconsBlack width="60px" height="50px" />
                    </div>
                    <div style={{ display: hoverCMS ? "block" : "none" }}>
                      <CmsIconsWhite width="60px" height="50px" />
                    </div>
                    <p>Website CMS</p>
                  </button>
                </Link>
              </div>
              <div style={{ display: isJobPortal ? "block" : "none" }}>
                <Link to={{ pathname: "/job-portal" }}>
                  <button
                    onMouseOver={() => hoverButton("portal")}
                    onMouseOut={() => unHoverButton("portal")}
                    className="btn-list-menu"
                  >
                    <div style={{ display: !hoverJob ? "block" : "none" }}>
                      <JobIconsBlack width="60px" height="50px" />
                    </div>
                    <div style={{ display: hoverJob ? "block" : "none" }}>
                      <JobIconsWhite width="60px" height="50px" />
                    </div>
                    <p>Job Portal</p>
                  </button>
                </Link>
              </div>
              <div style={{ display: isEmployee ? "block" : "none" }}>
                <Link to={{ pathname: "/employee" }}>
                  <button
                    onMouseOver={() => hoverButton("employee")}
                    onMouseOut={() => unHoverButton("employee")}
                    className="btn-list-menu"
                  >
                    <div style={{ display: !hoverEmployee ? "block" : "none" }}>
                      <EmployeeIconsBlack width="60px" height="50px" />
                    </div>
                    <div style={{ display: hoverEmployee ? "block" : "none" }}>
                      <EmployeeIconsWhite width="60px" height="50px" />
                    </div>
                    <p>Employee</p>
                  </button>
                </Link>
              </div>
              <div style={{ display: isHumanResource ? "block" : "none" }}>
                <Link to={{ pathname: "/human-resource/employee" }}>
                  <button
                    onMouseOver={() => hoverButton("hr")}
                    onMouseOut={() => unHoverButton("hr")}
                    className="btn-list-menu"
                  >
                    <div style={{ display: !hoverHr ? "block" : "none" }}>
                      <HrIconsBlack width="60px" height="50px" />
                    </div>
                    <div style={{ display: hoverHr ? "block" : "none" }}>
                      <HrIconsWhite width="60px" height="50px" />
                    </div>
                    <p>Human Resource</p>
                  </button>
                </Link>
              </div>
              <div style={{ display: isBizdev ? "block" : "none" }}>
                <Link to={{ pathname: "/old-bizdev" }}>
                  <button
                    onMouseOver={() => hoverButton("bizdev")}
                    onMouseOut={() => unHoverButton("bizdev")}
                    className="btn-list-menu"
                  >
                    <div style={{ display: !hoverBizdev ? "block" : "none" }}>
                      <BizdevBlack width="60px" height="50px" />
                    </div>
                    <div style={{ display: hoverBizdev ? "block" : "none" }}>
                      <BizdevWhite width="60px" height="50px" />
                    </div>
                    <p>BizDev</p>
                  </button>
                </Link>
              </div>
              <div style={{ display: isBizdev ? "block" : "none" }}>
                <Link to={{ pathname: "/bizdev" }}>
                  <button
                    onMouseOver={() => hoverButton("bizdev")}
                    onMouseOut={() => unHoverButton("bizdev")}
                    className="btn-list-menu"
                  >
                    <div style={{ display: !hoverBizdev ? "block" : "none" }}>
                      <BizdevBlack width="60px" height="50px" />
                    </div>
                    <div style={{ display: hoverBizdev ? "block" : "none" }}>
                      <BizdevWhite width="60px" height="50px" />
                    </div>
                    <p>BizDev Phase 3</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
