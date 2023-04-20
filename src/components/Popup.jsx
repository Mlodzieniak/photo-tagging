/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState, useEffect } from "react";
import propTypes from "prop-types";
import "./styles/Popup.css";

// window with 3 buttons that pops up in position that is received from props
function Popup({ imgPosition, offset }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // wait for the component to mount
  const wrapper = useRef(null);

  useEffect(() => {
    wrapper.current.style.transform = `translate(${-imgPosition.x}px, ${-imgPosition.y}px)`;
  });

  useEffect(() => {
    setPosition({ x: offset.x, y: offset.y });
  }, [offset]);

  const handleClose = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="popup-container" ref={wrapper}>
      {position.x !== 0 && position.y !== 0 ? (
        <div className="popup" style={{ top: position.y, left: position.x }}>
          <button type="button">Tom</button>
          <button type="button">Sonic</button>
          <button type="button">Max</button>
          <button type="button" id="close-button" onClick={handleClose}>
            X
          </button>
        </div>
      ) : null}
    </div>
  );
}
Popup.propTypes = {
  imgPosition: propTypes.shape({
    x: propTypes.number,
    y: propTypes.number,
  }).isRequired,
  offset: propTypes.shape({
    x: propTypes.number,
    y: propTypes.number,
  }).isRequired,
};

export default Popup;
