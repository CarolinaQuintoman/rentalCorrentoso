import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Selected from "../components/selected/selected";
import RentalDurationPicker from "../components/rentalDurationPickler/rentalDurationPiker";
import useStore from "../zustand/rentalStore";

const RentalForm = () => {
  const navigation = useNavigation();

  const { 
    amount, 
    setAmount, 
    startTime, 
    endTime, 
    setClient, 
    selectedOption,  
    client, 
    duration, 
    saveRental, 
    setDuration, 
    setSelectedOption 
  } = useStore();
  
  const handleSubmit = async () => {
    if (!client || !selectedOption || !duration || !amount) {
      Alert.alert("Error", "Por favor, complete todos los campos");
      return;
    }

    const rentalDetails = {
      date: new Date().toLocaleDateString(),
      client,
      duration,
      selectedOption,
      amount,
      startTime: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      endTime: endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    await saveRental(rentalDetails);
    console.log("Alquiler procesado", rentalDetails);
    navigation.navigate("RentalListDay");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/boat.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Formulario de Alquiler</Text>
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
              onChangeText={(text) => setAmount(text ? parseFloat(text) : "")}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirmar Alquiler</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // ... (styles remain unchanged)
});

export default RentalForm;

