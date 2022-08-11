import React from "react";
import "./NotFoundPage.css";
import NotFound from "../../assets/not-found.jpg";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="wrap-loading-page">
      <div className="content-loading-page">
        <div className="wrap-image-notfound">
          <img className="img-notfound" src={NotFound} alt="logo" />
          <p>Sorry we can't find the page you're looking for...</p>
          <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
            <button>Go Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
