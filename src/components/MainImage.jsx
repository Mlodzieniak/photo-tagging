// import React from "react";
// import waldo from "../images/waldo.jpg";

// function MainImage() {
//   return (
//     <div className="main-img-wrapper">
//       <img src={waldo} alt="All characters." className="main" />
//     </div>
//   );
// }

// export default MainImage;
import React, { useRef, useEffect } from "react";
import waldo from "../images/waldo.jpg";
import "./styles/MainImage.css";

function MainImage() {
  const wrapperRef = useRef(null);
  let pos = { top: 0, left: 0, x: 0, y: 0 };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    wrapper.addEventListener("mouseenter", startDrag);
    wrapper.addEventListener("mouseleave", stopDrag);
    wrapper.addEventListener("mousemove", drag);

    return () => {
      wrapper.removeEventListener("mouseenter", startDrag);
      wrapper.removeEventListener("mouseleave", stopDrag);
      wrapper.removeEventListener("mousemove", drag);
    };
  });

  const startDrag = (e) => {
    const wrapper = wrapperRef.current;
    pos = {
      left: wrapper.scrollLeft,
      top: wrapper.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };
    wrapper.style.cursor = "grabbing";
  };

  const stopDrag = () => {
    const wrapper = wrapperRef.current;
    wrapper.style.cursor = "grab";
  };

  const drag = (e) => {
    const wrapper = wrapperRef.current;
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    if (dx !== 0 || dy !== 0) {
      wrapper.scrollLeft = pos.left + dx;
      wrapper.scrollTop = pos.top + dy;
    }

    pos = {
      left: wrapper.scrollLeft,
      top: wrapper.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };
  };

  return (
    <div className="main-img-wrapper" ref={wrapperRef}>
      <img src={waldo} alt="All characters." className="main" />
    </div>
  );
}

export default MainImage;
