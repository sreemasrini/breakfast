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

const ItemCard = ({ item, orderCount, onCountChanged }) => {
  const [count, setCount] = useState(orderCount);
  useEffect(() => {
    setCount(orderCount);
    console.log(count);
  }, [item]);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.containerStyle}>
        <View>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text style={styles.detailsStyle}>{item.desc}</Text>
        </View>

        <View style={styles.cartStyle}>
          <Icon
            name="minus"
            type="feather"
            color="white"
            onPress={() => {
              if (count > 0) {
                const itemReduced = count - 1;
                setCount(itemReduced);
                onCountChanged(itemReduced);
              }
            }}
          />
          <Text style={{ color: "white", fontSize: 18 }}>{count}</Text>
          <Icon
            name="plus"
            type="feather"
            color="white"
            onPress={() => {
              const itemAdded = count + 1;
              setCount(itemAdded);
              onCountChanged(itemAdded);
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
    margin: 2,
    marginLeft: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 18,
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
    height: 30,
    width: 110,
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
