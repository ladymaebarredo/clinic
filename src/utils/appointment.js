import { db } from "./firebase"; // Adjust this import to your Firebase config file
import {
  doc,
  collection,
  collectionGroup,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

export const createAppointment = async (
  workerType,
  workerId,
  message,
  userId
) => {
  try {
    // Create a reference to the user's appointments document
    const userAppointmentsRef = doc(db, "userAppointments", userId);
    // Create a reference to the appointments subcollection within the user's document
    const appointmentsRef = collection(userAppointmentsRef, "appointments");
    // Check for existing "Pending" appointments
    const q = query(
      appointmentsRef,
      where("appointmentStatus", "==", "Pending")
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // User already has a "Pending" appointment
      return {
        success: false,
        message: "You already have a pending appointment.",
      };
    }

    // Add a new appointment document to the appointments subcollection
    await addDoc(appointmentsRef, {
      workerType,
      workerId,
      message,
      userId,
      appointmentStatus: "Pending",
      createdAt: serverTimestamp(),
    });

    return { success: true, message: "Appointment created successfully." };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return {
      success: false,
      message: "An error occurred while creating the appointment.",
    };
  }
};

export const getWorkerAppointments = async (typeId, type) => {
  try {
    // Query across all userAppointments documents to find appointments for the specific worker
    const appointmentsQuery = query(
      collectionGroup(db, "appointments"),
      where(type, "==", typeId)
    );
    // Execute the query
    const querySnapshot = await getDocs(appointmentsQuery);
    // Map through the results to format them
    const appointments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return appointments;
  } catch (error) {
    console.error("Error fetching type's appointments:", error);
    return [];
  }
};
