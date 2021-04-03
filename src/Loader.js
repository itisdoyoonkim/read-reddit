import React from "react";
import { Spin } from "antd";

function Loader() {
  return (
    <div className="loading-spinner">
      <Spin />
    </div>
  );
}

export default Loader;
