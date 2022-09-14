import React, { Component, useState, useContext, useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import UserContext from "../../context/UserContext";

export default MultiSelectMenuPicker = ({
  refresh,
  category,
  onItemsSelected,
}) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);

  const { menuItems } = useContext(UserContext);

  const setItemsForCategory = (category) => {
    const itemsList = menuItems
      .filter((r) => r.category.id === category)
      .map((r) => {
        return { id: r.id, name: r.name };
      });
    // console.log("itemsList");

    setItems(itemsList);
    // console.log(items);
  };

  useEffect(() => {
    setItemsForCategory(category);
    setSelected([]);
    // console.log("h" + selected);
  }, [refresh]);

  return (
    <View>
      <MultiSelect
        data={items}
        style={{ borderWidth: 1, height: 40, margin: 10, padding: 9 }}
        labelField="name"
        valueField="id"
        selectedTextStyle={styles.selectedTextStyle}
        statusBarIsTranslucent={true}
        value={selected}
        onChange={(item) => {
          // console.log("nameid");
          // console.log(item);
          setSelected(item);
          onItemsSelected(item);
        }}
        renderItem={(item) => {
          return (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.name}</Text>
            </View>
          );
        }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {},
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 2,
    padding: 5,
  },

  textItem: {
    paddingLeft: 5,
    flex: 1,
    fontSize: 12,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 2,
    padding: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    borderWidth: 2,
  },
  textItem: {
    paddingLeft: 5,
    flex: 1,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 11,
    color: "black",
    paddingRight: 2,
    paddingLeft: 2,
  },
});
