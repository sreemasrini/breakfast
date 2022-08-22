import { menu } from "../../assets/data/data";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export const getMenuForTheDay = (date) => {
  const day = new Date(date).getDay();
  const menuList = menu.filter((r) => {
    return r.availableDays.includes(day);
  });
  return menuList;
};

//DB query

export const getAllItemsInMenu = async () => {
  const q = query(collection(db, "menu-list"));
  const docs = await getDocs(q);

  let list = [];
  docs.forEach((item) => {
    // console.log(a.data());
    list.push({
      id: item.id,
      name: item.data().name,
      desc: item.data().description,
    });
  });
  return list;
};

export const addItemToMenu = async (name, desc, length) => {
  let success = false;
  try {
    const docId = "B" + (length + 1);
    const itemAdded = setDoc(doc(db, "menu-list", docId), {
      name: name,
      description: desc,
      type: 1,
      maxqty: 99,
    });

    if (itemAdded) {
      success = true;
      console.log(itemAdded);
    }
  } catch (err) {
    alert(err.message);
  }
  return success;
};
