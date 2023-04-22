/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PropTypes from "prop-types";

function CharacterImage({ url, isFound }) {
  const foundStyle = {
    borderColor: "chartreuse",
    borderStyle: "solid",
    borderWidth: "5px",
  };
  return (
    <div className="characterContainer" style={isFound ? foundStyle : null}>
      <img src={url} key={url} alt="Character" className="characterImage" />
    </div>
  );
}
CharacterImage.propTypes = {
  url: PropTypes.string.isRequired,
  isFound: PropTypes.bool.isRequired,
};

export default CharacterImage;
