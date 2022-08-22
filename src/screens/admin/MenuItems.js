import { add } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import UserContext from "../../context/UserContext";
import styles, { COLOURS } from "../../styles/elementStyles";

import { addItemToMenu, getAllItemsInMenu } from "../../utils/utils";

const MenuItems = ({ navigation }) => {
  const { menuItems, setMenuList } = useContext(UserContext);

  const [addItem, setAddItem] = useState({ name: "", desc: "" });
  const getItems = async () => {
    const list = await getAllItemsInMenu();
    setMenuList(list);
  };
  const [dialogEnabled, setEnabled] = useState(false);

  // useEffect(() => {
  //   getItems();
  // }, []);

  const addMenu = async () => {
    console.log(menuItems.length);
    await addItemToMenu(addItem.name, addItem.desc, menuItems.length);
    getItems();
    setAddItem({ name: "", desc: "" });
  };
  return (
    <View>
      <View style={{ marginTop: 20, alignItems: "flex-end", marginEnd: 30 }}>
        <Icon
          name="plus-circle"
          type="feather"
          color={COLOURS.oliveGreen}
          solid={true}
          size={30}
          onPress={() => {
            setEnabled(!dialogEnabled);
            setAddItem({ name: "", desc: "" });
          }}
        />
      </View>
      {dialogEnabled ? (
        <View
          style={{
            backgroundColor: "#DCDCDC",
            margin: 15,
            borderRadius: 20,
            padding: 15,
          }}
        >
          <Text style={{ fontSize: 22 }}>Add Item</Text>
          <TextInput
            placeholder="Item"
            value={addItem.name}
            onChangeText={(text) => {
              setAddItem({ ...addItem, name: text });
            }}
            style={{ borderWidth: 1, height: 40, margin: 10, padding: 9 }}
          ></TextInput>
          <TextInput
            placeholder="Description"
            style={{ borderWidth: 1, height: 40, margin: 10, padding: 9 }}
            value={addItem.desc}
            onChangeText={(text) => {
              setAddItem({ ...addItem, desc: text });
            }}
          ></TextInput>
          <View style={{ width: 150 }}>
            <TouchableOpacity
              onPress={() => {
                addMenu();
                setEnabled(!dialogEnabled);
              }}
              disabled={addItem.name === "" || addItem.desc === ""}
              style={{
                height: 40,
                width: 150,
                backgroundColor:
                  addItem.name === "" || addItem.desc === ""
                    ? "gray"
                    : COLOURS.oliveGreen,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Add Item
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            margin: 5,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOURS.oliveGreen,
            padding: 10,
            marginBottom: 15,
          }}
        >
          <View style={{ width: 180 }}>
            <Text style={{ fontSize: 20, color: "white" }}>Item Name</Text>
          </View>
          <View style={{ width: 200 }}>
            <Text style={{ fontSize: 20, color: "white" }}>Description</Text>
          </View>
        </View>
        <FlatList
          data={menuItems}
          key={(item) => {
            item.id;
          }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  margin: 5,
                  marginLeft: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ width: 30 }}>
                  <Text style={{ fontSize: 20 }}>{index + 1}</Text>
                </View>
                <View style={{ width: 150 }}>
                  <Text style={{ fontSize: 20 }}>{item.name}</Text>
                </View>
                <View style={{ width: 200 }}>
                  <Text style={{ fontSize: 18 }}>{item.desc}</Text>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

export default MenuItems;
