import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(0);
  const [user, setUser] = useState({});
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, role, setRole }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
