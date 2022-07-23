import React, { useContext, createContext, useState, useEffect } from "react";

export const AuthProviderContext = createContext();
export const AuthProviderContextdispatch = createContext();
// const LOCAL_STORAGE_AUTH_KEY = "auth";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("auth"));
    setUser(userAuth);
  }, []);

  // useEffect(() => {
  //   const userData = JSON.stringify(user);
  //   localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, userData);
  // }, [user]);
  return (
    <AuthProviderContext.Provider value={user}>
      <AuthProviderContextdispatch.Provider value={setUser}>
        {children}
      </AuthProviderContextdispatch.Provider>
    </AuthProviderContext.Provider>
  );
};
export default AuthProvider;

export const useAuthContext = () => useContext(AuthProviderContext);
export const useAuthContextAction = () =>
  useContext(AuthProviderContextdispatch);
