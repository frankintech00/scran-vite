import React from "react";

function Loading() {
  return (
    <>
      <div>
        Loading...
        <span
          className="loading loading-spinner loading-lg mt-8"
          data-testid="loading-spinner"
        ></span>
      </div>
    </>
  );
}

export default Loading;
