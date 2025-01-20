import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useStore from "../../zustand/rentalStore";

const RentalDurationPicker = () => {
  const { startTime, endTime, duration,setDuration, setEndTime, setAmount } = useStore();
   
  useEffect(() => {
    if (startTime) {
      updateArrivalTime(startTime, duration);
    }
  }, [duration, startTime]);

  // Actualizar la hora de llegada basada en la hora de ingreso y la duración seleccionada
  const updateArrivalTime = (startTimeRent, durationRent) => {
    let durationInMinutes = 0;
    if (durationRent === "30 minutos") {
      durationInMinutes = 30;
    } else if (durationRent === "1 hora") {
      durationInMinutes = 60;
    } else if (durationRent === "2 horas") {
      durationInMinutes = 120;
    }
    const newArrivalTime = new Date(
      startTimeRent.getTime() + durationInMinutes * 60000
    );
    setEndTime(newArrivalTime);
  };

  const handleDurationChange = (itemValue) => {
    setDuration(itemValue);
    switch (itemValue) {
      case "30 minutos":
        setAmount(10000);
        break;
      case "1 hora":
        setAmount(15000);
        break;
      case "2 horas":
        setAmount(25000);
        break;
      default:
        setAmount(0);
    }
  };

  // Convierte el tiempo en un formato legible
  const formatTime = (date) => {
    if (!date) return "No Disponible";
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>DURACIÓN DEL ALQUILER</Text>
      <Picker
        selectedValue={duration || "0"}
        onValueChange={handleDurationChange}
        style={styles.picker}
      >
        <Picker.Item label=" 0 " value="0" />
        <Picker.Item label="30 minutos" value="30 minutos" />
        <Picker.Item label="1 hora" value="1 hora" />
        <Picker.Item label="2 horas" value="2 horas" />
      </Picker>
      <Text style={styles.text}>HORA DE INGRESO</Text>

      <Text style={styles.timeText}>{formatTime(startTime)}</Text>
      <Text style={styles.text}>HORA DE LLEGADA</Text>
      <Text style={styles.timeText}>{formatTime(endTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "rgb(253, 252, 252)",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  picker: {
    height: 50,
    color: "rgba(7, 7, 7, 0.72)",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 18,
    color: "rgb(253, 252, 252)",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    paddingTop: 10,
  },
  timeText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 10,
    fontWeight: "bold",
  },
});

export default RentalDurationPicker;
