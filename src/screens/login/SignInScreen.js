import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";

import styles from "../../styles/elementStyles";
import { auth, validateUserEmail, userLogIn } from "../../../firebase";

import { validateEmail } from "./validations";
import UserContext from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    emailErrorMsg: "",
    passwordErrorMsg: "",
    commonErrorMsg: "",
  });
  const { login } = useContext(UserContext);
  const [formValid, setValid] = useState(true);

  const handleError = (input, error) => {
    setErrorMsg((errorMsg) => ({ ...errorMsg, [input]: error }));
  };

  const emailValidation = async () => {
    Keyboard.dismiss();
    const result = validateEmail(email);
    if (!result) {
      handleError("emailErrorMsg", "Invalid E-mail id");
      setValid(false);
    } else {
      const result2 = await validateUserEmail(email);
      if (!result2) {
        handleError("emailErrorMsg", "Email is not registered");
        setValid(false);
      } else {
        handleError("emailErrorMsg", "");
        setValid(true);
        // console.log("inside if");
        // console.log(formValid);
      }
    }
    // console.log("email");
    // console.log(formValid);
  };
  const passwordValidation = () => {
    Keyboard.dismiss();

    if (password.length < 6) {
      handleError("passwordErrorMsg", "Min Length 6 characters");
      setValid(false);
    } else {
      handleError("passwordErrorMsg", "");
      setValid(true);
    }
    // console.log("password");
    // console.log(formValid);
  };

  const signInUser = async () => {
    setValid(true);

    await emailValidation();
    passwordValidation();

    const userDetails = await userLogIn(email, password);
    if (userDetails !== null) {
      login(userDetails.uid, userDetails.name);
      const token = { id: userDetails.uid, name: userDetails.name };
      try {
        await AsyncStorage.setItem("token", JSON.stringify(token));
      } catch (e) {
        console.log(e);
      }

      navigation.navigate("userFlow");
    } else {
      setValid(false);
      setPassword("");
    }
  };
  return (
    <View style={[styles.pageAlign, { marginBottom: 50 }]}>
      <Input
        placeholder="E-Mail"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        errorMessage={errorMsg.emailErrorMsg}
        errorStyle={styles.errorMsgStyle}
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
        errorMessage={errorMsg.passwordErrorMsg}
        errorStyle={styles.errorMsgStyle}
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
          disabled={email === "" || password === ""}
          onPress={() => {
            signInUser();
            //  navigation.navigate("userFlow");
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
