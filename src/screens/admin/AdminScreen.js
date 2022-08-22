import React, { useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Button } from "react-native";
import UserContext from "../../context/UserContext";
import styles, { COLOURS } from "../../styles/elementStyles";
import { getAllItemsInMenu } from "../../utils/utils";

const AdminScreen = ({ navigation }) => {
  const { setMenuList } = useContext(UserContext);
  const getItems = async () => {
    const list = await getAllItemsInMenu();

    setMenuList(list);
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <View style={{ margin: 20 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MenuForTheWeek");
          }}
          style={{
            height: 50,
            width: 240,
            backgroundColor: COLOURS.oliveGreen,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
            }}
          >
            Add Menu for the week
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ margin: 30 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MenuItems");
          }}
          style={{
            height: 50,
            width: 150,
            backgroundColor: COLOURS.oliveGreen,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
            }}
          >
            Menu Items
          </Text>
        </TouchableOpacity>
      </View>

      <Text>Total orders for tomorrow : 32</Text>
    </View>
  );
};

export default AdminScreen;
