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

import {
  getFirestore,
  doc,
  setDoc,
  query,
  collection,
  getDocs,
  getDoc,
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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

export const register = async (email, password, username, mobileNo) => {
  let success = "";
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    //console.log(user);
    const q = query(collection(db, "user-details"));
    const docs = await getDocs(q);
    console.log(docs.size);
    const userId = docs.size === 0 ? "LS1" : "LS" + (docs.size + 1);

    await setDoc(doc(db, "user-details", user.uid), {
      uid: userId,
      name: username,
      mobileno: mobileNo,
    }).then(() => {
      console.log(userId);
      success = userId;
    });
  } catch (err) {
    alert(err.message);
  }
  return success;
};
export const userLogIn = async (email, password) => {
  let userDetails = {};
  let success = true;
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
      console.log(result.user.uid);
      const r = result.user.uid;
      const docRef = doc(db, "user-details", r);
      const docSnap = await getDoc(docRef);

      userDetails = docSnap.data();

      success = true;
    })
    .catch((error) => {
      success = false;
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        alert("Check your password again");
      } else {
        alert(error.errorMsg);
      }
    });
  return { success: success, userDetails: userDetails };
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
