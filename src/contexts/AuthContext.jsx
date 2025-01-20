import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const checkUser = async () => {
      const storeUser = await AsyncStorage.getItem("user");
      if (storeUser) {
        setUser(JSON.parse(storeUser));
      }
      setLoading(false);
    };
    checkUser();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } else {
        await AsyncStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
    await AsyncStorage.setItem("authTimestamp", Date.now().toString());
    setUser(userCredential.user);
  };

  const signOutUser = async () => {
    await signOut(auth);
    await AsyncStorage.multiRemove(["user", "authTimestamp"]);
    setUser(null);
  };

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
    await AsyncStorage.setItem("authTimestamp", Date.now().toString());
    setUser(userCredential.user);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut: signOutUser, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
