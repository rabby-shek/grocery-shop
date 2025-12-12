import React from "react";

const Widget = ({ title, value, icon, bgColor = "primary" }) => {
  return (
    <div className="col-md-3 mb-3">
      <div className={`card text-white bg-${bgColor} shadow-sm`}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 className="card-title">{title}</h6>
            <h3 className="card-text">{value}</h3>
          </div>
          <div style={{ fontSize: "2rem" }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
