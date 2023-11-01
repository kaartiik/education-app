/* eslint-disable react/jsx-filename-extension */
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../Shared/Colors";
import GlobalApi from "../Shared/GlobalApi";
import ProgressBar from "../Components/ProgressBar";
import AuthContext from "../Context/AuthContext";

export default function CourseChapter() {
   const navigation = useNavigation();
   const { params } = useRoute();
   const [chapter, setChapter] = useState([]);
   const [run, setRun] = useState(false);
   const [progress, setProgress] = useState(0);
   const { userData, setUserData } = useContext(AuthContext);
   let chapterRef;

   useEffect(() => {
      setProgress(0);
      setChapter(params.courseContent.Content);
      // console.log(params);
   }, []);

   const onClickNext = (index) => {
      setRun(false);
      // Progress bar on the screen for chapters completed
      setProgress(index + 1 / chapter.length);
      try {
         chapterRef.scrollToIndex({ animated: true, index: index + 1 });
      } catch (e) {
         // Catch block is exceuted when page screen length exceeded
         let coursePro;
         const data = {
            data: {
               uid: userData.id,
               courseId: params.courseId,
               courseContentId: params.courseContent.id,
            },
         };

         // console.log(data);

         GlobalApi.setCourseProgress(data).then((resp) => {
            navigation.goBack();
            navigation.navigate({
               name: "course-details",
               params: { courseContentId: params.courseContent.id },
               merge: true,
            });
         });
      }
   };

   return (
      <View style={{ padding: 20, paddingTop: 30 }}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={24} color={Colors.gray} style={{ marginRight: 10 }} />
         </TouchableOpacity>
         <ProgressBar progress={progress} />
         <FlatList
            data={chapter}
            horizontal
            pagingEnabled
            ref={(ref) => {
               chapterRef = ref;
            }}
            renderItem={({ item, index }) => (
               <View style={{ width: Dimensions.get("screen").width * 0.85, marginRight: 15, padding: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
                  <Text>{item.description}</Text>
                  {item.input !== "" ? (
                     <View>
                        <View style={{ backgroundColor: Colors.black, padding: 20, borderRadius: 10 }}>
                           <Text style={{ color: Colors.white }}>{item.input}</Text>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: Colors.primary, width: 60, padding: 5, borderRadius: 5, marginTop: 10, display: "flex", flexDirection: "row" }} onPress={() => setRun(true)}>
                           <Ionicons name="play-circle" size={20} color={Colors.white} />
                           <Text style={{ textAlign: "center", marginLeft: 5, color: Colors.white }}>Run</Text>
                        </TouchableOpacity>
                     </View>
                  ) : null}
                  {run ? (
                     <View style={{ marginTop: 15 }}>
                        <Text style={{ fontWeight: "bold" }}>Output</Text>
                        <View style={{ backgroundColor: Colors.black, padding: 20, borderRadius: 10, marginTop: 10 }}>
                           <Text style={{ color: Colors.white }}>{item.output}</Text>
                        </View>
                     </View>
                  ) : null}
                  {index + 1 !== chapter.length ? (
                     <TouchableOpacity onPress={() => onClickNext(index)} style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 7, position: "absolute", bottom: 0, width: "110%" }}>
                        <Text style={{ textAlign: "center", color: Colors.white }}>Next</Text>
                     </TouchableOpacity>
                  ) : (
                     <TouchableOpacity onPress={() => onClickNext(index)} style={{ backgroundColor: Colors.green, padding: 10, borderRadius: 7, position: "absolute", bottom: 0, width: "110%" }}>
                        <Text style={{ textAlign: "center", color: Colors.white }}>Finish</Text>
                     </TouchableOpacity>
                  )}
               </View>
            )}
         />
      </View>
   );
}
