/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState, useEffect } from "react";
import propTypes from "prop-types";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import isInsideQuadrangle from "../isInsideQuadrangle";
import "./styles/Popup.css";

// window with 3 buttons that pops up in position that is received from props
function Popup({ imgPosition, offset, disable, firebaseApp }) {
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
  // async function addCords(charName) {
  //   try {
  //     const charRef = await doc(collection(db, "characters"), charName);
  //     updateDoc(charRef, { cords: arrayUnion(offset) });
  //     console.log("Document written with ID: ", charRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }
  // prompts db for cords of selected character
  async function getCords(charName) {
    const charDoc = await getDoc(doc(collection(db, "characters"), charName));
    if (charDoc.exists()) {
      const isInside = isInsideQuadrangle(offset, charDoc.data().cords);
      console.log(isInside);
    }
  }

  return (
    <div className="popup-container" ref={wrapper}>
      {isActive && position.x !== 0 && position.y !== 0 ? (
        <div className="popup" style={{ top: position.y, left: position.x }}>
          <button
            value="Jerry_Mouse.png"
            type="button"
            onClick={() => {
              getCords("Jerry_Mouse.png");
            }}
          >
            Jerry
          </button>
          <button
            value="sonic-png-11.png"
            type="button"
            onClick={() => {
              getCords("sonic-png-11.png");
            }}
          >
            Sonic
          </button>
          <button
            value="Gay_rabbit_max.webp"
            type="button"
            onClick={() => {
              getCords("Gay_rabbit_max.webp");
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
