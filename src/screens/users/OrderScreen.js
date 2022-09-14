import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Text, Button, Input, Icon } from "react-native-elements";
import { View } from "react-native";
import DateScroller from "../../components/users/DateScroller";
import commonStyles from "../../styles/elementStyles";
import ItemCardList from "../../components/users/ItemCardList";
import UserContext from "../../context/UserContext";
import {
  itemsAddedForUser,
  getItemsOrderedByUserForTheDay,
} from "../../utils/utils";

const OrderScreen = () => {
  const [date, setDate] = useState("");
  const { user } = useContext(UserContext);

  const addItemsForUser = (items) => {
    console.log("UserDetails");
    const formattedDate =
      new Date(date).getDate() + "-" + (new Date(date).getMonth() + 1);
    console.log(formattedDate);
    //console.log(items);
    itemsAddedForUser(user, items, formattedDate);
  };
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={{ marginTop: 30, marginLeft: 20 }}
    >
      <Text style={commonStyles.headerText}>Place your Order: </Text>
      <DateScroller
        selectedDateChanged={(date) => {
          setDate(date);
        }}
      />
      {date === "" ? (
        <View>
          <Text style={{ fontSize: 20 }}>Select a date</Text>
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          <ItemCardList
            selectedDate={date}
            onItemsAddedForDay={(items) => {
              addItemsForUser(items);
              // getItemsOrderedByUserForTheDay();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;
