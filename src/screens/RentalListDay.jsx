import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useStore from "../zustand/rentalStore";
import { ref, update } from "firebase/database";
import { db } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const RentalListDay = () => {
  const navigation = useNavigation();

  const renderRental = (rental) => (
    <View key={rental.id} style={styles.rental}>
      <Text>{rental.title}</Text>
      <Text>{rental.price}</Text>
    </View>
  );

  const navigateToAdminDashboard = () => {
    navigation.navigate("AdminAccess");
  };
  const { fetchRentals } = useStore();
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const loadRentals = async () => {
      const rentalData = await fetchRentals();
      const today = new Date().toLocaleDateString();
      const todayRentals = Object.entries(rentalData || {})
        .filter(([_, rental]) => rental.date === today)
        .map(([id, rental]) => ({ id, ...rental }));
      setRentals(todayRentals);
    };
    loadRentals();
    const interval = setInterval(loadRentals, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [fetchRentals]);

  const markAsFinished = async (rentalId) => {
    try {
      const rentalRef = ref(db, `rentals/${rentalId}`);
      await update(rentalRef, { status: "finished" });
      setRentals(
        rentals.map((rental) =>
          rental.id === rentalId ? { ...rental, status: "finished" } : rental
        )
      );
    } catch (error) {
      console.error("Error marking rental as finished:", error);
    }
  };

  const isRentalFinished = (endTime) => {
    const now = new Date();
    const rentalEnd = new Date(now.toDateString() + " " + endTime);
    return now >= rentalEnd;
  };

  return (
    <ImageBackground
      source={require("../../assets/images/boat.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Alquileres del Día</Text>
        {rentals.map((rental) => (
          <View key={rental.id} style={styles.rentalItem}>
            <Text style={styles.clientName}>{rental.client}</Text>
            <Text style={styles.otherText}>
              Hora de salida: {rental.startTime}
            </Text>
            <Text style={styles.otherText}>
              Hora de llegada: {rental.endTime}
            </Text>
            <Text style={styles.otherText}>{rental.selectedOption}</Text>
            {isRentalFinished(rental.startTime) &&
              rental.status !== "finished" && (
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={() => markAsFinished(rental.id)}
                >
                  <Text style={styles.finishButtonText}>
                    Marcar como Finalizado
                  </Text>
                </TouchableOpacity>
              )}
            {rental.status === "finished" && (
              <Text style={styles.finishedText}>Finalizado</Text>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("RentalForm")}
        >
          <Text style={styles.backButtonText}>Volver al Formulario</Text>
        </TouchableOpacity>
        {rentals.map(renderRental)}
        <TouchableOpacity
          style={styles.adminButton}
          onPress={navigateToAdminDashboard}
        >
          <AntDesign name="user" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,

    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    color: "rgba(248, 243, 243, 0.96)",
  },
  rentalItem: {
    flex: 1,
    width: "70%",
    alignSelf: "center",
    backgroundColor: "rgba(9, 9, 9, 0.72)",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "rgba(248, 243, 243, 0.96)",
  },
  finishButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  finishedText: {
    color: "rgba(255, 0, 0, 0.8)",
    backgroundColor: "white",
    padding:  10,
    fontWeight: "bold",
    marginTop: 10,
  },
  backButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  otherText: {
    color: "rgba(248, 243, 243, 0.96)",
    fontSize: 18,
  },
  adminButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
});

export default RentalListDay;
