import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import SignInScreen from "../screens/login/SignInScreen";
import SignUpScreen from "../screens/login/SignUpScreen";
import ForgotPasswordScreen from "../screens/login/ForgotPasswordScreen";
import UserMainPage from "../screens/users/UserMainPage";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import ProfileScreen from "../screens/users/ProfileScreen";
import OrderDetails from "../screens/users/OrderDetails";
import OrderScreen from "../screens/users/OrderScreen";
import AccountDetailsScreen from "../screens/users/AccountDetailsScreen";
import QuickBookScreen from "../screens/users/QuickBookScreen";
import ActiveOrders from "../components/users/ActiveOrders";
import PastOrders from "../components/users/PastOrders";
import AdminScreen from "../screens/admin/AdminScreen";
import { COLOURS } from "../styles/elementStyles";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import MenuForTheWeek from "../screens/admin/MenuForTheWeek";
import SplashScreen from "../screens/SplashScreen";
import MenuItems from "../screens/admin/MenuItems";

const OrderBook = createMaterialTopTabNavigator(
  {
    ActiveOrders: {
      screen: ActiveOrders,
    },

    PastOrders: {
      screen: PastOrders,
    },
  },
  {
    initialRouteName: "ActiveOrders",
    activeColor: "#59981A",
    inactiveColor: "black",
    tabStyle: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 0,
      paddingBottom: 2,
      backgroundColor: "red",
      inactiveBackgroundColor: "#353539",
      activeBackgroundColor: "#353539",
    },
    barStyle: {},
    indicatorStyle: {
      backgroundColor: "white",
      height: 22,
    },
  }
);

const ProfileDetails = createStackNavigator({
  ProfileScreen: ProfileScreen,
  OrderDetails: OrderBook,
  AccountDetails: AccountDetailsScreen,
});

const navigator = createSwitchNavigator({
  adminFlow: createStackNavigator({
    AdminScreen: { screen: AdminScreen, navigationOptions: { title: "" } },
    MenuForTheWeek: {
      screen: MenuForTheWeek,
      navigationOptions: {
        title: "Menu for the week",
      },
    },
    MenuItems: {
      screen: MenuItems,
      navigationOptions: {
        title: "Menu Item",
      },
    },
  }),
  SplashScreen: SplashScreen,
  loginFlow: createStackNavigator(
    {
      SignIn: { screen: SignInScreen, navigationOptions: { title: "" } },
      SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
          title: "Sign Up",

          color: COLOURS.oliveGreen,
          backgroundColor: COLOURS.oliveGreen,
        },
      },
      ForgotPassword: ForgotPasswordScreen,
    },
    {
      defaultNavigationOptions: {
        headerTitleStyle: {
          color: COLOURS.oliveGreen,
          fontSize: 22,
          fontWeight: "400",
        },
      },
    }
  ),
  userFlow: createMaterialBottomTabNavigator(
    {
      Orders: {
        screen: OrderScreen,
        navigationOptions: {
          tabBarIcon: (tabInfo) => (
            <Icon
              name="shopping-bag"
              type="feather"
              color={tabInfo.tintColor}
            />
          ),
        },
      },
      Home: {
        screen: UserMainPage,
        navigationOptions: {
          tabBarIcon: (tabInfo) => (
            <Icon name="home" type="feather" color={tabInfo.tintColor} />
          ),
        },
      },
      Profile: {
        screen: ProfileDetails,
        navigationOptions: {
          tabBarIcon: (tabInfo) => (
            <Icon name="user" type="feather" color={tabInfo.tintColor} />
          ),
        },
      },
    },

    {
      initialRouteName: "Home",
      activeColor: "#59981A",
      inactiveColor: "black",
      barStyle: { backgroundColor: "#ECF87F" },
    }
  ),
});

export default navigator;
