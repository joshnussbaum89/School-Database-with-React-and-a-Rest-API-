import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignUp = ({ history, context }) => {
  // Using "" as initial value doesn't render the correct errors
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [emailAddress, updateEmailAddress] = useState("");
  const [password, updatePassword] = useState("");
  const [confirmedPassword, updateConfirmedPassword] = useState("");
  const [errors, updateErrors] = useState([]);

  const change = (event) => {
    if (event.target.name === "firstName") {
      updateFirstName(event.target.value);
    } else if (event.target.name === "lastName") {
      updateLastName(event.target.value);
    } else if (event.target.name === "emailAddress") {
      updateEmailAddress(event.target.value);
    } else if (event.target.name === "password") {
      updatePassword(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      updateConfirmedPassword(event.target.value);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          updateErrors({ errors });
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            history.push("/");
          });
          console.log(
            `${firstName} ${lastName} is successfully signed up and authenticated!`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };

  return (
    <>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form onSubmit={submit}>
          <label htmlFor="name">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={change}
            value={firstName}
          />
          <label htmlFor="name">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={change}
            value={lastName}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={change}
            value={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={change}
            value={password}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={change}
            value={confirmedPassword}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary">Cancel</button>
        </form>
        <p>
          Already have a user account? Click here to
          <Link to="signin"> sign in</Link>!
        </p>
      </div>
    </>
  );
};

export default UserSignUp;
