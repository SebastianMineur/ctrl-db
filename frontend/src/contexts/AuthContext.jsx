import { createContext, useContext, useState } from "react";
import * as strapi from "../services/strapi";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const login = async (email, password) => {
    let response;
    try {
      response = await strapi.login(email, password);
      if (response.errors) throw new Error(response.errors[0].message);
    } catch (error) {
      console.error(error);
      throw error;
    }
    setCurrentUser(response.data.login.user);
    setJwt(response.data.login.jwt);
  };

  const logout = () => {
    setCurrentUser(null);
    setJwt(null);
  };

  const values = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };
