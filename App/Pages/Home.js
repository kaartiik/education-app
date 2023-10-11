/* eslint-disable react/jsx-filename-extension */
import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useContext } from "react";
import Services from "../Shared/Services";
import AuthContext from "../Context/AuthContext";
import WelcomeHeader from "../Components/WelcomeHeader";
import SearchBar from "../Components/SearchBar";

export default function Home() {
  return (
    <View
      style={{
        padding: 5,
      }}
    >
      <WelcomeHeader />
      <SearchBar />
    </View>
  );
}
