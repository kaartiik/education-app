/* eslint-disable react/jsx-filename-extension */
import { View, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import Services from "../Shared/Services";
import AuthContext from "../Context/AuthContext";
import WelcomeHeader from "../Components/WelcomeHeader";
import SearchBar from "../Components/SearchBar";
import Slider from "../Components/Slider";
import VideoCourseList from "../Components/VideoCourseList";
import CourseList from "../Components/CourseList";

export default function Home() {
  return (
    <ScrollView
      style={{
        padding: 5,
      }}
    >
      <WelcomeHeader />
      <SearchBar />
      <Slider />
      <VideoCourseList />
      <CourseList type="basic" />
      <CourseList type="advance" />
    </ScrollView>
  );
}
