import { createContext, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";

export const StudentDashboardContext = createContext();

const StudentDashboardProvider = ({ children }) => {
    const [subjects, setSubjects] = useState([]);
    const [todayAttendence, setTodayAttendence] = useState([]);
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
    const getTodayAttendence = async (day,month,year,courseId,semester) => {
        try {
            const response = await API.get(`/attendence/get-day-wise-attendence/${day}/${month}/${year}/${courseId}/${semester}`);
            if (response) {
                if (response.data.success) {
                    setTodayAttendence(response.data.attendences);
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
    const value = { subjects, getSubjects, getTodayAttendence, todayAttendence };
    return(
        <StudentDashboardContext.Provider value={value}>
            {children}
        </StudentDashboardContext.Provider>
    )
}

export default StudentDashboardProvider;