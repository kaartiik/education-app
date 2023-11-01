/* eslint-disable react/jsx-filename-extension */
import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../Shared/Colors";
import CourseContent from "../Components/CourseContent";
import GlobalApi from "../Shared/GlobalApi";
import AuthContext from "../Context/AuthContext";

export default function CourseDetails() {
   const { params } = useRoute();
   const [course, setCourse] = useState([]);
   const navigation = useNavigation();
   const [userProgress, setUserProgress] = useState([]);
   const { userData, setUserData } = useContext(AuthContext);

   useEffect(() => {
      setCourse(params?.course);
      if (params.course.id) {
         getCourseProgress();
      }
   }, [params.courseContentId]);

   const getCourseProgress = () => {
      GlobalApi.getCourseProgress(userData.id, params.course.id).then((resp) => {
         if (resp.data.data) {
            const result = resp.data.data.map((item) => ({
               id: item.id,
               courseId: item.attributes.courseId,
               courseContentId: item.attributes.courseContentId,
            }));
            console.log("USER DATA2", result);
            setUserProgress(result);
         }
      });
   };

   return (
      <View style={{ padding: 20, paddingTop: 30 }}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={24} color={Colors.gray} style={{ marginRight: 10 }} />
         </TouchableOpacity>

         <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{course?.name}</Text>
            <Image source={{ uri: course.image }} style={{ height: 150, marginTop: 10, borderRadius: 10 }} />
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold" }}>About Course</Text>

            <Text numberOfLines={4} style={{ color: Colors.gray }}>
               {course.description}
            </Text>
         </View>
         <CourseContent course={course} userProgress={userProgress} />
      </View>
   );
}
