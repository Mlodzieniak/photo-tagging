/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState } from "react";
import Popup from "./Popup";
import waldo from "../images/waldo.jpg";
import "./styles/MainImage.css";

function MainImage({ firebaseApp }) {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupOffset, setPopupOffset] = useState({ x: 0, y: 0 });
  const [popupActive, setPopupActive] = useState(false);

  const drag = (e) => {
    const wrapper = wrapperRef.current;

    // calculate position of mouse relative to top-left of wrapper
    const wrapperRect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - wrapperRect.left;
    const mouseY = e.clientY - wrapperRect.top;

    // calculate position of image based on mouse position
    const img = wrapper.querySelector("img.main");
    const imgRect = img.getBoundingClientRect();
    const imgX =
      (imgRect.width - wrapperRect.width) * (mouseX / wrapperRect.width);
    const imgY =
      (imgRect.height - wrapperRect.height) * (mouseY / wrapperRect.height);
    img.style.transform = `translate(${-imgX}px, ${-imgY}px)`;
    setPopupPosition({ x: imgX, y: imgY });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!popupActive) {
      wrapper.addEventListener("mousemove", drag);
    }
    return () => {
      wrapper.removeEventListener("mousemove", drag);
    };
  });

  const handleClick = (event) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPopupOffset({ x, y });
    setPopupActive(true);
  };
  const disablePopup = () => {
    setPopupActive(false);
  };
  // Popup receives position of mouse as props
  return (
    <div className="main-img-wrapper" ref={wrapperRef}>
      <img
        src={waldo}
        alt="All characters."
        className="main"
        onClick={handleClick}
        ref={imgRef}
      />
      <Popup
        imgPosition={popupPosition}
        offset={popupOffset}
        disable={disablePopup}
        // isActive={isPopupActive}
        // setIsPopupActive={setIsPopupActive}
        firebaseApp={firebaseApp}
      />
    </div>
  );
}

export default MainImage;
