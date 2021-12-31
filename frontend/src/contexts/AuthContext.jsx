import { createContext, useContext } from "react";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useWhoamiQuery } from "../hooks/useWhoamiQuery";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [loginMutation] = useLoginMutation();
  const { data: currentUser, refetch: updateUser } = useWhoamiQuery();

  const login = async (email, password) => {
    const response = await loginMutation({
      variables: { email, password },
    });
    localStorage.setItem("jwt", response.jwt);
    updateUser();
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    updateUser();
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
