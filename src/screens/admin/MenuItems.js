import { add } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-elements/dist/icons/Icon";
import UserContext from "../../context/UserContext";
import ItemsContext from "../../context/ItemsContext";
import { COLOURS } from "../../styles/elementStyles";

import { addItemToMenu, getAllItemsInMenu } from "../../utils/utils";

const MenuItems = ({ navigation }) => {
  const { menuItems, setMenuList } = useContext(ItemsContext);

  const [addItem, setAddItem] = useState({ name: "", desc: "", category: 1 });
  const getItems = async () => {
    const list = await getAllItemsInMenu();
    setMenuList(list);
  };
  const categoryList = [
    { id: 1, name: "Breakfast" },
    { id: 2, name: "Lunch" },
    { id: 3, name: "Snacks" },
  ];
  const [dialogEnabled, setEnabled] = useState(false);

  const addMenu = async () => {
    console.log(addItem.category);
    const length = menuItems.length === 0 ? 0 : menuItems.length;
    await addItemToMenu(addItem.name, addItem.desc, addItem.category, length);
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
          <Dropdown
            data={categoryList}
            style={{ borderWidth: 1, height: 40, margin: 10, padding: 9 }}
            labelField="name"
            valueField="id"
            statusBarIsTranslucent={true}
            selectedTextStyle={styles.textItem}
            value={addItem.category}
            onChange={(val) => {
              setAddItem({ ...addItem, category: val });
            }}
            renderItem={(item) => {
              return (
                <View style={styles.item}>
                  <Text style={styles.textItem}>{item.name}</Text>
                </View>
              );
            }}
          />
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
            <Text style={{ fontSize: 18, color: "white" }}>Item Name</Text>
          </View>
          <View style={{ width: 200 }}>
            <Text style={{ fontSize: 18, color: "white" }}>Description</Text>
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
                <View style={{ width: 150 }}>
                  <Text style={{ fontSize: 16 }}>{item.name}</Text>
                </View>

                <View style={{ width: 120 }}>
                  <Text style={{ fontSize: 16 }}>{item.desc}</Text>
                </View>
                <View style={{ width: 70 }}>
                  <Text style={{ fontSize: 15 }}>{item.category.name}</Text>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 2,
    padding: 5,
  },

  textItem: {
    paddingLeft: 5,
    flex: 1,
    fontSize: 16,
  },
});

export default MenuItems;
