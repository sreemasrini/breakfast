import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { CATEGORYLIST } from "../../../assets/constants/constants";
import ItemsContext from "../../context/ItemsContext";
import {
  getFormattedDate,
  getItemsForDay,
  getTotalOrderListForTheDay,
} from "../../utils/itemutils";
import { getMenuForTheDay } from "../../utils/utils";
import ItemCard from "../users/ItemCard";

export const OrderList = () => {
  const [nextDay, setNextDay] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const { menuItems } = useContext(ItemsContext);

  const getTotalOrdersForTheDay = async () => {
    const nextday = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toDateString();
    setNextDay(nextday);

    const orderList = await getTotalOrderListForTheDay(nextday);
    const menuForDay = await getMenuForTheDay(
      getFormattedDate(nextday),
      menuItems
    );
    const itemsList = orderList.flatMap((r) => r.items);
    const totalItemsForTheDay = getItemsForDay(menuForDay, itemsList);
    setTotalItems(totalItemsForTheDay);
    console.log(totalItemsForTheDay);
  };

  const getItemsForDay = (menuForDay, itemsList) => {
    console.log(menuForDay);
    console.log(itemsList);
    const totalItemsForTheDay = menuForDay.map((r) => {
      const qty = itemsList
        .filter((m) => m.id == r.id)
        .map((n) => n.qty)
        .reduce((a, b) => a + b, 0);

      return { ...r, qty: qty };
    });
    return totalItemsForTheDay;
  };
  useEffect(() => {
    getTotalOrdersForTheDay();
  }, []);
  return (
    <View>
      <Text style={{ fontSize: 22 }}>Total orders for {nextDay}</Text>
      <View style={{ margin: 15 }}>
        <FlatList
          key={(item) => {
            item.id;
          }}
          data={totalItems}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "stretch",

                  justifyContent: "space-evenly",
                }}
              >
                <Text style={styles.titleStyle}>
                  {CATEGORYLIST.filter((r) => r.id == item.category).map(
                    (r) => r.name
                  )}
                </Text>
                <Text style={styles.titleStyle}>{item.name}</Text>
                <Text style={styles.titleStyle}>{item.qty}</Text>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    margin: 5,
  },
});
