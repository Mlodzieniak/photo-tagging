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
      <div className="popup" style={{ top: position.y, left: position.x }}>
        <button type="button">Button 1</button>
        <button type="button">Button 2</button>
        <button type="button">Button 3</button>
        <button type="button" className="close-button" onClick={handleClose}>
          X
        </button>
      </div>
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
