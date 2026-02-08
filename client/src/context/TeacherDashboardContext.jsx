import { createContext, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";

export const TeacherDashboardContext = createContext();

const TeacherDashboardProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const getCourseStudents = async (courseId) => {
        try {
            const response = await API.get(`/student/get-students/${courseId}`);
            if (response) {
                if (response.data.success) {
                    setStudents(response.data.students);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const value = { students, getCourseStudents }
    return(
        <TeacherDashboardContext.Provider value={value}>
            {children}
        </TeacherDashboardContext.Provider>
    )
}

export default TeacherDashboardProvider;