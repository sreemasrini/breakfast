import React, { useContext, useState } from "react";
import { Pressable } from "react-native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import ShowImage from "../../components/ShowImage";
import UserContext from "../../context/UserContext";

const ProfileScreen = ({ navigation }) => {
  const { logout } = useContext(UserContext);
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={ProfileScreenStyles.container}
    >
      <ShowImage></ShowImage>

      <Pressable
        onPress={() => {
          navigation.navigate("AccountDetails");
        }}
      >
        <Text style={ProfileScreenStyles.itemStyle}> Account Details</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("OrderDetails");
        }}
      >
        <Text style={ProfileScreenStyles.itemStyle}> View Orders</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          logout();
        }}
      >
        <Text style={ProfileScreenStyles.itemStyle}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    fontSize: 22,
    margin: 15,
    marginLeft: 20,
    color: "#59981A",
    fontWeight: "400",
  },
});

export default ProfileScreen;
