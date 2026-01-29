import { createContext, useEffect, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CourseContext = createContext();

const CourseProvider = ({children}) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const getCourses = async () => {
        try {
            const response = await API.get("/course/get-courses");
            if (response) {
                if (response.data.success) {
                    setCourses(response.data.courses);
                    return;
                }
            }
        } catch(error) {
            console.log(error.message);
        }
    }
    const createCourse = async (courseName,courseCode,duration) => {
        try {
            const response = await API.post("/course/create-course", { courseName, courseCode, duration });
            if (response) {
                if (response.data.success) {
                    setCourses((prev) => [...prev,response.data.course]);
                    toast.success(response.data.message);
                    navigate("/admin-dashboard");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong");
            }
        } catch(error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getCourses();
    },[])
    const value = { courses, createCourse }
    return(
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseProvider;