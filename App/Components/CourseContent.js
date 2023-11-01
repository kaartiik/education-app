/* eslint-disable react/jsx-filename-extension */
import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Shared/Colors";

export default function CourseContent({ course, userProgress }) {
   const navigation = useNavigation();

   useEffect(() => {
      console.log("USER PROGRESSSSS", userProgress);
   }, []);

   const checkUserProgress = (contentId) => userProgress.find((item) => item.courseContentId === contentId);

   return (
      <View style={{ marginTop: 10 }}>
         <Text style={{ fontSize: 16, fontWeight: "bold" }}>Course Content</Text>
         <FlatList
            style={{ marginTop: 10 }}
            data={course?.Topic}
            renderItem={({ item, index }) => (
               <TouchableOpacity
                  onPress={() => navigation.navigate("course-chapter", { courseContent: item, courseId: course.id })}
                  style={{
                     display: "flex",
                     flexDirection: "row",
                     backgroundColor: Colors.white,
                     marginBottom: 5,
                     padding: 10,
                     alignItems: "center",
                     borderRadius: 5,
                  }}
               >
                  {checkUserProgress(item.id) ? (
                     <Ionicons name="checkmark-circle" size={24} color={Colors.green} />
                  ) : (
                     <Text
                        style={{
                           fontSize: 20,
                           fontWeight: "bold",
                           color: Colors.gray,
                           marginRight: 20,
                        }}
                     >
                        {index + 1}
                     </Text>
                  )}
                  <Text
                     style={{
                        fontSize: 15,
                        fontWeight: "bold",
                     }}
                  >
                     {item.Topic ? item.Topic : item.name}
                  </Text>
                  <Ionicons name="play-circle" size={24} color={Colors.primary} style={{ position: "absolute", right: 10 }} />
               </TouchableOpacity>
            )}
         />
      </View>
   );
}
