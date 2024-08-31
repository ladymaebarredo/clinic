import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Login with email and password
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: "Login Success" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUser = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = {
      id: userDoc.id,
      data: userDoc.data(),
    };

    return userData;
  } catch (e) {
    return null;
  }
};

export const getUserData = async (uid, role) => {
  try {
    const collectionName =
      role === "STUDENT"
        ? "students"
        : role === "EMPLOYEE"
        ? "employees"
        : "workers";

    const userDoc = await getDoc(doc(db, collectionName, uid));
    const userData = userDoc.data();
    return userData;
  } catch (e) {
    console.error("Error fetching user data:", e);
    return null;
  }
};

export const register = async (email, password, role) => {
  let userCredential;
  try {
    // Register the user with email and password
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
  try {
    const userData = {
      email: email,
      role: role,
      createdAt: new Date().toISOString(),
      onboarded: false,
    };
    // Store the user data in Firestore using the uid as the document ID
    await setDoc(doc(db, "users", userCredential.user.uid), userData);
  } catch (error) {
    return { success: false, message: error.message };
  }
  return { success: true, message: "Register Success" };
};
