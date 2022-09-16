import React, { useContext, useState } from "react";
import { View, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import { register, validateUserEmail } from "../../../firebase";

import { validateSignUp, validateEmail } from "./validations";

import styles, { COLOURS } from "../../styles/elementStyles";
import UserContext from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personName, setPersonName] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    emailErrorMsg: "",
    mobileNoErrorMsg: "",
    passwordErrorMsg: "",
    confirmPasswordErrorMsg: "",
  });
  const [valid, setValid] = useState(false);
  const { login } = useContext(UserContext);
  const handleError = (input, errorMsg) => {
    setErrorMsg((prevState) => ({ ...prevState, [input]: errorMsg }));
  };

  const signUpUser = async () => {
    const userId = await register(email, password, personName, mobileNo);
    if (userId !== "") {
      login(userId, personName);
      const token = { id: userId, name: personName };

      try {
        await AsyncStorage.setItem("token", JSON.stringify(token));
      } catch (e) {
        console.log(e);
      }

      navigation.navigate("userFlow");
    }
  };
  const confirmPasswordValidation = () => {
    Keyboard.dismiss();

    if (password !== confirmPassword) {
      handleError("confirmPasswordErrorMsg", "Passwords do not match");
      setValid(false);
      setConfirmPassword("");
    } else {
      handleError("confirmPasswordErrorMsg", "");
      setValid(true);
    }
  };

  const emailValidation = async () => {
    Keyboard.dismiss();
    const result = validateEmail(email);

    if (!result) {
      handleError("emailErrorMsg", "Invalid E-mail id");
      setValid(false);
    } else {
      const result2 = await validateUserEmail(email);
      if (result2) {
        handleError("emailErrorMsg", "Email is already registered");
        setValid(false);
      } else {
        handleError("emailErrorMsg", "");
        setValid(true);
      }
    }
  };

  const mobileNoValidation = () => {
    Keyboard.dismiss();
    let reg = /^[6-9]\d{9}$/;
    if (reg.test(mobileNo) === false) {
      handleError("mobileNoErrorMsg", "Invalid Mobile Number");
      setValid(false);
    } else {
      handleError("mobileNoErrorMsg", "");
      setValid(true);
    }
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
  };

  return (
    <ScrollView style={{ margin: 25 }}>
      <KeyboardAvoidingView behavior="padding" style={{ marginTop: 30 }}>
        <Input
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          value={personName}
          onChangeText={setPersonName}
          inputContainerStyle={{ borderBottomColor: COLOURS.oliveGreen }}
          leftIcon={
            <Icon name="user" type="feather" color={styles.iconStyle.color} />
          }
        ></Input>
        <Input
          placeholder="Mobile Number"
          autoCapitalize="none"
          autoCorrect={false}
          value={mobileNo}
          onChangeText={setMobileNo}
          onBlur={mobileNoValidation}
          errorMessage={errorMsg.mobileNoErrorMsg}
          errorStyle={styles.errorMsgStyle}
          keyboardType="number-pad"
          inputContainerStyle={{ borderBottomColor: COLOURS.oliveGreen }}
          leftIcon={
            <Icon
              name="smartphone"
              type="feather"
              color={styles.iconStyle.color}
              size={24}
            />
          }
        ></Input>
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
          onBlur={emailValidation}
          errorMessage={errorMsg.emailErrorMsg}
          errorStyle={styles.errorMsgStyle}
          inputContainerStyle={{ borderBottomColor: COLOURS.oliveGreen }}
          leftIcon={
            <Icon name="mail" type="feather" color={styles.iconStyle.color} />
          }
        ></Input>
        <Input
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value={password}
          errorMessage={errorMsg.passwordErrorMsg}
          errorStyle={styles.errorMsgStyle}
          onChangeText={setPassword}
          onBlur={passwordValidation}
          inputContainerStyle={{ borderBottomColor: COLOURS.oliveGreen }}
          leftIcon={
            <Icon name="key" type="feather" color={styles.iconStyle.color} />
          }
        ></Input>
        <Input
          placeholder="Re-enter Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={confirmPasswordValidation}
          errorMessage={errorMsg.confirmPasswordErrorMsg}
          errorStyle={styles.errorMsgStyle}
          inputContainerStyle={{ borderBottomColor: COLOURS.oliveGreen }}
          leftIcon={
            <Icon name="key" type="feather" color={styles.iconStyle.color} />
          }
        ></Input>
        <Text>{valid}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Button
            title="Sign Up"
            buttonStyle={styles.buttonView}
            titleStyle={styles.buttonTextStyle}
            containerStyle={styles.buttonContainerStyle}
            disabled={
              !(
                validateSignUp(
                  email,
                  password,
                  mobileNo,
                  confirmPassword,
                  personName
                ) && valid
              )
            }
            onPress={() => {
              signUpUser();
            }}
          ></Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUpScreen;
