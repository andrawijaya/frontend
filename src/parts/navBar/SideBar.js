import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import Cookie from "js-cookie";
import * as MdIcons from "react-icons/md";

import ava from "../../assets/svg/ava-candidate.svg";
import Logo from "../../assets/logo-space.png";
import UserManagementAPIs from "../../services/UserManagementAPIs";

import "./SideBar.css";

export default function SideBar(props) {
  const [openUserManagement, setOpenUserManagement] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isAdminCMS, setIsAdminCMS] = useState(false);
  const [isAdminJobPortal, setIsAdminJobPortal] = useState(false);
  const [isAdminHR, setIsAdminHR] = useState(false);
  const [isAdminBizdev, setIsAdminBizdev] = useState(false);

  useEffect(() => {
    UserManagementAPIs.getDetailsProfile().then((res) => {
      setUserData(res.data.data);
    });
    let superUser = Cookie.get("qPsGdPU4nG");
    let cms = Cookie.get("jWb2nOnqE9");
    let jobPortal = Cookie.get("pM9biA2Nwa5");
    let hr = Cookie.get("nQ9Jnap7Wkn");
    let bizdev = Cookie.get("kU4boiBa2ho");

    if (!isEmpty(superUser)) {
      setIsSuperUser(true);
    }
    if (!isEmpty(cms)) {
      setIsAdminCMS(true);
    }
    if (!isEmpty(jobPortal)) {
      setIsAdminJobPortal(true);
    }
    if (!isEmpty(hr)) {
      setIsAdminHR(true);
    }
    if (!isEmpty(bizdev)) {
      setIsAdminBizdev(true);
    }
  }, []);

  const handleUserManagement = () => {
    setOpenUserManagement(!openUserManagement);
  };

  const hideListMenu = () => {
    setOpenUserManagement(false);
  };

  const handleCloseUserManagement = () => {
    setOpenUserManagement(false);
  };

  const handleSignOut = () => {
    Cookie.remove("xdFwDX");
    Cookie.remove("email");
    Cookie.remove("cKnLtPqq");
    Cookie.remove("pQesRTM0");
    Cookie.remove("qPsGdPU4nG");
    Cookie.remove("nQjoQ8niN");
    Cookie.remove("jIqd9UoqOW");
    Cookie.remove("hI2qdG9qHK");
    Cookie.remove("jWb2nOnqE9");
    Cookie.remove("pM9biA2Nwa5");
    Cookie.remove("nQ9Jnap7Wkn");
    Cookie.remove("kU4boiBa2ho");
    window.location = "/";
  };

  return (
    <div className="wrap-sidebar">
      {/* Navbar */}
      <div className="navbar fixed-top">
        <Link to={{ pathname: "/" }}>
          <div className="company-logo">
            <img src={Logo} alt="logo" />
          </div>
        </Link>
        <div>
          <div onClick={handleUserManagement} className="account-shortcut">
            <div className="wrap-ava">
              <img
                style={{
                  height: "40px",
                  width: "40px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={
                  isEmpty(userData)
                    ? ava
                    : isEmpty(userData.image_url)
                    ? ava
                    : userData.image_url
                }
                alt="img"
              />
            </div>
            <div className="wrap-role">
              <label>{!isEmpty(userData) && userData.nick_name}</label>
            </div>
            <div className="wrap-load-shortcut">
              <MdIcons.MdKeyboardArrowUp />
            </div>
          </div>
          <div
            className="wrap-user-management"
            style={{ display: !openUserManagement ? "none" : "block" }}
          >
            <div className="user-management">
              <Link
                style={{
                  display:
                    isSuperUser ||
                    isAdminCMS ||
                    isAdminJobPortal ||
                    isAdminHR ||
                    isAdminBizdev
                      ? "block"
                      : "none",
                }}
                to={{ pathname: "/user-management" }}
                onClick={handleCloseUserManagement}
              >
                Users Management
              </Link>
              <Link
                style={{ display: isSuperUser ? "block" : "none" }}
                to={{ pathname: "/email-notification" }}
                onClick={handleCloseUserManagement}
              >
                Main User Activity Notifications
              </Link>
              <Link
                to={{ pathname: "/employee/profile" }}
                onClick={handleCloseUserManagement}
              >
                Edit Profile
              </Link>
              <Link
                to={{ pathname: "/change-password" }}
                onClick={handleCloseUserManagement}
              >
                Change Password
              </Link>
              <Link to="#" onClick={() => handleSignOut()}>
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={hideListMenu}
        onMouseEnter={hideListMenu}
        style={{ display: !openUserManagement ? "none" : "block" }}
        className="backdrop"
      ></div>
    </div>
  );
}
