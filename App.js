import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import AdminDashboard from "./src/screens/AdminDashboard";
import RentalForm from "./src/screens/RentalForm";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import RentalListDay from "./src/screens/RentalListDay";
import AdminAccess from "./src/screens/AdminAccess";

const Stack = createNativeStackNavigator();

const App = () => {
  // const { user, loading } = useAuth();
  // if (loading) {
  //   return null;
  // }
  // condicional despues de la linea 23
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AdminAccess"
            component={AdminAccess}
            options={{
              headerTitle: "Acceso Administrador",
              headerStyle: {
                backgroundColor: "#4CAF50",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboard}
            options={{
              headerTitle: "Panel de Administrador",
              headerStyle: {
                backgroundColor: "#4CAF50",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="RentalForm"
            component={RentalForm}
            options={{
              headerTitle: "Formulario de Alquiler",
              headerStyle: {
                backgroundColor: "#4CAF50",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="RentalListDay"
            component={RentalListDay}
            options={{
              headerTitle: "Lista de Alquiler",
              headerStyle: {
                backgroundColor: "#4CAF50",
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

