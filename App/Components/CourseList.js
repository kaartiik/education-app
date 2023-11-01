/* eslint-disable react/jsx-filename-extension */
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../Shared/GlobalApi";

export default function CourseList({ type }) {
   const navigation = useNavigation();
   const [courseList, setCourseList] = useState();
   useEffect(() => {
      getCourseList(type);
   }, []);

   const getCourseList = async () => {
      const resp = (await GlobalApi.getCourseList(type)).data;

      const result = resp.data.map((item) => ({
         id: item.id,
         name: item.attributes.name,
         description: item.attributes.description,
         image: item.attributes.image.data.attributes.url,
         Topic: item.attributes.Topic,
      }));

      setCourseList(result);
   };

   const onPressCourse = (course) => {
      navigation.navigate("course-details", { course });
   };

   return (
      <View style={{ marginTop: 10 }}>
         <Text
            style={{
               fontSize: 20,
               fontWeight: "bold",
               marginBottom: 3,
               textTransform: "capitalize",
            }}
         >
            {type} Course
         </Text>
         <FlatList
            horizontal
            data={courseList}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
               <TouchableOpacity onPress={() => onPressCourse(item)}>
                  <Image
                     source={{ uri: item.image }}
                     style={{
                        width: 180,
                        height: 110,
                        borderRadius: 10,
                        marginRight: 10,
                     }}
                  />
                  <View style={{ padding: 10 }}>
                     <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.name}</Text>
                     <Text style={{ color: Colors.gray, fontWeight: "300" }}>{item.Topic?.length} Lessons</Text>
                  </View>
               </TouchableOpacity>
            )}
         />
      </View>
   );
}
