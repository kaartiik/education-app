/* eslint-disable global-require */
/* eslint-disable react/jsx-filename-extension */
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from "@expo/vector-icons";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Colors from "../Shared/Colors";
import AuthContext from "../Context/AuthContext";
import Services from "../Shared/Services";

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginTop: -20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default function Login() {
  const [userInfo, setUserInfo] = useState(null);
  const { userData, setUserData } = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        "454926182472-ejnl9d09op8io6bdfj92dof61irsptup.apps.googleusercontent.com",
      webClientId:
        "454926182472-bui6k6jgo03cs78s0jncd151nju89ulk.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  //   const getUserData = async (accessToken) => {
  //     try {
  //       const response = await fetch(
  //         "https://www.googleapis.com/userinfo/v2/me",
  //         {
  //           headers: { Authorization: `Bearer ${accessToken}` },
  //         },
  //       );

  //       const user = await response.json();
  //       console.log("USEr", user);
  //       setUserInfo(user);
  //       setUserData(user);
  //       await Services.setUserAuth(user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const GoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(async (result) => {
        console.log("idToken", result);
        setUserInfo(result.user);
        setUserData(result.user);
        await Services.setUserAuth(result.user);
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert("User cancelled the login flow !");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in progress");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Google play services not available or outdated !");
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View>
      <Image source={require("../Assets/Images/login.png")} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to CodeBox</Text>
        <Text style={{ textAlign: "center", marginTop: 80, fontSize: 20 }}>
          Login/Signup
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => GoogleSignUp()}>
          <Ionicons
            name="logo-google"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: Colors.white }}>Sign In with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
