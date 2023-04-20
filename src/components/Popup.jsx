/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef } from "react";
import propTypes from "prop-types";
import "./styles/Popup.css";

// window with 3 buttons that pops up in position that is received from props
function Popup({ newPosition }) {
  // const [position, setPosition] = useState(newPosition);
  const wrapper = useRef(null);
  // console.log(wrapper.current);
  // wrapper.current.style.transform = "translate(300px, 450px)";
  wrapper.current.style.transform = `translate(${-newPosition.x}px, ${-newPosition.y}px)`;

  // const handleClose = () => {
  //   setPosition({ x: 0, y: 0 });
  // };

  return (
    <div className="popup-container" ref={wrapper}>
      {/* {position.x !== 0 || position.y !== 0 || (
        <div className="popup" style={{ top: position.y, left: position.x }}>
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
          <button type="button">Button 3</button>
          <button type="button" className="close-button" onClick={handleClose}>
            X
          </button>
        </div>
      )} */}
      <div className="popup" style={{ top: 300, left: 20 }}>
        {/* <div className="popup"> */}
        <button type="button">Button 1</button>
        <button type="button">Button 2</button>
        <button type="button">Button 3</button>
        <button type="button" className="close-button">
          X
        </button>
      </div>
    </div>
  );
}
Popup.propTypes = {
  newPosition: propTypes.shape({
    x: propTypes.number,
    y: propTypes.number,
  }).isRequired,
};

export default Popup;
