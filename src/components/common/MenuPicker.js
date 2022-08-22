import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import UserContext from "../../context/UserContext";
export default MenuPicker = ({ onSelectedItemChange }) => {
  const [Enable, setEnable] = useState("courses");
  // const { menuItems, setMenuList } = useContext(UserContext);
  const { menuItems } = useContext(UserContext);
  const [menu, setMenu] = useState([{ id: "", name: "" }]);

  useEffect(() => {
    console.log("hello");
    let list = [];
    menuItems.map((r) => {
      list.push({ id: r.id, name: r.name });
    });
    console.log("list");
    console.log(list);
    setMenu(list);
  });
  const menuList = () => {
    return menu.map((item, i) => {
      return <Picker.Item label={item.name} key={i} value={item.id} />;
    });
  };
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={Enable}
        style={{ height: 50, width: 150 }}
        mode={"dialog"}
        onValueChange={(itemValue) => {
          onSelectedItemChange(itemValue);

          setEnable(itemValue);
        }}
      >
        {menuList()}
      </Picker>
    </View>
  );
};

// <Picker.Item label="Courses" value="courses" />
// <Picker.Item label="Data-Structures" value="DSA" />
// <Picker.Item label="ReactJs" value="react" />
// <Picker.Item label="C++" value="cpp" />
// <Picker.Item label="Python" value="py" />
// <Picker.Item label="Java" value="java" />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
