import { createContext, useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME, REGISTER, LOGIN } from "../queries/auth";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [registerMutation] = useMutation(REGISTER);
  const [loginMutation] = useMutation(LOGIN);

  const userQuery = useQuery(GET_ME, {
    onCompleted(data) {
      setCurrentUser(data.me);
      setLoading(false);
    },
    onError() {
      setCurrentUser(null);
      localStorage.removeItem("jwt");
      setLoading(false);
    },
  });

  const register = async (name, email, password) => {
    const response = await registerMutation({
      variables: { name, email, password },
    });
    localStorage.setItem("jwt", response.data.register.jwt);
    userQuery.refetch();
  };

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
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };
