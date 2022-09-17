import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import { CUTOFF_TIME } from "../../../assets/constants/constants";
import ItemCard from "../../components/users/ItemCard";
import ItemCardList from "../../components/users/ItemCardList";
import ItemsContext from "../../context/ItemsContext";
import UserContext from "../../context/UserContext";
import commonStyles from "../../styles/elementStyles";
import {
  getActiveOrdersForUser,
  getFormattedDate,
  getItemsForDay,
} from "../../utils/itemutils";
import { itemsAddedForUser } from "../../utils/utils";

function QuickBookScreen() {
  const today = new Date();

  const [date, setDateVal] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const { menuItems } = useContext(ItemsContext);
  const { user } = useContext(UserContext);
  const [id, setId] = useState("");

  const setData = async () => {
    const currentTime = new Date().toLocaleTimeString();
    const cutoffTime = CUTOFF_TIME;
    console.log("H" + date);
    const nextDay = currentTime < cutoffTime ? 1 : 2;
    const nextDate = new Date(
      new Date().setDate(new Date().getDate() + nextDay)
    ).toString();
    setDateVal(nextDate);

    console.log("hello" + date);
    const items = await getItemsForDay(nextDate, user.uid, menuItems);
    setId(items.id);
    setItemsList(items.itemList);
  };

  useEffect(() => {
    setData();
    getActiveOrdersForUser(new Date());
  }, []);

  const addItemsForUser = (items) => {
    const formattedDate = getFormattedDate(date);
    itemsAddedForUser(id, user, items, formattedDate);
  };

  return (
    <View style={{ marginBottom: 40 }}>
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
      <ScrollView nestedScrollEnabled={true}>
        <ItemCardList
          itemsList={itemsList}
          onItemsAddedForDay={(items) => {
            addItemsForUser(items);
          }}
        ></ItemCardList>
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
    marginBottom: 30,
  },
});

export default QuickBookScreen;
