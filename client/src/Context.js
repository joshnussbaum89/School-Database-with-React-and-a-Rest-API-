import React, { Component } from "react";
import Cookies from "js-cookie";

// Contains helper class
import Data from "./Data";

// Context used throughout app
const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    authenticatedPassword: Cookies.getJSON("authenticatedPassword") || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const { authenticatedPassword } = this.state;

    // Data to be used in Context.Provider's value prop
    const value = {
      authenticatedUser,
      authenticatedPassword,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signout: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  /**
   * Sign in user from UserSignIn.js, sets cookies
   * @param {*} emailAddress
   * @param {*} password
   * @returns authenticated user
   */

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          authenticatedPassword: password,
        };
      });

      // Set cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      Cookies.set("authenticatedPassword", JSON.stringify(password), {
        expires: 1,
      });
    }
    return user;
  };

  /**
   * Sign out user
   */

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
        authenticatedPassword: null,
      };
    });
    Cookies.remove("authenticatedUser");
    Cookies.remove("authenticatedPassword");
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
