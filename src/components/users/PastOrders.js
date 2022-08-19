import React, { useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Text, Button, Input, Icon } from "react-native-elements";
import { View } from "react-native";
import DateScroller from "../../components/users/DateScroller";
import commonStyles from "../../styles/elementStyles";
import ItemCardList from "../../components/users/ItemCardList";

const PastOrders = () => {
  const [date, setDate] = useState("");
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={{ marginTop: 30, marginLeft: 20 }}
    >
      <Text style={commonStyles.headerText}>Past Orders: </Text>
    </SafeAreaView>
  );
};

export default PastOrders;
