import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import commonStyles, { COLOURS } from "../../styles/elementStyles";
//import MenuPicker from "../../components/common/MenuPicker";
import UserContext from "../../context/UserContext";

const MenuForTheWeek = () => {
  const [menuForWeek, setMenuForWeek] = useState([]);

  const { menuItems } = useContext(UserContext);
  const [menu, setMenu] = useState([{ id: "", name: "" }]);

  useEffect(() => {
    const weekDays = getDaysInTheWeek();

    const newValue = weekDays.map((r) => ({
      dayOfWeek: r,
      itemId: "",
    }));

    setMenuForWeek(newValue);

    let list = [];
    list.push({ id: "NA", name: "Holiday" });
    menuItems.map((r) => {
      list.push({ id: r.id, name: r.name });
    });

    setMenu(list);
  }, []);

  const addMenu = async () => {
    const result = await addMenuForTheWeek(menu);
    console.log("Menu Added");
  };
  return (
    <View style={{}}>
      <Text style={commonStyles.headerText}>Menu for the week</Text>
      {menuForWeek.map((r, index) => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 7,

              justifyContent: "space-around",
            }}
            key={index}
          >
            <Text style={{ fontSize: 18, margin: 7 }}>
              {r.dayOfWeek.toDateString()}
            </Text>

            <View style={{ width: 190 }}>
              <MenuPicker
                menuList={menu}
                onItemSelected={(selected) => {
                  const newArray = [...menuForWeek];
                  newArray[index].itemId = selected;
                  setMenuForWeek(newArray);
                }}
              ></MenuPicker>
            </View>
          </View>
        );
      })}
      <View style={{ margin: 20, marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => {
            // addMenuForTheWeek();
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
            Add Menu
          </Text>
        </TouchableOpacity>
      </View>
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
