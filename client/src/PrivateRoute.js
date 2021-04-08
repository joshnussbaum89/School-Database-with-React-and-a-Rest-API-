import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

// destructure and rename component prop in parameters
// collect any props with ...rest
// <Consumer> subscribes PrivateRoute to actions and data provided by Context.js
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};

export default PrivateRoute;
