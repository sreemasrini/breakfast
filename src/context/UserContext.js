import React, { useId, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ uid: "", userName: "", auth: false });
  // id: item.id,
  // name: item.data().name,
  // desc: item.data().description,

  const login = (userId, name) => {
    console.log(name);
    setUser({
      uid: userId,
      userName: name,
      auth: true,
    });
  };

  const logout = async () => {
    setUser({ uid: "", userName: "", auth: false });
    try {
      await AsyncStorage.setItem("token", null);
    } catch (e) {
      console.log(e);
    }
  };

  //, menuItems, setMenuList
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
