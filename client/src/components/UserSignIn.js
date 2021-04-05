import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignIn = ({ history, context }) => {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [errors, updateErrors] = useState([]);

  const changeUsername = (event) => {
    updateUsername(event.target.value);
  };

  const changePassword = (event) => {
    updatePassword(event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    context.actions.signIn(username, password).then((user) => {
      if (user == null) {
        updateErrors(["Sign-in was unsuccessful"]);
        console.log(errors);
      } else {
        updateErrors("");
        console.log(`SUCCESS! ${username} is now signed in!`);
        history.push("/");
      }
    });
  };

  return (
    <>
      <div className="form--centered">
        <h2>Sign In</h2>

        {errors ? (
          <div>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <form onSubmit={submit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={changeUsername}
            value={username}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={changePassword}
            value={password}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link to="/" className="button button-secondary">
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
