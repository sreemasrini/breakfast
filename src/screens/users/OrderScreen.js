import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-navigation";
import { Text, Button, Input, Icon } from "react-native-elements";
import { View } from "react-native";
import DateScroller from "../../components/users/DateScroller";
import commonStyles from "../../styles/elementStyles";
import ItemCardList from "../../components/users/ItemCardList";
import UserContext from "../../context/UserContext";
import ItemsContext from "../../context/ItemsContext";
import {
  itemsAddedForUser,
  getItemsOrderedByUserForTheDay,
  getMenuForTheDay,
} from "../../utils/utils";
import { getItemsForDay, getFormattedDate } from "../../utils/itemutils";
import { CUTOFF_TIME } from "../../../assets/constants/constants";

const OrderScreen = () => {
  const [date, setDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [id, setId] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const { user } = useContext(UserContext);
  const { menuItems, setMenuListForTheDay, itemsForTheDay } =
    useContext(ItemsContext);

  const getItemsForDate = async (date1) => {
    const items = await getItemsForDay(date1, user.uid, menuItems);
    setId(items.id);
    setItemsList(items.itemList);
  };

  const addItemsForUser = (items) => {
    const formattedDate = getFormattedDate(date);

    itemsAddedForUser(id, user, items, formattedDate);
  };

  const validateDate = (selectedDate) => {
    const today = new Date();
    const nextday = new Date(
      today.setDate(today.getDate() + 1)
    ).toLocaleDateString();
    const todaysdate = new Date().toLocaleDateString();
    const selectedDateString = new Date(selectedDate).toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const cutoffTime = CUTOFF_TIME;

    if (selectedDateString < todaysdate) {
      setErrorMsg("You cannot eat for yesterday");
      // return false;
    }
    console.log(currentTime > cutoffTime);
    if (
      selectedDateString === todaysdate ||
      (selectedDateString === nextday && currentTime > cutoffTime)
    ) {
      setErrorMsg("Booking closed");
      // return false;
    }
    // return true;
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
          setErrorMsg("");
          validateDate(date);
          getItemsForDate(date);
        }}
      />
      {date === "" ? (
        <View>
          <Text style={{ fontSize: 20 }}>Select a date</Text>
        </View>
      ) : (
        <View>
          {errorMsg !== "" ? (
            <View>
              <ItemCardList
                selectedDate={date}
                itemsList={itemsList}
                onItemsAddedForDay={(items) => {
                  addItemsForUser(items);
                  //getItemsOrderedByUserForTheDay();
                }}
              />
            </View>
          ) : (
            <View style={{ margin: 30 }}>
              <Text style={{ fontSize: 24 }}>{errorMsg}</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;
