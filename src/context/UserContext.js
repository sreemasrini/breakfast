import React, { useState } from "react";
const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userName: "", auth: false });

  const login = (name) => {
    setUser({
      userName: name,
      auth: true,
    });
  };

  const logout = () => {
    setUser({ userName: "", auth: false });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
