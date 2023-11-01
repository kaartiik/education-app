import { View, Text, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../Shared/GlobalApi";

export default function Slider() {
   const [slider, setSlider] = useState();
   useEffect(() => {
      getSlider();
   }, []);

   const getSlider = async () => {
      const result = (await GlobalApi.getSlider()).data;
      // console.log("SLIDERRR RESPPPP", result.data);
      const resp = result.data.map((item) => ({
         id: item.id,
         name: item.attributes.Name,
         image: item.attributes.image.data.attributes.url,
      }));

      setSlider(resp);
   };
   return (
      <View style={{ marginTop: 10 }}>
         <FlatList
            horizontal
            data={slider}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
               <View>
                  <Image
                     source={{ uri: item.image }}
                     style={{
                        width: Dimensions.get("screen").width * 0.85,
                        height: 150,
                        borderRadius: 10,
                        marginRight: 15,
                     }}
                  />
               </View>
            )}
         />
      </View>
   );
}
