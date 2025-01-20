import { create } from "zustand";
import { db } from "../../firebaseConfig";
import { ref, get, child, set } from "firebase/database";

const useStore = create((set) => ({
  client: "",
  duration: null,
  amount: null,
  startTime: new Date(),
  endTime: new Date(),
  selectedOption: "",
  Date: new Date(),
  newArrivalTime: "",

  setClient: (client) => set({ client }),
  setDuration: (newDuration) => set({ duration: newDuration }),
  setAmount: (amount) => set({ amount }),
  setEndTime: (newEndTime) => set({ endTime: newEndTime }),
  setStartTime: (newStartTime) => set({ startTime: newStartTime }),
  setSelectedOption: (selectedOption) => set({ selectedOption }),
  setNewArrivalTime:(newArrivalTime) => set ({newArrivalTime}),
  
  resetForm: () => set({
    client: "",
    duration: "",
    amount: "",
    startTime: new Date(),
    endTime: new Date(),
    selectedOption: "",
    newArrivalTime: "",
  }),

  fetchRentals: async () => {
    try {
      const dbRef = ref(db, "rentals");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return {};
      }
    } catch (error) {
      console.error("Error fetching rentals:", error);
      return {};
    }
  },

  markRentalAsFinished: async (rentalId) => {
    try {
      const rentalRef = ref(db, `rentals/${rentalId}`);
      await update(rentalRef, { status: 'finished' });
    } catch (error) {
      console.error("Error marking rental as finished:", error);
    }
  },

}));

export default useStore;
