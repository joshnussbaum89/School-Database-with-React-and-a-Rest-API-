import React from "react";

// This is kind of a catch-all for any unexpected errors
const UnhandledError = () => {
  return (
    <div className="wrap">
      <h2>Error</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  );
};

export default UnhandledError;
