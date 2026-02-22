import { createContext, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";

export const StudentDashboardContext = createContext();

const StudentDashboardProvider = ({ children }) => {
    const [subjects, setSubjects] = useState([]);
    const getSubjects = async (courseId,semester) => {
        try {
            const response = await API.get(`/subject/get-semester-subjects/${courseId}/${semester}`);
            if (response) {
                if (response.data.success) {
                    setSubjects(response.data.subjects);
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
    const value = { subjects, getSubjects };
    return(
        <StudentDashboardContext.Provider value={value}>
            {children}
        </StudentDashboardContext.Provider>
    )
}

export default StudentDashboardProvider;