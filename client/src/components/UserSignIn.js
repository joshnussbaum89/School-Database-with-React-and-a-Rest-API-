import React from "react";

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
          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            onClick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to
          <a href="sign-up.html">sign up</a>!
        </p>
      </div>
    </>
  );
};

export default UserSignIn;
