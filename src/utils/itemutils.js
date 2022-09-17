import { menu } from "../../assets/data/data";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";

import {
  itemsAddedForUser,
  getItemsOrderedByUserForTheDay,
  getMenuForTheDay,
} from "./utils";

const mergeItemsList = (itemsForDay, orderedItems) => {
  let arr = [...itemsForDay];
  if (orderedItems.length > 0) {
    orderedItems.forEach((r) => {
      const item = arr.findIndex((n) => n.id === r.id);
      if (item !== -1) {
        const tempArray = [...arr];
        tempArray[item] = {
          ...tempArray[item],
          qty: r.qty,
        };
        arr = [...tempArray];
      }
    });
  }

  //console.log(arr);
  return arr;
};

export const getItemsForDay = async (date, userId, menuItems) => {
  console.log("date" + date);
  const formattedDate = getFormattedDate(date);
  const itemsForDay = await getMenuForTheDay(formattedDate, menuItems);
  const data = await getItemsOrderedByUserForTheDay(formattedDate, userId);

  const orderedItems = data.items;

  const itemList = mergeItemsList(itemsForDay, orderedItems);
  return { id: data.id, itemList: itemList };
};

export const getFormattedDate = (date) => {
  return new Date(date).getDate() + "-" + (new Date(date).getMonth() + 1);
};

export const getTotalOrderListForTheDay = async (date) => {
  const formattedDate = getFormattedDate(date);

  console.log(formattedDate);
  const q = query(
    collection(db, "order-details"),
    where("date", "==", formattedDate)
  );

  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.docs[0].data().items);
  let list = [];
  querySnapshot.forEach((item) => {
    //console.log(item.data());
    list.push(item.data());
  });
  //console.log(list);
  return list;
};

export const getActiveOrdersForUser = async (userId) => {
  // const formattedDate = getFormattedDate(date);

  // console.log(formattedDate);
  console.log(userId);
  const q = query(
    collection(db, "order-details"),
    where("user.id", "==", userId),
    where("timestamp", ">", new Date())
  );

  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.docs[0].data().items);
  let list = [];
  querySnapshot.forEach((item) => {
    //console.log(item.data());
    list.push({ ...item.data(), oid: item.id });
  });
  console.log("List");
  console.log(list);
  return list;
};

export const updateActiveOrder = async (docId, items) => {
  const ref = doc(db, "order-details", docId);

  updateDoc(ref, {
    items: items,
  }).then(() => {
    return true;
  });
  return false;
};

export const getPastOrdersForUser = async (userId) => {
  console.log(userId);
  const q = query(
    collection(db, "order-details"),
    where("user.id", "==", userId),
    where("timestamp", "<=", new Date())
  );

  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.docs[0].data().items);
  let list = [];
  querySnapshot.forEach((item) => {
    //console.log(item.data());
    list.push(item.data());
  });
  console.log("List");
  console.log(list);
  return list;
};
