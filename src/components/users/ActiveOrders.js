import React, { useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Text, Button, Input, Icon } from "react-native-elements";
import { View } from "react-native";
import DateScroller from "../../components/users/DateScroller";
import commonStyles from "../../styles/elementStyles";
import ItemCardList from "../../components/users/ItemCardList";
import { FlatList, StyleSheet } from "react-native";
import ItemCard from "./ItemCard";
import OrderList from "../order-details/OrderList";

const ActiveOrders = () => {
  const [date, setDate] = useState("");

  const [currentOrders, setCurrentOrders] = useState([
    {
      date: "22-8-2022",
      items: [
        { id: 1, name: "idly", count: 3 },
        { id: 2, name: "dosa", count: 2 },
      ],
    },

    {
      date: "24-08-2022",
      items: [
        { id: 1, name: "idly", count: 3 },
        { id: 2, name: "dosa", count: 2 },
      ],
    },
    {
      date: "24-08-2022",
      items: [
        { id: 1, name: "idly", count: 3 },
        { id: 2, name: "dosa", count: 2 },
      ],
    },
    {
      date: "25-08-2022",
      items: [
        { id: 1, name: "idly", count: 3 },
        { id: 2, name: "dosa", count: 2 },
      ],
    },
    {
      date: "25-08-2022",
      items: [
        { id: 1, name: "idly", count: 3 },
        { id: 2, name: "dosa", count: 2 },
      ],
    },
    {
      date: "24-08-2022",
      items: [
        { id: 1, name: "idly", count: 3 },
        { id: 2, name: "dosa", count: 2 },
      ],
    },
    {
      date: "25-08-2022",
      items: [
        { id: 1, name: "idly", count: 3 },
        { id: 2, name: "dosa", count: 2 },
      ],
    },
  ]);
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ marginLeft: 20 }}>
      <View>
        <FlatList
          data={currentOrders}
          key={(item) => {
            item.date;
          }}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Text
                  style={[{ fontSize: 16, marginTop: 15, fontStyle: "italic" }]}
                >
                  {item.date}
                </Text>
                <OrderList orders={item.items}></OrderList>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartStyle: {
    height: 1,
    width: 130,
    backgroundColor: "#81B622",
    borderRadius: 20,
    margin: 15,
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default ActiveOrders;
