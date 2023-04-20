/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState } from "react";
import Popup from "./Popup";
import waldo from "../images/waldo.jpg";
import "./styles/MainImage.css";

function MainImage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const drag = (e) => {
    const wrapper = wrapperRef.current;

    // calculate position of mouse relative to center of wrapper
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
    setMousePosition({ x: mouseX, y: mouseY });
  };

  // const calcMousePosition = (e) => {
  //   const wrapper = wrapperRef.current;
  //   const wrapperRect = wrapper.getBoundingClientRect();
  //   const mouseX = e.clientX - wrapperRect.left;
  //   const mouseY = e.clientY - wrapperRect.top;
  //   // setMousePosition({ x: mouseX, y: mouseY });
  // };

  useEffect(() => {
    const wrapper = wrapperRef.current;

    wrapper.addEventListener("mousemove", drag);
    // wrapper.addEventListener("click", calcMousePosition);

    return () => {
      wrapper.removeEventListener("mousemove", drag);
      // wrapper.removeEventListener("click", calcMousePosition);
    };
  });
  const handleClick = () => {
    const wrapper = wrapperRef.current;
    const img = wrapper.querySelector("img.main");
    const imgRect = img.getBoundingClientRect();
    const popup = wrapper.querySelector(".popup-container");
    const popupRect = popup.getBoundingClientRect();
    const popupX = imgRect.left + mousePosition.x - popupRect.width / 2;
    const popupY = imgRect.top + mousePosition.y - popupRect.height / 2;
    setPopupPosition({ x: popupX, y: popupY });
  };
  // useEffect(() => {
  //   const wrapper = wrapperRef.current;
  //   const img = wrapper.querySelector("img.main");
  //   const imgRect = img.getBoundingClientRect();
  //   const popup = wrapper.querySelector(".popup-container");
  //   const popupRect = popup.getBoundingClientRect();
  //   const popupX = imgRect.left + mousePosition.x - popupRect.width / 2;
  //   const popupY = imgRect.top + mousePosition.y - popupRect.height / 2;
  //   setPopupPosition({ x: popupX, y: popupY });
  // }, [mousePosition]);

  // Popup receives position of mouse as props
  return (
    <div className="main-img-wrapper" ref={wrapperRef}>
      <img
        src={waldo}
        alt="All characters."
        className="main"
        onClick={handleClick}
      />
      <Popup newPosition={popupPosition} />
    </div>
  );
}

export default MainImage;
