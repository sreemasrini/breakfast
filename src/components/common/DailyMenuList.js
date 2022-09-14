import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import commonStyles, { COLOURS } from "../../styles/elementStyles";

import DateScroller from "../users/DateScroller";
import { MultiSelect } from "react-native-element-dropdown";
import MultiSelectMenuPicker from "./MultiSelectMenuPicker";
import { ScrollView } from "react-native";
import UserContext from "../../context/UserContext";
const DailyMenuList = ({ refresh, onMenuListAdded }) => {
  const [selectedBreakfastItems, setSelectedBreakfastItems] = useState([]);
  const [selectedLunchItems, setSelectedLunchItems] = useState([]);

  const [selectedSnackItems, setSelectedSnackItems] = useState([]);
  const { menuItems } = useContext(UserContext);

  const areItemsAvailable = (category) => {
    const itemsList = menuItems
      .filter((r) => r.category.id === category)
      .map((r) => {
        return { id: r.id, name: r.name };
      });
    return itemsList.length > 0;
  };

  useEffect(() => {
    setSelectedBreakfastItems([]);
    setSelectedLunchItems([]);
    setSelectedSnackItems([]);
  }, [refresh]);

  return (
    <ScrollView
      style={{
        marginHorizontal: 5,
      }}
    >
      <View>
        <View>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Breakfast
          </Text>
          <View style={{ margin: 5 }}>
            <MultiSelectMenuPicker
              category={1}
              refresh={refresh}
              onItemsSelected={(item) => setSelectedBreakfastItems(item)}
            ></MultiSelectMenuPicker>
          </View>
        </View>
        {areItemsAvailable(2) ? (
          <View>
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Lunch
            </Text>
            <View style={{ margin: 5 }}>
              <MultiSelectMenuPicker
                refresh={refresh}
                category={2}
                onItemsSelected={(item) => setSelectedLunchItems(item)}
              ></MultiSelectMenuPicker>
            </View>
          </View>
        ) : null}
        {areItemsAvailable(3) ? (
          <View>
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Snacks
            </Text>
            <View style={{ margin: 5 }}>
              <MultiSelectMenuPicker
                refresh={refresh}
                category={3}
                onItemsSelected={(item) => setSelectedSnackItems(item)}
              ></MultiSelectMenuPicker>
            </View>
          </View>
        ) : null}
      </View>

      <View style={{ margin: 10 }}>
        <TouchableOpacity
          onPress={() => {
            onMenuListAdded([
              {
                selectedBreakfastItems,
                selectedLunchItems,
                selectedSnackItems,
              },
            ]);
          }}
          style={{
            height: 50,
            width: 150,
            backgroundColor:
              selectedBreakfastItems.length +
                selectedLunchItems.length +
                selectedSnackItems.length ===
              0
                ? "grey"
                : COLOURS.oliveGreen,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
          }}
          disabled={
            selectedBreakfastItems.length +
              selectedLunchItems.length +
              selectedSnackItems.length ===
            0
          }
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
            }}
          >
            Add Items
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
});

export default DailyMenuList;
