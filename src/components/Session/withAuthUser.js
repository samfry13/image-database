import React from "react";
import AuthUserContext from "./context";

const withAuthUser = Component => props => {
  return <AuthUserContext.Consumer>
    {authUser => <Component authUser={authUser} {...props}/>}
  </AuthUserContext.Consumer>
};

export default withAuthUser;