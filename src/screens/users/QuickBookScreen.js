import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import ItemCard from "../../components/users/ItemCard";
import commonStyles from "../../styles/elementStyles";
import { getMenuForTheDay } from "../../utils/utils";

function QuickBookScreen() {
  const today = new Date();
  const nextDay = new Date(today.setDate(today.getDate() + 1)).toString();
  const [date, setDate] = useState(nextDay);
  const [menuForTheDay, setMenuForTheDay] = useState(getMenuForTheDay(date));

  useEffect(() => {
    const menuList = getMenuForTheDay(date);
    console.log(menuList);
    setMenuForTheDay(menuList);
  }, []);
  return (
    <View>
      <Text
        style={{
          color: commonStyles.headerText.color,
          fontWeight: "500",
          fontSize: 22,
          marginLeft: 10,
        }}
      >
        Book for {new Date(date).toDateString()}
      </Text>
      <ScrollView>
        {menuForTheDay.map((item, index) => {
          return <ItemCard item={item}></ItemCard>;
        })}
      </ScrollView>
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default QuickBookScreen;
