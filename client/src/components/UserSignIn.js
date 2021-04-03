import React from "react";
import { Link } from "react-router-dom";

// 1. Get sign in and sign out functions working
const UserSignIn = () => {
  return (
    <>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value="" />
          {/* Link Sign In button to signIn() in Context.js */}
          <button className="button" type="submit">
            Sign In
          </button>
          <Link
            to="/"
            className="button button-secondary"
            // onClick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </Link>
        </form>
        <p>
          Don't have a user account? Click here to
          <Link to="signup"> sign up</Link>!
        </p>
      </div>
    </>
  );
};

export default UserSignIn;
