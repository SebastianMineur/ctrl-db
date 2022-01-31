import { createContext, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { LOGIN, GET_ME } from "../queries/auth";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [loginMutation] = useMutation(LOGIN);

  const userQuery = useQuery(GET_ME, {
    onCompleted(data) {
      setCurrentUser(data.me);
    },
    onError() {
      setCurrentUser(null);
    },
  });

  const login = async (email, password) => {
    const response = await loginMutation({
      variables: { email, password },
    });
    localStorage.setItem("jwt", response.data.login.jwt);
    userQuery.refetch();
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    userQuery.refetch();
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
