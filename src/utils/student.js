import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const createStudent = async (
  firstname,
  middlename,
  lastname,
  studentId,
  department,
  program,
  yearLevel,
  id
) => {
  try {
    await setDoc(doc(db, "students", id), {
      id,
      firstname,
      middlename,
      lastname,
      studentId,
      department,
      program,
      yearLevel,
    });
    await updateDoc(doc(db, "users", id), {
      onboarded: true,
    });
    return { success: true, message: "Success" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
