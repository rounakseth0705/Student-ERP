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
    const getSubjectAssignments = async (courseId,subjectId) => {
        try {
            const response = await API.get(`/assignment/get-assignments-teacher/${courseId}/${subjectId}`);
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
    const createAssignment = async (assignmentName,assignmentSubjectCode,assignmentSubmitDate,assignmentFile) => {
        try {
            const response = await API.post("/assignment/create-assignment", { assignmentName, assignmentSubjectCode, assignmentSubmitDate, assignmentFile });
            if (response) {
                if (response.data.success) {
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
    const updateAssignmentSubmitDate = async (assignmentId,assignmentUpdatedSubmitDate) => {
        try {
            const response = await API.put("/assignment/update-assignment-date", { assignmentId, assignmentUpdatedSubmitDate });
            if (response) {
                if (response.data.success) {
                    setAssignments((prev) => prev.map(assignment => assignment.assignmentId === assignmentId ? { ...assignment, active: true } : assignment));
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
    const deleteAssignment = async (assignmentId) => {
        try {
            const response = await API.delete(`assignment/delete-assignment/${assignmentId}`);
            if (response) {
                if (response.data.success) {
                    setAssignments(prev => prev.filter(assignment => assignment._id === assignmentId));
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
    // const downloadAssignment = async (courseId,subjectId) => {
    //     try {
    //         const response = await API.get(`/download-assignment/${courseId}/${subjectId}`);
    //         if (response) {
    //             if (response.data.success) {
                    
    //             } else {
    //                 toast.error(response.data.message);
    //             }
    //         } else {
    //             toast.error("Something went wrong!");
    //         }
    //     } catch(error) {
    //         toast.error(error.message);
    //     }
    // }
    const value = { students, getCourseStudents, getSubjects, subjects, getSubjectAssignments, assignments, updateAssignmentSubmitDate, deleteAssignment, createAssignment }
    return(
        <TeacherDashboardContext.Provider value={value}>
            {children}
        </TeacherDashboardContext.Provider>
    )
}

export default TeacherDashboardProvider;