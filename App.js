import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import navigator from "./src/navigation/Navigation";
import { LogBox } from "react-native";
import { UserProvider } from "./src/context/UserContext";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App = createAppContainer(navigator);

export default () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};
