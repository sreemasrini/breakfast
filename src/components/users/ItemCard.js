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

const ItemCard = ({ item, orderCount }) => {
  const [count, setCount] = useState(orderCount);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.containerStyle}>
        <View>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text style={styles.detailsStyle}>{item.description}</Text>
        </View>

        <View style={styles.cartStyle}>
          <Icon
            name="minus"
            type="feather"
            color="white"
            onPress={() => {
              if (count > 0) setCount(count - 1);
            }}
          />
          <Text style={{ color: "white", fontSize: 20 }}>{count}</Text>
          <Icon
            name="plus"
            type="feather"
            color="white"
            onPress={() => {
              setCount(count + 1);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    margin: 5,
    marginLeft: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
  },
  detailsStyle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
    marginLeft: 15,
  },
  cartStyle: {
    height: 40,
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

export default ItemCard;
