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
//import MenuPicker from "../../components/common/MenuPicker";
import DateScroller from "../../components/users/DateScroller";
import UserContext from "../../context/UserContext";
import DailyMenuList from "../../components/common/DailyMenuList";
import { addItemsForTheDay, getFormattedDate } from "../../utils/utils";

import { ScrollView } from "react-native";

const MenuForTheWeek = () => {
  const [isHoliday, setHoliday] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const { menuItems } = useContext(UserContext);

  const getListWithItemNames = (items, category) => {
    return items.map((r) => {
      const item = menuItems.find((s) => s.id === r);
      return { id: item.id, name: item.name, category: category };
    });
  };

  const addMenuForTheDay = async (item) => {
    const breakfastList = getListWithItemNames(
      item[0].selectedBreakfastItems,
      1
    );
    const lunchList = getListWithItemNames(item[0].selectedLunchItems, 2);
    const snacksList = getListWithItemNames(item[0].selectedSnackItems, 3);
    const itemsForTheDay = [...breakfastList, ...lunchList, ...snacksList];
    const formattedDate = getFormattedDate(selectedDate);

    await addItemsForTheDay(formattedDate, itemsForTheDay);
  };
  return (
    <ScrollView
      style={{
        margin: 5,
      }}
    >
      <DateScroller
        selectedDateChanged={(item) => {
          setSelectedDate(item);
        }}
      ></DateScroller>
      {selectedDate != "" ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                margin: 30,
              }}
            >
              Holiday:
            </Text>
            <Switch
              value={false}
              value={isHoliday}
              onValueChange={() => {
                setHoliday(!isHoliday);
              }}
            />
          </View>
          {!isHoliday ? (
            <DailyMenuList
              refresh={selectedDate}
              onMenuListAdded={(item) => {
                addMenuForTheDay(item);
              }}
            />
          ) : null}
        </View>
      ) : (
        <View>
          <Text style={{ fontSize: 20 }}>Select a date</Text>
        </View>
      )}
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

export default MenuForTheWeek;
