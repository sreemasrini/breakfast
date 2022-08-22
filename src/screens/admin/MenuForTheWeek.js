import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import styles from "../../styles/elementStyles";
import MenuPicker from "../../components/common/MenuPicker";

const MenuForTheWeek = () => {
  const [week, setWeek] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const weekDays = getDaysInTheWeek();

    const newValue = weekDays.map((r) => ({
      dayOfWeek: r,
      menuItem: "",
    }));

    setWeek(newValue);
    console.log("new");
    console.log(week);
  }, []);
  return (
    <View style={styles.pageAlign}>
      <Text>Menu for the week</Text>
      {week.map((r, index) => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "stretch",
            }}
          >
            <Text>{r.dayOfWeek.toDateString()}</Text>
            <MenuPicker
              onSelectedItemChange={(selectedItem) => {
                setWeek((week.dayOfWeek[index] = selectedItem));
              }}
            ></MenuPicker>
          </View>
        );
      })}

      <Text>{selectedItem}</Text>
    </View>
  );
};
const getDaysInTheWeek = () => {
  let week = [];
  //   const m = new Date();
  //   m.setDate(m.getDate() + 7);
  const curr = new Date();

  let diff = curr.getDay();

  if (curr.getDay() === 6 || curr.getDay() === 7) {
    diff = 7 - curr.getDay() - 2;
  }

  for (let i = 1; i <= 5; i++) {
    const today = new Date(curr);

    let day = new Date(today.setDate(today.getDate() - diff + i));

    week.push(day);
  }

  return week;
};

export default MenuForTheWeek;
