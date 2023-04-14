import React from "react";

function GridQRCode() {
  return (
    <div className="h-full flex">
      <div className="qr-vertical-container">
        <img src="/cup.png" className="cup-icon" />
        <h2 className="qr-title">
          <span className="-rotate-90 whitespace-nowrap">Buy me Coffee</span>
        </h2>
      </div>
      <div className="w-full h-full overflow-hidden rounded-2xl">
        <img src="/qr-code.png" className="w-full h-full" />
      </div>
    </div>
  );
}

export default GridQRCode;
