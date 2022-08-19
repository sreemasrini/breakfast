import React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import { Text, Tile } from "react-native-elements";

const UserMainPage = ({ navigation }) => {
  return (
    <View style={styles.viewheader}>
      <View style={styles.welcomeStyle}>
        <Text style={styles.textStyleHeader}>Welcome Sriram,</Text>
      </View>

      <View style={styles.contentStyle}>
        <View style={styles.quoteStyle}>
          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontStyle: "italic",
              margin: 20,
            }}
          >
            One cannot think well, love well, sleep well, if one has not dined
            well.
          </Text>
        </View>
        <View style={styles.quickOrderStyle}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfilePage");
            }}
          >
            <Text style={styles.textStyle}>Quick Order</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsStyle}>
          <View style={styles.tilesDetailStyle}>
            <TouchableOpacity
              style={[styles.tileStyle, { backgroundColor: "#69B6D9" }]}
            >
              <Text style={styles.textStyle}>PreOrder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tileStyle, { backgroundColor: "#00B7AF" }]}
            >
              <Text style={styles.textStyle}>Order History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewheader: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 25,
    // backgroundColor: "#F9EAC2",
  },
  welcomeStyle: {
    flex: 2,
    // backgroundColor: "#CDDB62",
    borderRadius: 14,
  },
  contentStyle: {
    flex: 9,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between",
    marginHorizontal: 15,
  },
  quoteStyle: {
    flex: 3,
    marginVertical: 25,
    alignItems: "center",
    backgroundColor: "#BD7DA5",
    justifyContent: "center",
    borderRadius: 33,
  },

  detailsStyle: {
    flex: 4,
  },
  tilesDetailStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  tileStyle: {
    backgroundColor: "#44455B",
    height: 180,
    width: 180,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    fontFamily: "Roboto",
  },
  textStyle: { fontSize: 24, color: "white" },
  textStyleHeader: {
    fontSize: 28,
    fontStyle: "normal",
    marginTop: 33,
    margin: 20,
    fontWeight: "bold",

    color: "#59981A",
  },
});
export default UserMainPage;
