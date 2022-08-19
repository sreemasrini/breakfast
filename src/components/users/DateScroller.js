import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DateScroller = ({ selectedDateChanged }) => {
  const [week, setWeek] = useState([]);
  useEffect(() => {
    const weekDays = getWeekDays();
    setWeek(weekDays);
  }, []);

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View
        style={{
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <FlatList
          horizontal
          key={(item) => {
            item.date;
          }}
          data={week}
          renderItem={({ item, index }) => {
            return (
              <View style={{ paddingHorizontal: 6 }}>
                <Text style={styles.weekDayText}>{item.dayOfWeek}</Text>
                <TouchableOpacity
                  style={[
                    styles.touchable,
                    {
                      backgroundColor:
                        index === selectedDateIndex ? "#81B622" : null,
                    },
                  ]}
                  onPress={() => {
                    selectedDateChanged(selectedDate);
                  }}
                  onPressIn={() => {
                    setSelectedDateIndex(index);
                    setSelectedDate(item.date.toDateString());
                  }}
                >
                  <Text
                    style={[
                      styles.label,
                      {
                        color: index === selectedDateIndex ? "white" : null,
                      },
                    ]}
                  >
                    {item.dateofWeek}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  weekDayText: {
    color: "white",
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: "#81B622",
    borderRadius: 10,
    color: "white",
    padding: 5,
    width: 43,
    textAlign: "center",
  },
  label: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  selectedLabel: {
    color: "white",
  },
  touchable: {
    padding: 3,
    borderRadius: 20,
    height: 35,
    width: 35,
  },
});

export const getWeekDays = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const final = [];

  for (let i = 0; i < 7; i++) {
    const today = new Date();
    const date = new Date(today.setDate(today.getDate() + i));
    const dateofWeek = date.getDate();
    const dayOfWeek = days[date.getDay()];

    final.push({ date, dateofWeek, dayOfWeek });
  }

  return final;
};

export default DateScroller;
