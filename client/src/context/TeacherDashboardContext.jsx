import { createContext, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";

export const TeacherDashboardContext = createContext();

const TeacherDashboardProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [assignments, setAssignments] = useState([]);
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
    const getSubjects = async (teacherId) => {
        try {
            const response = await API.get(`/subject/get-subjects/${teacherId}`);
            if (response) {
                if (response.data.success) {
                    setSubjects(response.data.subjects);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong!")
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const getSubjectAssignments = async (subjectId) => {
        try {
            const response = await API.get(`/assignment/get-assignments-teacher/${subjectId}`);
            if (response) {
                if (response.data.success) {
                    setAssignments(response.data.assignments);
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
    const value = { students, getCourseStudents, getSubjects, subjects, getSubjectAssignments, assignments }
    return(
        <TeacherDashboardContext.Provider value={value}>
            {children}
        </TeacherDashboardContext.Provider>
    )
}

export default TeacherDashboardProvider;