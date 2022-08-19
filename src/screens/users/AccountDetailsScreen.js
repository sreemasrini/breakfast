import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";

import styles from "../../styles/elementStyles";

const AccountDetailsScreen = () => {
  return (
    <View style={styles1.container}>
      <Text>Account Details</Text>
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
