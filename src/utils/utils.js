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
} from "firebase/firestore";
import { db } from "../../firebase";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export const getMenuForTheDay = async (date, menuItems) => {
  const day = new Date(date).getDate() + "-" + (new Date(date).getMonth() + 1);
  // console.log("menu");
  // console.log(menuItems);
  console.log(day);
  const docRef = doc(db, "weekly-menu", day);
  const docSnap = await getDoc(docRef);
  const itemsForTheDay = [];

  if (docSnap.exists()) {
    docSnap.data().items.forEach((r) => {
      itemsForTheDay.push({
        id: r.id,
        name: r.name,
        desc: menuItems.find((m) => m.id === r.id).desc,
        qty: 0,
        category: r.category,
      });
    });
  }

  return itemsForTheDay;
};

export const getItemsOrderedByUserForTheDay = async () => {
  const date = "12-9";
  const userId = "LS1";
  const q = query(
    collection(db, "order-details"),
    where("date", "==", date),
    where("user.id", "==", userId)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.empty ? {} : querySnapshot.docs[0].data().items;

  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
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
      desc: item.data().desc,
      category: item.data().category,
    });
  });
  return list;
};

export const addItemToMenu = async (name, desc, category, length) => {
  let success = false;

  try {
    const docId = "LS" + (length + 1);
    console.log("docId=" + docId);
    const itemAdded = await setDoc(doc(db, "menu-list", docId), {
      name: name,
      desc: desc,
      category: category, // category breakfast:1, lunch: 2, snack:3
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

export const addItemsForTheDay = async (date, items) => {
  let success = false;

  try {
    const itemAdded = setDoc(doc(db, "weekly-menu", date), { items });

    if (itemAdded) {
      success = true;
      console.log(itemAdded);
      alert("Menu Added");
    }
  } catch (err) {
    alert(err.message);
  }
  return success;
};

export const itemsAddedForUser = async (user, items, date) => {
  console.log(user, items, date);
  const docRef = await addDoc(collection(db, "order-details"), {
    date: date,
    user: {
      id: user.uid,
      name: user.userName,
    },
    items: items,
  });
  console.log("Document written with ID: ", docRef.id);
};
