import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemCard from "./ItemCard";
import {
  getMenuForTheDay,
  getItemsOrderedByUserForTheDay,
} from "../../utils/utils";
import commonStyles, { COLOURS } from "../../styles/elementStyles";
import UserContext from "../../context/UserContext";

const ItemCardList = ({ selectedDate, onItemsAddedForDay }) => {
  const [menuList, setMenuList] = useState([]);
  const [breakfastList, setBreakfastList] = useState([]);
  const [lunchList, setLunchList] = useState([]);

  const [snacksList, setSnacksList] = useState([]);
  //const [isHoliday, setIsHoliday] = useState(false);
  const { menuItems } = useContext(UserContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cancelledItems, setCancelledItems] = useState([]);
  const setData = async () => {
    console.log(selectedDate);
    const itemsForDay = await getMenuForTheDay(selectedDate, menuItems);
    return itemsForDay;
  };

  const setAlreadyOrderedItems = async () => {
    const itemsOrdered = await getItemsOrderedByUserForTheDay();
    console.log(itemsOrdered);
    if (!itemsOrdered.empty) {
      itemsOrdered.forEach((r) => {
        const item = menuList.findIndex((n) => n.id === r.id);
        if (item !== -1) {
          const tempArray = [...menuList];
          tempArray[item] = {
            ...tempArray[item],
            qty: r.qty,
          };
          setMenuList(tempArray);
          setSelectedItems([...selectedItems, { r }]);
        } else {
          setCancelledItems([...cancelledItems, { r }]);
        }
      });
    }
  };

  const addItem = (item, count, category) => {
    const selectedItemIndex = selectedItems.findIndex((r) => r.id === item.id);
    if (selectedItemIndex !== -1) {
      const tempArray = [...selectedItems];
      if (count === 0) {
        tempArray.splice(selectedItemIndex, 1);
      } else {
        tempArray[selectedItemIndex] = {
          ...tempArray[selectedItemIndex],
          qty: count,
        };
      }
      setSelectedItems(tempArray);
    } else {
      setSelectedItems([
        ...selectedItems,
        { id: item.id, name: item.name, category: category, qty: count },
      ]);
    }
  };
  const dummy = async () => {
    const items = await setData();
    console.log("menuList");
    console.log(items);
    setMenuList(items);
  };

  useEffect(() => {
    setSelectedItems([]);
    //setMenuList([]);
    dummy();
    // setMenuList(menu);
    console.log("dumm");
    console.log(menuList);
    //setAlreadyOrderedItems();
    // splitData();
  }, [selectedDate]);

  const splitData = () => {
    setBreakfastList(getListbyCategory(1));
    setLunchList(getListbyCategory(2));
    setSnacksList(getListbyCategory(3));
    //  console.log(breakfastList);
  };
  const getListbyCategory = (category) => {
    // console.log("Hello");
    // console.log(menuList[0]);
    return menuList.filter((r) => r.category == category);
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.containerStyle}>
        {menuList.length > 0 ? (
          <View>
            <Text style={{ fontSize: 26, fontStyle: "italic" }}>
              Bring your own food or stay hungry!!!
            </Text>
          </View>
        ) : (
          <View>
            <View>
              <View>
                {breakfastList.length > 0 ? (
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Breakfast
                    </Text>
                    <FlatList
                      key={(item) => {
                        item.id;
                      }}
                      data={breakfastList}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <ItemCard
                              item={item}
                              orderCount={0}
                              onCountChanged={(count) => {
                                addItem(item, count, 1);
                              }}
                            ></ItemCard>
                          </View>
                        );
                      }}
                    ></FlatList>
                  </View>
                ) : null}
              </View>
              <View>
                {lunchList.length > 0 ? (
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Lunch
                    </Text>
                    <FlatList
                      key={(item) => {
                        item.id;
                      }}
                      data={lunchList}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <ItemCard
                              item={item}
                              orderCount={0}
                              onCountChanged={(count) => {
                                addItem(item, count, 2);
                              }}
                            ></ItemCard>
                          </View>
                        );
                      }}
                    ></FlatList>
                  </View>
                ) : null}
              </View>
              <View>
                {snacksList.length > 0 ? (
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Snacks
                    </Text>
                    <FlatList
                      key={(item) => {
                        item.id;
                      }}
                      data={snacksList}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <ItemCard
                              item={item}
                              orderCount={0}
                              onCountChanged={(count) => {
                                addItem(item, count, 3);
                              }}
                            ></ItemCard>
                          </View>
                        );
                      }}
                    ></FlatList>
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                margin: 30,

                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  console.log("selectedItems");
                  console.log(selectedItems);
                  onItemsAddedForDay(selectedItems);
                }}
                style={{
                  height: 40,
                  width: 120,

                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 14,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                  }}
                >
                  Add Items
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "space-around",
    marginTop: 30,
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: "400",
    color: "black",
  },
  detailsStyle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
  },
  cartStyle: {
    height: 20,
    width: 45,
    color: "#81B622",
    borderRadius: "20",
  },
});

export default ItemCardList;
