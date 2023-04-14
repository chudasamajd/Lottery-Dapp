import React, { useEffect } from "react";

function GridLogo() {
  useEffect(() => {
    test();
  }, []);
  function test() {
    const element = document.querySelectorAll(".badge__char");
    const step = 360 / element.length;

    element.forEach((elem, i) => {
      elem.style.setProperty("--char-rotate", i * step + "deg");
    });
  }
  return (
    <div className="w-full h-full">
      <div className="grid-line">
        <div className="badge c-black" id="badge">
          <span className="badge__char">P</span>
          <span className="badge__char">r</span>
          <span className="badge__char">o</span>
          <span className="badge__char">d</span>
          <span className="badge__char">u</span>
          <span className="badge__char">c</span>
          <span className="badge__char">t</span>
          <span className="badge__char"></span>
          <span className="badge__char">O</span>
          <span className="badge__char">f</span>
          <span className="badge__char"> </span>
          <span className="badge__char">⚡</span>
          <span className="badge__char"> </span>
          <span className="badge__char">G</span>
          <span className="badge__char">h</span>
          <span className="badge__char">o</span>
          <span className="badge__char">s</span>
          <span className="badge__char">t</span>
          <span className="badge__char"> </span>
          <span className="badge__char">T</span>
          <span className="badge__char">w</span>
          <span className="badge__char">o</span>
          <span className="badge__char">n</span>
          <span className="badge__char"> </span>
          <span className="badge__char">⚡</span>
          <span className="badge__char"> </span>
          <img
            className="badge__emoji"
            src="/logo.png"
            width="90"
            height="90"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default GridLogo;
