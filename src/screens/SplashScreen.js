import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { isUserLoggedIn } from "../../firebase";
import ItemsContext from "../context/ItemsContext";
import UserContext from "../context/UserContext";
import { COLOURS } from "../styles/elementStyles";
import { getAllItemsInMenu } from "../utils/utils";

export default SplashScreen = ({ navigation }) => {
  const { login } = useContext(UserContext);
  const { setMenuList } = useContext(ItemsContext);
  const getItems = async () => {
    const list = await getAllItemsInMenu();
    setMenuList(list);
  };

  useEffect(() => {
    loginStatus();
    getItems();
  }, []);

  const loginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      setTimeout(() => {
        if (token !== null) {
          const userData = JSON.parse(token);
          login(userData.id, userData.name);
          navigation.navigate("userFlow");
        } else {
          navigation.navigate("loginFlow");
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{ backgroundColor: COLOURS.oliveGreen, flex: 1 }}>
      <Text>Hello</Text>
    </View>
  );
};
