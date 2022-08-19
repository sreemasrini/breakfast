import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { Icon } from "react-native-elements";

import commonStyles from "../../styles/elementStyles";

const OrderList = ({ orders }) => {
  const [count, setCount] = useState(1);
  console.log(orders);
  return (
    <View>
      {orders.length > 0 ? (
        <FlatList
          key={(item) => {
            item.id;
          }}
          data={orders}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={[{ fontSize: 16 }]}>{item.name}</Text>
                <View style={styles.cartStyle}>
                  <Icon
                    name="minus"
                    type="feather"
                    color="white"
                    size={16}
                    onPress={() => {
                      if (count > 0) setCount(count - 1);
                    }}
                  />
                  <Text style={{ color: "white", fontSize: 15 }}>{count}</Text>
                  <Icon
                    name="plus"
                    type="feather"
                    color="white"
                    size={16}
                    onPress={() => {
                      setCount(count + 1);
                    }}
                  />
                </View>
              </View>
            );
          }}
        ></FlatList>
      ) : (
        <Text style={commonStyles.headerText}>No active Orders</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 400,
    color: "black",
  },
  detailsStyle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
  },
  cartStyle: {
    height: 25,
    width: 80,
    backgroundColor: "#81B622",
    borderRadius: 20,
    margin: 4,
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default OrderList;
