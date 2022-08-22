import React, { useContext, useState } from "react";

import { SafeAreaView } from "react-navigation";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import ShowImage from "../../components/ShowImage";
import commonStyles from "../../styles/elementStyles";
import foodTips from "../../../assets/foodTips";

import { BottomSheet } from "react-native-elements";
import QuickBookScreen from "./QuickBookScreen";
import { Icon } from "react-native-elements/dist/icons/Icon";
import UserContext from "../../context/UserContext";

const UserMainPage = ({ navigation }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { user } = useContext(UserContext);
  const foodTip = foodTips[Math.floor(Math.random() * foodTips.length)];
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={commonStyles.viewStyle}>
      <ShowImage></ShowImage>
      <Text style={commonStyles.headerText}>Hi {user.userName},</Text>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.quoteStyle}>{foodTip}</Text>
        <Button
          title="Quick Book"
          containerStyle={commonStyles.buttonContainerStyle}
          titleStyle={{ fontSize: 20 }}
          buttonStyle={{ backgroundColor: "#81B622", borderRadius: 22 }}
          onPress={() => {
            setBottomSheetVisible(true);
          }}
        ></Button>

        <BottomSheet
          isVisible={bottomSheetVisible}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          <View
            style={{
              height: 300,
              backgroundColor: "#ECF87F",
              borderTopLeftRadius: 60,
              borderTopRightRadius: 60,
              padding: 10,
              margin: 2,
            }}
          >
            <View style={{ alignItems: "flex-end", paddingRight: 30 }}>
              <Icon
                name="x"
                type="feather"
                onPress={() => {
                  setBottomSheetVisible(false);
                }}
              ></Icon>
            </View>
            <QuickBookScreen></QuickBookScreen>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quoteStyle: {
    margin: 20,
    borderColor: "#BD7DA5",
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    fontSize: 18,
    fontStyle: "italic",
    color: "#BD7DA5",
    fontWeight: "900",
    lineHeight: 25,
  },
  quickOrderStyle: {
    borderRadius: 33,
  },
});

export default UserMainPage;
