import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Pages/Home";
import CourseDetails from "../Pages/CourseDetails";
import CourseChapter from "../Pages/CourseChapter";

const Stack = createStackNavigator();

export default function HomeNavigation() {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="home" component={Home} />
         <Stack.Screen name="course-details" component={CourseDetails} />
         <Stack.Screen name="course-chapter" component={CourseChapter} />
      </Stack.Navigator>
   );
}
