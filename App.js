import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import navigator from "./src/navigation/Navigation";
import { LogBox } from "react-native";
import { UserProvider } from "./src/context/UserContext";
import { ItemsProvider } from "./src/context/ItemsContext";
LogBox.ignoreLogs([
  "EventEmitter.removeListener",
  "VirtualizedLists should never be nested",
]);

const App = createAppContainer(navigator);

export default () => {
  return (
    <UserProvider>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </UserProvider>
  );
};
