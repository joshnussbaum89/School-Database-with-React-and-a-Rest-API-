import React from "react";
import { Link } from "react-router-dom";

// Displayed on all pages
// Links change dynamically depending on whether or not a user is signed in
class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            <ul className="header--signedout">
              {authUser !== null ? (
                <>
                  <span>Welcome, {authUser.user.firstName}! </span>
                  <Link to="/signout">Sign Out</Link>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/signin">Sign In</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
