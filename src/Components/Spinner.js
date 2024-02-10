import React, { Component } from "react";
import spinnerImage from "../Spinner-without-bg-202px.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinnerImage}
        alt="Loading"
        style={{ width: "50%", height: "50%" }}
      />
    </div>
  );
};
export default Spinner;