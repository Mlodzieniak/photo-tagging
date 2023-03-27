import React from "react";
import waldo from "../images/waldo.jpg";

function MainImage() {
  return (
    <div className="main-img-wrapper">
      <div>XD</div>
      <img src={waldo} alt="All characters." className="main" />
    </div>
  );
}

export default MainImage;
