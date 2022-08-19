import { StyleSheet } from "react-native";

export const COLOURS = {
  oliveGreen: "#59981A",
};

const elementStyles = StyleSheet.create({
  //button Styles
  buttonView: {
    backgroundColor: COLOURS.oliveGreen,
    borderRadius: 22,
  },
  buttonTextStyle: {
    fontWeight: "600",
    fontSize: 20,
  },
  buttonContainerStyle: {
    // marginHorizontal: 150,
    height: 70,
    width: 150,
    marginVertical: 10,
  },

  pageAlign: {
    flex: 1,
    justifyContent: "center",
    margin: 50,
  },

  errorMsgStyle: { fontSize: 13, fontStyle: "italic" },
  //text
  textStyle: {
    fontSize: 20,
    color: "grey",
  },
  headerText: {
    fontSize: 22,
    color: "#59981A",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "400",
  },

  //icon
  iconStyle: {
    color: "#59981A",
    size: 20,
  },

  //viewPage
  viewStyle: {
    marginTop: 50,
    flex: 1,
  },
});

export default elementStyles;
