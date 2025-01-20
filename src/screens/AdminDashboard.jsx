import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStore from "../zustand/rentalStore";

const AdminDashboard = () => {
  const [dailyRentals, setDailyRentals] = useState([]);
  const [totalDailyIncome, setTotalDailyIncome] = useState(0);
  const { fetchRentals } = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    const loadDailyRentals = async () => {
      const rentalData = await fetchRentals();
      const today = new Date().toLocaleDateString();
      
      const todayRentals = Object.entries(rentalData || {})
        .filter(([_, rental]) => rental.date === today)
        .map(([id, rental]) => ({
          id,
          amount: parseFloat(rental.amount),
          selectedOption: rental.selectedOption
        }));

      setDailyRentals(todayRentals);

      const totalIncome = todayRentals.reduce((sum, rental) => sum + rental.amount, 0);
      setTotalDailyIncome(totalIncome);
    };

    loadDailyRentals();
    // Actualizar cada minuto
    const interval = setInterval(loadDailyRentals, 60000);
    return () => clearInterval(interval);
  }, [fetchRentals]);

  const handleClose = () => {
    navigation.navigate('RentalForm');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Panel de Administrador</Text>
      <View style={styles.incomeContainer}>
        <Text style={styles.incomeText}>
          Ganancias totales del día: ${totalDailyIncome.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.subtitle}>Alquileres del día:</Text>
      {dailyRentals.map((rental) => (
        <View key={rental.id} style={styles.rentalItem}>
          <Text>{rental.selectedOption}: ${rental.amount.toFixed(2)}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}> CERRAR </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  incomeContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  incomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rentalItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: "#3498db",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AdminDashboard;

