import React, { Component } from "react";
import { useMoralis } from "react-moralis";
const AUTH_CONTEXT = React.createContext();

export const Provider = ({ children }) => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const signIn = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <AUTH_CONTEXT.Provider value={{signIn,logout}}>{children}</AUTH_CONTEXT.Provider>
    </>
  );
};


export default AUTH_CONTEXT;