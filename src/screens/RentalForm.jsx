import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../firebaseConfig";
import { ref, set } from "firebase/database";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Selected from "../components/selected/selected";
import RentalDurationPicker from "../components/rentalDurationPickler/rentalDurationPiker";
import useStore from "../zustand/rentalStore";

const RentalForm = () => {
  const navigation = useNavigation();
  const navigateToAdminDashboard = () => navigation.navigate("AdminAccess");
  const {
    client,
    duration,
    amount,
    startTime,
    endTime,
    selectedOption,
    setClient,
    setAmount,
    resetForm,
  } = useStore();

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [resetForm])
  );

  const validateForm = () => {
    if (!client || !duration || !amount || !selectedOption) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, complete todos los campos antes de guardar.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const rentalDetails = {
      date: new Date().toLocaleDateString(),
      client,
      duration,
      selectedOption,
      amount,
      startTime: startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: endTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      console.log("Enviando datos a Firebase:", rentalDetails);
      const rentalRef = ref(db, "rentals/" + Date.now());
      await set(rentalRef, rentalDetails);
      Alert.alert("Éxito", "Alquiler guardado correctamente", [
        { text: "OK", onPress: () => navigation.navigate("RentalListDay") },
      ]);
      navigation.navigate("RentalListDay");
    } catch (error) {
      console.error("Error saving rental:", error);
      Alert.alert("Error", "No se pudo guardar el alquiler");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/boat.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Cliente"
          value={client}
          onChangeText={setClient}
          placeholderTextColor="#888"
        />
        <Selected />
        <RentalDurationPicker />
        <View style={styles.timeContainer}>
          <TextInput
            style={styles.input}
            placeholder="Importe a Pagar"
            value={amount ? amount.toString() : ""}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar Alquiler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.listButton]}
          onPress={() => navigation.navigate("RentalListDay")}
        >
          <Text style={styles.buttonText}>Ver Listado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.adminButton}
          onPress={navigateToAdminDashboard}
        >
          <AntDesign name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
  adminButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(9, 9, 9, 0.72)",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "rgba(248, 243, 243, 0.72)",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  timeContainer: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  listButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RentalForm;
