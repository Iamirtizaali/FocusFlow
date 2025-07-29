import { createContext, useContext, useState } from "react";
import { LocalStoragePersistant } from "./LocalStoragePersistant";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = LocalStoragePersistant("user", null);
    
  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => setUser(null);


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
