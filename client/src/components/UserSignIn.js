import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignIn = ({ history, context }) => {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [errors, updateErrors] = useState([]);

  const change = (event) => {
    if (event.target.type === "email") {
      updateUsername(event.target.value);
      console.log(username);
    } else {
      updatePassword(event.target.value);
      console.log(password);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    context.actions.signIn(username, password).then((user) => {
      if (user == null) {
        updateErrors(["Sign-in was unsuccessful"]);
        console.log(errors);
      } else {
        updateErrors([]);
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
            onChange={change}
            value={username}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={change}
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
