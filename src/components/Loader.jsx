import React, { useState, useEffect } from "react";

const Loader = () => {
  return (
    <div className=" flex relative justify-center ">
      <div className="lds-ellipsis -ml-14 ">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
