import React, { useState, useEffect } from "react";
import "./SidebarCMS.css";
import * as MdIcons from "react-icons/md";
import { SidebarItem } from "./SideBarItem";
import { isEmpty } from "lodash";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function SidebarCMS() {
  const [activeMenu, setActiveMenu] = useState("");
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    let url = location.pathname.split("/");
    !isEmpty(url[2]) ? setActiveMenu(url[2]) : setActiveMenu(url[1]);
  }, [location.pathname]);

  const handleSelectMenu = (title, child) => {
    isEmpty(child) ? setTitle("") : setTitle(title);
  };

  return (
    <div>
      <div className="wrap-sidebar">
        {/* Sidebar */}
        <div className="nav-menu">
          <div className="wrap-sidebar-menu">
            {!isEmpty(SidebarItem) &&
              SidebarItem.map((v, i) => (
                <div key={i}>
                  {isEmpty(v.child) ? (
                    <Link
                      to={{ pathname: v.path }}
                      style={{ textDecoration: "none" }}
                      onClick={() => handleSelectMenu(v.title, v.child)}
                    >
                      <div
                        className={
                          v.route === activeMenu && isEmpty(v.child)
                            ? "wrap-list-menu active"
                            : "wrap-list-menu"
                        }
                      >
                        <div className="list-menu">
                          <div>{v.icon}</div>
                          <div
                            style={{
                              color:
                                activeMenu === v.path ? "#7CC0C9" : "black",
                            }}
                          >
                            {v.title}
                          </div>
                          <div
                            style={{
                              display: !isEmpty(v.child) ? "block" : "none",
                              color:
                                activeMenu === v.route ? "#7CC0C9" : "black",
                            }}
                          >
                            {activeMenu === v.title ? (
                              <MdIcons.MdKeyboardArrowUp />
                            ) : (
                              <MdIcons.MdKeyboardArrowDown />
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      onClick={() => handleSelectMenu(v.title, v.child)}
                      className={
                        v.route === activeMenu && isEmpty(v.child)
                          ? "wrap-list-menu active"
                          : "wrap-list-menu"
                      }
                    >
                      <div className="list-menu">
                        <div>{v.icon}</div>
                        <div
                          style={{
                            color: activeMenu === v.path ? "#7CC0C9" : "black",
                          }}
                        >
                          {v.title}
                        </div>
                        <div
                          style={{
                            display: !isEmpty(v.child) ? "block" : "none",
                            color: activeMenu === v.route ? "#7CC0C9" : "black",
                          }}
                        >
                          {activeMenu === v.title ? (
                            <MdIcons.MdKeyboardArrowUp />
                          ) : (
                            <MdIcons.MdKeyboardArrowDown />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    style={{ display: title === v.title ? "block" : "none" }}
                    className="wrap-sub-list-menu"
                  >
                    {!isEmpty(v.child) &&
                      v.child.map((item, index) => (
                        <Link
                          key={index}
                          to={{ pathname: item.path }}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div
                            className={
                              activeMenu === item.route
                                ? "sub-list-menu active"
                                : "sub-list-menu"
                            }
                            key={index}
                          >
                            <div>{item.title}</div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="wrap-version">
            <label>{process.env.REACT_APP_VERSION}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
