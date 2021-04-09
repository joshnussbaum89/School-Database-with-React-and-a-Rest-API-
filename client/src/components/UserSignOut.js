import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// Calls signOut and updates state after render
const UserSignOut = ({ context }) => {
  useEffect(() => context.actions.signout());
  return <Redirect to="/" />;
};

export default UserSignOut;
