import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOURS } from "../../styles/elementStyles";
import ItemCard from "./ItemCard";

const ItemCardList = ({ itemsList, onItemsAddedForDay }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log(itemsList);
    if (itemsList.length > 0) {
      const selected = itemsList.filter((r) => r.qty > 0);
      setSelectedItems([...selected]);
    }
  }, [itemsList]);
  const addItem = (item, count, category) => {
    // console.log(selectedItems);
    const selectedItemIndex = selectedItems.findIndex((r) => r.id === item.id);
    if (selectedItemIndex !== -1) {
      const tempArray = [...selectedItems];

      tempArray[selectedItemIndex] = {
        ...tempArray[selectedItemIndex],
        qty: count,
      };
      setSelectedItems(tempArray);
    } else {
      setSelectedItems([
        ...selectedItems,
        { id: item.id, name: item.name, category: category, qty: count },
      ]);
    }
  };

  const getListbyCategory = (category) => {
    return itemsList.filter((r) => r.category == category);
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.containerStyle}>
        {itemsList.length === 0 ? (
          <View>
            <Text style={{ fontSize: 26, fontStyle: "italic" }}>
              Sorry, We are closed for the day.
            </Text>
          </View>
        ) : (
          <View>
            <View>
              <View>
                {getListbyCategory(1).length > 0 ? (
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Breakfast
                    </Text>
                    <FlatList
                      key={(item) => {
                        item.id;
                      }}
                      data={getListbyCategory(1)}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <ItemCard
                              item={item}
                              orderCount={item.qty}
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
                {getListbyCategory(2).length > 0 ? (
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Lunch
                    </Text>
                    <FlatList
                      key={(item) => {
                        item.id;
                      }}
                      data={getListbyCategory(2)}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <ItemCard
                              item={item}
                              orderCount={item.qty}
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
                {getListbyCategory(3).length > 0 ? (
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Snacks
                    </Text>
                    <FlatList
                      key={(item) => {
                        item.id;
                      }}
                      data={getListbyCategory(3)}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <ItemCard
                              item={item}
                              orderCount={item.qty}
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

                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onItemsAddedForDay(selectedItems);
                }}
                style={{
                  height: 40,
                  width: 120,
                  backgroundColor: COLOURS.oliveGreen,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 14,
                }}
                //disabled={selectedItems.length === 0}
              >
                <Text
                  style={{
                    color: "white",
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
