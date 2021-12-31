import { createContext, useContext, useState, useEffect } from "react";
import { useLoginMutation } from "../hooks/useLoginMutation";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginMutation] = useLoginMutation();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const login = async (email, password) => {
    const response = await loginMutation({
      variables: { email, password },
    });
    setCurrentUser(response.user);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("jwt", response.jwt);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
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
