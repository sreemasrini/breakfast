import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Text, Button, Input, Icon } from "react-native-elements";
import { View } from "react-native";
import DateScroller from "../../components/users/DateScroller";
import commonStyles from "../../styles/elementStyles";
import ItemCardList from "../../components/users/ItemCardList";
import { FlatList, StyleSheet } from "react-native";
import ItemCard from "./ItemCard";
import OrderList from "../order-details/OrderList";
import {
  getActiveOrdersForUser,
  updateActiveOrder,
} from "../../utils/itemutils";
import UserContext from "../../context/UserContext";

const ActiveOrders = () => {
  const { user } = useContext(UserContext);

  const [currentOrders, setCurrentOrders] = useState([]);

  const getActiveOrders = async () => {
    const orders = await getActiveOrdersForUser(user.uid);
    setCurrentOrders(orders);
  };

  const updateOrder = async (oid, item, count) => {
    console.log(oid);
    const itemsForDay = currentOrders
      .filter((r) => r.oid === oid)
      .flatMap((r) => r.items);
    const selectedindex = itemsForDay.findIndex((r) => r.id === item);
    if (selectedindex !== -1) {
      const updatedItems = [...itemsForDay];

      updatedItems[selectedindex] = {
        ...updatedItems[selectedindex],
        qty: count,
      };
      await updateActiveOrder(oid, updatedItems);
    }
  };
  useEffect(() => {
    getActiveOrders();
  }, []);
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ marginLeft: 20 }}>
      {currentOrders.length > 0 ? (
        <View>
          <FlatList
            data={currentOrders}
            key={(item) => {
              item.date;
            }}
            renderItem={({ item, index }) => {
              let parent = item;
              return (
                <View>
                  <Text
                    style={[
                      { fontSize: 16, marginTop: 15, fontStyle: "italic" },
                    ]}
                  >
                    {item.date}
                  </Text>
                  <View>
                    <FlatList
                      data={item.items}
                      key={(item) => {
                        item.id;
                      }}
                      renderItem={({ item, index }) => {
                        return (
                          <View>
                            <ItemCard
                              item={item}
                              orderCount={item.qty}
                              onCountChanged={(count) => {
                                updateOrder(parent.oid, item.id, count);
                              }}
                            ></ItemCard>
                          </View>
                        );
                      }}
                    ></FlatList>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        </View>
      ) : (
        <Text style={{ marginTop: 40, fontSize: 22 }}>
          There are no active orders
        </Text>
      )}
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
