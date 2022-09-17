import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Text, Button, Input, Icon } from "react-native-elements";
import { View } from "react-native";
import UserContext from "../../context/UserContext";
import { getPastOrdersForUser } from "../../utils/itemutils";
import { FlatList } from "react-native";

const PastOrders = () => {
  const { user } = useContext(UserContext);

  const [pastOrders, setPastOrders] = useState([]);
  const getPastOrders = async () => {
    const orders = await getPastOrdersForUser(user.uid);
    setPastOrders(orders);
  };
  useEffect(() => {
    getPastOrders();
  }, []);
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ marginLeft: 20 }}>
      {pastOrders.length > 0 ? (
        <View>
          <FlatList
            data={pastOrders}
            key={(item) => {
              item.date;
            }}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Text
                    style={[
                      { fontSize: 16, marginTop: 15, fontStyle: "italic" },
                    ]}
                  >
                    {item.date}
                  </Text>
                  <View>
                    <FlatList
                      data={item.items}
                      key={(item) => {
                        item.id;
                      }}
                      renderItem={({ item, index }) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              margin: 2,
                              marginLeft: 25,
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: "black",
                              }}
                            >
                              {item.name}
                            </Text>

                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: "black",
                              }}
                            >
                              {item.qty}
                            </Text>
                          </View>
                        );
                      }}
                    ></FlatList>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        </View>
      ) : (
        <Text style={{ marginTop: 40, fontSize: 22 }}>
          There are no orders to show
        </Text>
      )}
    </SafeAreaView>
  );
};

export default PastOrders;
