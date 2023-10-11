import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function WelcomeHeader() {
  const { userData, setUserData } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View>
        <Text>Hello</Text>
        <Text>{userData?.givenName}</Text>
      </View>
      <Image
        source={{ uri: userData?.photo }}
        style={{ width: 40, height: 40, borderRadius: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
  },
});
