import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import navigator from "./src/navigation/Navigation";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default createAppContainer(navigator);
