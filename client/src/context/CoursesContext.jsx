import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../config/api.js";

export const CourseContext = createContext();

const CourseProvider = ({children}) => {
    const [courses, setCourses] = useState([]);
    const getCourses = async () => {
        try {
            const response = await API.get("/course/get-courses");
            if (response) {
                if (response.data.success) {
                    setCourses(response.data.courses);
                    toast.success(response.data.message);
                    return;
                }
            }
            toast.error("Something went wrong");
        } catch(error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getCourses();
    },[])
    const value = { courses }
    return(
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseProvider;