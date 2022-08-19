import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";

import styles from "../../styles/elementStyles";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignInScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const register = async (email, password) => {
    console.log(email);
    console.log(password);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <View style={[styles.pageAlign, { marginBottom: 50 }]}>
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
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        leftIcon={
          <Icon name="key" type="feather" color={styles.iconStyle.color} />
        }
      ></Input>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={[styles.textStyle, { color: "#59981A", fontSize: 14 }]}>
            Forgot Password
          </Text>
        </TouchableOpacity>

        <Button
          title="Login"
          buttonStyle={styles.buttonView}
          titleStyle={styles.buttonTextStyle}
          containerStyle={styles.buttonContainerStyle}
          onPress={() => {
            register(userName, password);
          }}
        ></Button>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.textStyle}>Don't have an account. </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text
            style={[
              styles.textStyle,
              { color: "#59981A", fontSize: 20, fontWeight: "bold" },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

// <Button
// title="Forgot Password"
// onPress={() => navigation.navigate("ForgotPassword")}
// ></Button>
// <Text>Dont have an account</Text>

// <Button
// title="Signup"
// onPress={() => navigation.navigate("SignUp")}
// ></Button>
