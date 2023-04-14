import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function GridDisclaimer() {
  return (
    <>
      <ExclamationTriangleIcon className="disclaimer-icon" />
      <p className="disclaimer">
        DISCLAIMER: This project is made for informational and educational
        purpose only. The content of this project is not intended to be a lure
        to gambling. We are not liable for any losses that are incurred or
        problems that arise at online casinos or elsewhere after the
        consideration of this project. If you are gambling online utilizing
        information from this project, you are doing so completely and totally
        at your own risk.
      </p>
    </>
  );
}

export default GridDisclaimer;
