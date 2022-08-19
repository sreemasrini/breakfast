import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

import { SafeAreaView } from "react-navigation";
import randomImages from "../../assets/images/";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Math.floor(Dimensions.get("window").height) / 3;

const ShowImage = () => {
  const randomImage =
    randomImages[Math.floor(Math.random() * randomImages.length)];
  return (
    <SafeAreaView style={{ width: deviceWidth, height: deviceHeight }}>
      <Image
        source={randomImage}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      ></Image>
    </SafeAreaView>
  );
};

export default ShowImage;
