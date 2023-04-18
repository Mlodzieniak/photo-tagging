/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PropTypes from "prop-types";

function CharacterImage({ url }) {
  return (
    <div className="characterContainer">
      <img src={url} key={url} alt="Character" className="characterImage" />
    </div>
  );
}
CharacterImage.propTypes = {
  url: PropTypes.string.isRequired,
};

export default CharacterImage;
