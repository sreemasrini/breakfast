import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

export const register = async (email, password) => {
  console.log("here");
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
