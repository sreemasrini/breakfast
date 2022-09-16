import React, { useId, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ItemsContext = React.createContext({});

export const ItemsProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([{}]);
  const [itemsForTheDay, setItemsForTheDay] = useState([]);

  const setMenuList = (menuList) => {
    setMenuItems(menuList);
  };

  const setMenuListForTheDay = (menuList) => {
    setItemsForTheDay(menuList);
  };

  //   const [user, setUser] = useState({ uid: "", userName: "", auth: false });

  //   const [menuItems, setMenuItems] = useState([{}]);

  //   const login = (userId, name) => {
  //     console.log(name);
  //     setUser({
  //       uid: userId,
  //       userName: name,
  //       auth: true,
  //     });
  //   };

  //   const logout = () => {
  //     setUser({ uid: "", userName: "", auth: false });
  //   };

  //   const setMenuList = (menuList) => {
  //     console.log(menuList);
  //     setMenuItems(menuList);
  //   };
  // value={{ user, login, logout, menuItems, setMenuList }}
  return (
    <ItemsContext.Provider
      value={{ menuItems, setMenuList, itemsForTheDay, setMenuListForTheDay }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
