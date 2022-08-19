import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";

import styles from "../../styles/elementStyles";

const ForgotPasswordScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const errorMsg =
    password !== newPassword ? <Text>Password not same</Text> : null;

  return (
    <View style={[{ margin: 20, justifyContent: "space-between" }]}>
      <Text style={styles.headerText}>Reset Password</Text>
      <Input
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        value={userName}
        onChangeText={setUserName}
        leftIcon={
          <Icon name="user" type="feather" color={styles.iconStyle.color} />
        }
      ></Input>

      <Input
        placeholder="Reset Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        leftIcon={
          <Icon name="key" type="feather" color={styles.iconStyle.color} />
        }
      ></Input>
      <Input
        placeholder="Re-enter Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        leftIcon={
          <Icon name="key" type="feather" color={styles.iconStyle.color} />
        }
      ></Input>
      {errorMsg}
      <View style={{ alignItems: "flex-end" }}>
        <Button
          title="Reset Password"
          buttonStyle={[styles.buttonView, { width: 200 }]}
          titleStyle={styles.buttonTextStyle}
          containerStyle={[styles.buttonContainerStyle, { width: 200 }]}
        ></Button>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
