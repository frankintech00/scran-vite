import React from "react";

function Loading() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        Loading...
        <span className="loading loading-spinner loading-lg mt-8"></span>
      </div>
    </>
  );
}

export default Loading;
