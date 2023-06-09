/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState, useEffect } from "react";
import propTypes from "prop-types";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import isInsideQuadrangle from "../isInsideQuadrangle";
import "./styles/Popup.css";

// window with 3 buttons that pops up in position that is received from props
function Popup({ imgPosition, offset, disable, firebaseApp, addCharacter }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const db = getFirestore(firebaseApp);
  // wait for the component to mount
  const wrapper = useRef(null);

  useEffect(() => {
    wrapper.current.style.transform = `translate(${-imgPosition.x}px, ${-imgPosition.y}px)`;
  });

  useEffect(() => {
    setPosition({ x: offset.x, y: offset.y });
    setIsActive(true);
  }, [offset]);

  const handleClose = () => {
    setPosition({ x: 0, y: 0 });
    setIsActive(false);
    disable();
  };

  async function checkCords(charName) {
    const charDoc = await getDoc(doc(collection(db, "characters"), charName));
    if (charDoc.exists()) {
      const isInside = isInsideQuadrangle(offset, charDoc.data().cords);
      if (isInside) {
        addCharacter(charName);
      }
    }
    handleClose();
  }

  return (
    <div className="popup-container" ref={wrapper}>
      {isActive && position.x !== 0 && position.y !== 0 ? (
        <div className="popup" style={{ top: position.y, left: position.x }}>
          <button
            type="button"
            onClick={() => {
              checkCords("Jerry_Mouse.png");
            }}
          >
            Jerry
          </button>
          <button
            type="button"
            onClick={() => {
              checkCords("sonic-png-11.png");
            }}
          >
            Sonic
          </button>
          <button
            type="button"
            onClick={() => {
              checkCords("Gay_rabbit_max.webp");
            }}
          >
            Max
          </button>
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
  disable: propTypes.func.isRequired,
};

export default Popup;
