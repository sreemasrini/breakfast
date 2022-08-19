import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  addDoc,
  collection,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi-DvR6Kbt3QA0kgNZXucgPNQJkupyvYs",
  authDomain: "fir-auth-e3b71.firebaseapp.com",
  projectId: "fir-auth-e3b71",
  storageBucket: "fir-auth-e3b71.appspot.com",
  messagingSenderId: "199042860134",
  appId: "1:199042860134:web:7ecf204d79996bde6559a7",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export const register = async (email, password, username, mobileNo) => {
  let success = false;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);

    await setDoc(doc(db, "userDetails", user.uid), {
      name: username,
      mobileno: mobileNo,
    });

    if (res) success = true;
  } catch (err) {
    alert(err.message);
  }
  return success;
};

export const validateUserEmail = async (email) => {
  let emailExists = false;
  await fetchSignInMethodsForEmail(auth, email).then((result) => {
    emailExists = result.length > 0 ? true : false;
  });

  return emailExists;
};
