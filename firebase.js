import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi-DvR6Kbt3QA0kgNZXucgPNQJkupyvYs",
  authDomain: "fir-auth-e3b71.firebaseapp.com",
  projectId: "fir-auth-e3b71",
  storageBucket: "fir-auth-e3b71.appspot.com",
  messagingSenderId: "199042860134",
  appId: "1:199042860134:web:7ecf204d79996bde6559a7",
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

export const register = async (email, password, username, mobileNo) => {
  let success = false;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);

    const userAdded = await setDoc(doc(db, "userDetails", user.uid), {
      name: username,
      mobileno: mobileNo,
    });

    if (userAdded) success = true;
  } catch (err) {
    alert(err.message);
  }
  return success;
};
export const userLogIn = async (email, password) => {
  let message = "";
  await signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      // if (result) {
      //   AsyncStorage.setItem("user", result.user);
      // }
    })
    .catch((error) => {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        message = "Check your password again";
      } else {
        message = error.errorMsg;
      }
    });
  return message;
};

export const validateUserEmail = async (email) => {
  let emailExists = false;
  await fetchSignInMethodsForEmail(auth, email).then((result) => {
    emailExists = result.length > 0 ? true : false;
  });

  return emailExists;
};

export const isUserLoggedIn = () => {
  const x = getAuth(app).currentUser;
  console.log(x);
  return x;
};
