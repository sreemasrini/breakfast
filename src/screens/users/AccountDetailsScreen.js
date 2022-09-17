import React, { useContext, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import UserContext from "../../context/UserContext";

import styles from "../../styles/elementStyles";

const AccountDetailsScreen = () => {
  const { user } = useContext(UserContext);
  return (
    <View style={styles1.container}>
      <Text style={styles.headerText}>Name: {user.userName}</Text>
      <Text style={styles.headerText}>Phone Number: </Text>
      <Text style={styles.headerText}>E-Mail Id</Text>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountDetailsScreen;
