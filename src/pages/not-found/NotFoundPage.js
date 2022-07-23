import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../../assets/img/404.jpg";
import "./NotFoundPage.css";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>lost your way?</h2>
      <h4>
        sorry we can't find that page, You'll find loads to explore on the home
        page.
      </h4>
      <h3>
        <Link to="/">Home</Link>
      </h3>
      <img src={notFoundImg} alt="404"></img>
    </div>
  );
};

export default NotFound;
