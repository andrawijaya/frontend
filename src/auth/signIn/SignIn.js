import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import AuthenticationAPIs from "../../services/AuthenticationAPIs";
import SweetAlert from "react-bootstrap-sweetalert";

import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };

    setIsLoading(true);
    AuthenticationAPIs.loginAPIs(data)
      .then((res) => {
        if (res.data.code === 200) {
          var expired = new Date(new Date().getTime() + 60 * 60 * 1000);
          Cookie.set("xdFwDX", res.data.data.token, { expires: expired });
          Cookie.set("email", email, { expires: expired });
          const Header = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-TOKEN": res.data.data.token,
            },
          };
          AuthenticationAPIs.getListAccess(Header).then((res) => {
            let data = res.data.data;
            data.forEach((element) => {
              if (element === "content_creator") {
                Cookie.set("cKnLtPqq", true, { expires: expired });
              }
              if (element === "recruiters") {
                Cookie.set("pQesRTM0", true, { expires: expired });
              }
              if (element === "SUPERUSER") {
                Cookie.set("qPsGdPU4nG", true, { expires: expired });
              }
              if (element === "employee") {
                Cookie.set("nQjoQ8niN", true, { expires: expired });
              }
              if (element === "human_resource") {
                Cookie.set("jIqd9UoqOW", true, { expires: expired });
              }
              if (element === "business_development_manager") {
                Cookie.set("hI2qdG9qHK", true, { expires: expired });
              }
              if (element === "admin_cms") {
                Cookie.set("jWb2nOnqE9", true, { expires: expired });
              }
              if (element === "admin_job_portal") {
                Cookie.set("pM9biA2Nwa5", true, { expires: expired });
              }
              if (element === "admin_human_resource") {
                Cookie.set("nQ9Jnap7Wkn", true, { expires: expired });
              }
              if (element === "admin_bizdev") {
                Cookie.set("kU4boiBa2ho", true, { expires: expired });
              }
            });
            window.location = "/";
          });
        } else if (res.data.code === 404) {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage("You have entered an invalid username or password!");
        } else {
          setShowAlert(true);
          setAlerType(2);
          setAlertMessage(res.data.message);
        }
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setShowAlert(true);
        setAlerType(2);
        setAlertMessage("Login Failed, Please Try Again!");
      });
    setIsLoading(false);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlerType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="wrap-auth-page">
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
      <div className="wrap-inside-auth-page">
        <div
          className="wrap-image-header-auth"
          style={{
            backgroundImage:
              "url(https://s3.ap-southeast-1.amazonaws.com/repo.sigma-tech.co.id/space_assets/login-header.png)",
          }}
        >
          <div style={{ height: "280px" }}>
            {/* this only for christmas season, just delete or hide this div after end season */}
            <div className="background_animation-header"></div>
            {/* ------ */}
          </div>
        </div>
        <div className="wrap-content-sign-in">
          <form onSubmit={handleSubmit}>
            <div className="content-sign-in">
              <div className="row">
                <div className="col-6">
                  <div
                    className="wrap-img-signin"
                    style={{
                      backgroundImage:
                        "url(https://s3.ap-southeast-1.amazonaws.com/repo.sigma-tech.co.id/space_assets/login-image.png)",
                    }}
                  ></div>
                </div>
                <div className="col-6">
                  <div className="wrap-form-sign-in">
                    <label>Sign In</label>
                    <div className="mb_half-rem">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={email.toLowerCase()}
                        onChange={handleChange}
                        className="input-form form-control input-sign-in"
                      />
                    </div>
                    <div className="mb_half-rem">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        minLength={6}
                        onChange={handleChange}
                        className="input-form form-control input-sign-in"
                      />
                      <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <Link to="/forgot-password">
                          <label className="forgot-pswd">
                            Forgot Password?
                          </label>
                        </Link>
                      </div>
                    </div>
                    <div className="mb-3" style={{ textAlign: "center" }}>
                      {isLoading !== true ? (
                        <button
                          type="submit"
                          className="primary-btn"
                          style={{ borderRadius: "10px", padding: "10px" }}
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled
                          className="primary-btn"
                          style={{ borderRadius: "10px", padding: "10px" }}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                    <div style={{ marginTop: "2rem", textAlign: "center" }}>
                      <a
                        href={
                          window.location.host === "dev-space.sigma-tech.co.id"
                            ? process.env.REACT_APP_URL_WEB_SIGMA_DEV
                            : window.location.host ===
                              "stg-space.sigma-tech.co.id"
                            ? process.env.REACT_APP_URL_WEB_SIGMA_STG
                            : window.location.host === "space.sigma-tech.co.id"
                            ? process.env.REACT_APP_URL_WEB_SIGMA_PROD
                            : process.env.REACT_APP_URL_WEB_SIGMA_AWS
                        }
                        className="form-shortcut-sigma"
                      >
                        Click here to Explore Sigmatech Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
