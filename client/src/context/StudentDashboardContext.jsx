import { createContext, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";

export const StudentDashboardContext = createContext();

const StudentDashboardProvider = ({ children }) => {
    const [subjects, setSubjects] = useState([]);
    const [todayAttendence, setTodayAttendence] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [notes, setNotes] = useState([]);
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
    const getSubjectWiseAttendance = async (subjectIds) => {
        try {
            const response = await API.get(`attendance/get-subject-wise-attendance/${subjectIds}`);
            if (response) {
                if (response.data.success) {
                    toast.success(response.data.success);
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
    const getAssignments = async (assignmentsSubjectId,assignmentsCourseId,semester) => {
        try {
            const response = await API.get(`/assignment/get-assignments-student/${assignmentsSubjectId}/${assignmentsCourseId}/${semester}`);
            if (response) {
                if (response.data.success) {
                    setAssignments(response.data.assignments);
                    if (response.data.assignments.length > 0) {
                        toast.success(response.data.message);
                    }
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
    const uploadAssignment = async (subjectId,assignmentId,assignmentUploadFile) => {
        try {
            const response = await API.post("/assignmentUploads/upload-assignment", { subjectId, assignmentId, assignmentUploadFile });
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
    const getNotes = async (notesSubjectId,notesCourseId,semester) => {
        try {
            const response = await API.get(`/notes/get-notes-student/${notesSubjectId}/${notesCourseId}/${semester}`);
            if (response) {
                if (response.data.success) {
                    setNotes(response.data.notes);
                    if (response.data.notes.length > 0) {
                        toast.success(response.data.message);
                    }
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
    const value = { subjects, getSubjects, getTodayAttendence, todayAttendence, getSubjectWiseAttendance, getNotes, notes, assignments, getAssignments, uploadAssignment };
    return(
        <StudentDashboardContext.Provider value={value}>
            {children}
        </StudentDashboardContext.Provider>
    )
}

export default StudentDashboardProvider;