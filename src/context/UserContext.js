import React, { useId, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ uid: "", userName: "", auth: false });
  // id: item.id,
  // name: item.data().name,
  // desc: item.data().description,
  const [menuItems, setMenuItems] = useState([{}]);

  const login = (userId, name) => {
    console.log(name);
    setUser({
      uid: userId,
      userName: name,
      auth: true,
    });
  };

  const logout = () => {
    setUser({ uid: "", userName: "", auth: false });
  };

  const setMenuList = (menuList) => {
    console.log(menuList);
    setMenuItems(menuList);
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, menuItems, setMenuList }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
