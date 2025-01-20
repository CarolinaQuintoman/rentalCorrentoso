import React from "react";
//import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "react-native-web";
import useStore from "../../zustand/rentalStore";

const Selected = () => {
  const { selectedOption, setSelectedOption } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SELECCIONAR:</Text>
      <Picker
        selectedValue={selectedOption || ""}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione una opción" value="" />
        <Picker.Item label="Bote" value="bote" />
        <Picker.Item label="Kayak" value="kayak" />
        <Picker.Item label="Tabla" value="tabla" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
  },
  text: {
    fontSize: 18,
    color: "rgb(253, 252, 252)",
    fontWeight: "bold",
    marginBottom: 5, // Reduce margin between text and input
    textAlign: "center",
    paddingTop: 1,
  },
  picker: {
    textAlign: "center",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  
});

export default Selected;
