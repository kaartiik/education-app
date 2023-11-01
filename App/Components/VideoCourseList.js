/* eslint-disable react/jsx-filename-extension */
import { View, Text, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../Shared/GlobalApi";

export default function VideoCourseList() {
   const [videoList, setVideoList] = useState();
   const navigation = useNavigation();

   useEffect(() => {
      getVideoCourse();
   }, []);

   const getVideoCourse = async () => {
      const result = (await GlobalApi.getVideoCourse()).data;

      const resp = result.data.map((item) => ({
         id: item.id,
         name: item.attributes.title,
         description: item.attributes.description,
         image: item.attributes.image.data[0].attributes.url,
         Topic: item.attributes.VideoTopic,
      }));

      setVideoList(resp);
   };

   const onPressCourse = (course) => {
      navigation.navigate("course-details", { course });
   };

   return (
      <View>
         <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 3 }}>Video Courses</Text>
         <FlatList
            horizontal
            data={videoList}
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
               </TouchableOpacity>
            )}
         />
      </View>
   );
}
