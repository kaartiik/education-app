import { create } from "apisauce";

const ipAddress = "192.168.0.118";
// define the api
const api = create({
   baseURL: `http://${ipAddress}:1337/api`,
   headers: {
      "X-API-KEY": "6a6329180959f053c66fdf4bb3d766f6ec85a42d9fcbbabf4cb712365f8a665cd2b02900181b304255fdb324bf5846a501ae9fb6f312c44fcd10fbccfca613a1370a6b6151c7eb71d07b1739905ce5824403f9c4dc13af759236746d039c00d2e82225aabb4b3ad9463627d7ea0607941ea56cc090a8f3fe6d66ed016b75430b",
   },
});

const getSlider = () => api.get("/sliders?populate=*");
const getVideoCourse = () => api.get("/video-topics?populate=*");
const getCourseList = (type) => api.get(`/course-lists?filters[type][$eq]=${type}&populate=deep,5`);
const setCourseProgress = (data) => api.post(`course-progresses`, data);
const getCourseProgress = (uid, courseId) => api.get(`course-progresses?filters[uid][$eq]=${uid}&filters[courseId][$eq]=${courseId}`);
export default {
   getSlider,
   getVideoCourse,
   getCourseList,
   setCourseProgress,
   getCourseProgress,
};
