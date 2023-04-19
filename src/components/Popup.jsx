/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import propTypes from "prop-types";
import "./styles/Popup.css";

// window with 3 buttons that pops up in position that is received from props
function Popup({ newPosition = { x: 0, y: 0 } }) {
  const [position, setPosition] = useState(newPosition);

  // const handleClick = (e) => {
  //   setPosition({ x: e.ClientX, y: e.ClientY });
  // };

  const handleClose = () => {
    setPosition({ x: 0, y: 0 });
  };
  //   useEffect(() => {
  //     handleClick();
  //   }, []);

  return (
    <div className="popup-container">
      {position.x !== 0 && position.y !== 0 && (
        <div className="popup" style={{ top: position.y, left: position.x }}>
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
          <button type="button">Button 3</button>
          <button type="button" className="close-button" onClick={handleClose}>
            X
          </button>
        </div>
      )}
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
