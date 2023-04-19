import React, { useRef, useEffect, useState } from "react";
import Popup from "./Popup";
import waldo from "../images/waldo.jpg";
import "./styles/MainImage.css";

function MainImage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
  };

  const calcMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;

    wrapper.addEventListener("mousemove", drag);
    wrapper.addEventListener("click", calcMousePosition);

    return () => {
      wrapper.removeEventListener("mousemove", drag);
      wrapper.removeEventListener("click", calcMousePosition);
    };
  }, []);
  return (
    <div className="main-img-wrapper" ref={wrapperRef}>
      <img src={waldo} alt="All characters." className="main" />
      <Popup newPosition={mousePosition} />
    </div>
  );
}

export default MainImage;
