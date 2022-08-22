import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { isUserLoggedIn } from "../../firebase";
import UserContext from "../context/UserContext";
import { getAllItemsInMenu } from "../utils/utils";

export default SplashScreen = ({ navigation }) => {
  const { setMenuList } = useContext(UserContext);
  const getItems = async () => {
    const list = await getAllItemsInMenu();
    setMenuList(list);
  };

  useEffect(() => {
    getItems();
    loginStatus();
  }, []);

  const loginStatus = () => {
    const user = isUserLoggedIn;
    setTimeout(() => {
      if (user !== null) {
        console.log(user);
        navigation.navigate("userFlow");
      } else {
        navigation.navigate("loginFlow");
      }
    }, 1000);
  };
  return (
    <View style={{ backgroundColor: "red", flex: 1 }}>
      <Text>Hello</Text>
    </View>
  );
};
