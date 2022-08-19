import React, { useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Text, Button, Input, Icon } from "react-native-elements";
import { View } from "react-native";
import DateScroller from "../../components/users/DateScroller";
import commonStyles from "../../styles/elementStyles";
import ItemCardList from "../../components/users/ItemCardList";

const OrderScreen = () => {
  const [date, setDate] = useState(new Date().toString());
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
      <View style={{ marginTop: 30 }}>
        <ItemCardList selectedDate={date}></ItemCardList>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;
