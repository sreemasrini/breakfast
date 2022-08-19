import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemCard from "./ItemCard";
import { getMenuForTheDay } from "../../utils/utils";
import commonStyles from "../../styles/elementStyles";

const ItemCardList = ({ selectedDate }) => {
  const [menuForTheDay, setMenuForTheDay] = useState([]);

  useEffect(() => {
    const menuList = getMenuForTheDay(selectedDate);

    // const menuforSelectedDate = getMenu();
    setMenuForTheDay(menuList);
  }, [selectedDate]);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.containerStyle}>
        {menuForTheDay.length > 0 ? (
          <FlatList
            key={(item) => {
              item.id;
            }}
            data={menuForTheDay}
            renderItem={({ item }) => {
              return (
                <View>
                  <ItemCard item={item} orderCount={1}></ItemCard>
                </View>
              );
            }}
          ></FlatList>
        ) : (
          <Text style={commonStyles.headerText}>No items for the day</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "space-around",
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
    height: 20,
    width: 45,
    color: "#81B622",
    borderRadius: "20",
  },
});

export default ItemCardList;
