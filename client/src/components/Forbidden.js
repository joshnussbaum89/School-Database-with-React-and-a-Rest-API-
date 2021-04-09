import React from "react";

// If user isn't authorized to access route
const Forbidden = () => {
  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
    </div>
  );
};

export default Forbidden;
