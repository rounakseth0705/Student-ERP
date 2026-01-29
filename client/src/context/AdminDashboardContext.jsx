import { createContext, useEffect, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AdminDashboardContext = createContext();

const AdminDashboardProvider = ({children}) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
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
            toast.error(error.message);
        }
    }
    const deleteCourse = async (courseCode) => {
        try {
            const response = await API.delete(`/course/delete-course/${courseCode}`);
            if (response) {
                if (response.data.success) {
                    setCourses((prev) => prev.filter((course) => course.courseCode !== courseCode));
                    toast.success(response.data.message);
                    navigate("/admin-dashboard");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const createTeacher = async (name,mobileNo,email,password,courseCode,employeeId) => {
        try {
            const response1 = await API.post("/user/create-user", { name, mobileNo, email, password, role: "teacher" });
            if (response1) {
                if (response1.data.success) {
                    const response2 = await API.post("/teacher/create-teacher", { userId: response1.data.userId, name, courseCode, employeeId });
                    if (response2) {
                        if (response2.data.success) {
                            setTeachers((prev) => [...prev,response2.data.teacher]);
                            toast.success(response2.data.message);
                            navigate("/admin-dashboard");
                        }
                    }
                } else {
                    toast.error(response1.data.message);
                }
            } else {
                toast.error("Something went wrong");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getCourses();
    },[])
    const value = { courses, teachers, createCourse, deleteCourse, createTeacher }
    return(
        <AdminDashboardContext.Provider value={value}>
            {children}
        </AdminDashboardContext.Provider>
    )
}

export default AdminDashboardProvider;