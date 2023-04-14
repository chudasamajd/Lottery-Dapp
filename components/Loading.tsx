import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

function Loading() {
  return (
    <div className=" loading-container">
      <div className="grid-line">
        <div className="loader">
          <img className="" src="/logo.png" width={70} height={70} />
          <span className="flex">
            Loading
            <div className="dot-1">.</div>
            <div className="dot-2">.</div>
            <div className="dot-3">.</div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
