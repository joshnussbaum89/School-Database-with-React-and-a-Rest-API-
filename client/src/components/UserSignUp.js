import React from "react";

const UserSignUp = () => {
  return (
    <>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value="" />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value="" />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value=""
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button
            className="button button-secondary"
            onclick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to
          <a href="sign-in.html">sign in</a>!
        </p>
      </div>
    </>
  );
};

export default UserSignUp;
