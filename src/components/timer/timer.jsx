import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimePickerComponent = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Función para manejar el cambio de hora
  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (event.type === "set" && selectedDate) {
      setTime(selectedDate);
    }
  };

  // Convierte el tiempo en un formato legible
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  return (
    <View style={{ alignItems: "center", marginTop: 50 }}>
      {/* <Text style={styles.text}>HORA DE INGRESO</Text>
      <DateTimePicker
        style={styles.timer}
        value={time}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={onChange}
      /> */}

      <Text style={{ fontSize: 38, color:"white" }}>
         {formatTime(time)}
      </Text>
      {/* <Text style={styles.text}>HORA DE LLEGADA</Text>
      <DateTimePicker
        style={styles.timer}
        value={time}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={onChange}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  
  text: {
    fontSize: 18,
    color: "#fff", // White text color
    marginBottom: 15, // Reduce margin between text and input
    textAlign: "center",
    paddingTop: 20,
  },
  
  timer: {
    marginTop: 5, // Reduce margin between TimePickerComponent and text
    marginBottom: 20,
  },
  
});

export default TimePickerComponent;
