import { createContext, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AdminDashboardContext = createContext();

const AdminDashboardProvider = ({ children }) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    // const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const getCourses = async () => {
        try {
            const response = await API.get("/course/get-courses");
            if (response) {
                if (response.data.success) {
                    setCourses(response.data.courses);
                    toast.success(response.data.message);
                    return;
                }
            } else {
                toast.error("Something went wrong!");
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
                toast.error("Something went wrong!");
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
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const createUser = async (name,mobileNo,email,password,role) => {
        try {
            const response = await API.post("/user/create-user", { name, mobileNo, email, password, role });
            return response;
        } catch(error) {
            toast.error(error.message);
        }
    }
    const deleteUser = async (userId) => {
        try {
            const response = await API.delete(`user/delete-user/${userId}`);
            return response;
        } catch(error) {
            toast.error(error.message);
        }
    }
    const createTeacher = async (name,mobileNo,email,password,courseCode,employeeId,role) => {
        try {
            const response1 = await createUser(name,mobileNo,email,password,role);
            if (response1) {
                if (response1.data.success) {
                    const userId = response1.data.userId;
                    const response2 = await API.post("/teacher/create-teacher", { userId, courseCode, employeeId });
                    if (response2) {
                        if (response2.data.success) {
                            setTeachers((prev) => [...prev,response2.data.teacher]);
                            toast.success(response2.data.message);
                            navigate("/admin-dashboard");
                        } else {
                            toast.error(response2.data.message);
                        }
                    }
                } else {
                    toast.error(response1.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const deleteTeacher = async (teacherId,employeeId) => {
        try {
            const response1 = await API.delete(`teacher/delete-teacher/${teacherId}/${employeeId}`);
            if (response1) {
                if (response1.data.success) {
                    const response2 = await deleteUser(response1.data.deletedTeacher.userId);
                    if (response2) {
                        if (response2.data.success) {
                            setTeachers((prev) => prev.filter(teacher => teacher.teacherId !== teacherId && teacher.employeeId !== employeeId));
                            toast.success(response1.data.message);
                        } else {
                            toast.error(response2.data.message);
                        }
                    } else {
                        toast.error("Something went wrong!");
                    }
                } else {
                    toast.error(response1.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const getTeachers = async () => {
        try {
            const response = await API.get("/teacher/get-teachers");
            if (response) {
                if (response.data.success) {
                    setTeachers(response.data.teachers);
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
    // const getSubjects = async (courseId) => {
    //     try {
    //         const response = await API.get(`/subject/fetch-subjects/${courseId}`);
    //         if (response) {
    //             if (response.data.success) {
    //                 setSubjects(response.data.subjects);
    //             } else {
    //                 toast.error(response.data.message);
    //             }
    //         } else {
    //             toast.error("Something went wrong!");
    //         }
    //     } catch(error) {
    //         console.log(error.message);
    //     }
    // }
    const createSubject = async (courseId,courseCode,subjectName,subjectCode,semester,teacherId) => {
        try {
            const response = await API.post("/subject/create-subject", { courseCode, subjectName, subjectCode, semester, teacherId });
            if (response) {
                if (response.data.success) {
                    setSubjects((prev) => [...prev,response.data.subject]);
                    toast.success(response.data.message);
                    navigate(`/admin-dashboard/courses/${courseId}`);
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
    const deleteSubject = async (subjectId) => {
        try {
            const response = await API.delete(`/subject/delete-subject/${subjectId}`);
            if (response) {
                if (response.data.success) {
                    setSubjects((prev) => prev.filter(subject => subject._id !== subjectId));
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
    const changeSubjectTeacher = async (subjectCode,teacherId,newTeacherId) => {
        try {
            const response = await API.put("/subject/update-subject-teacher", { subjectCode, teacherId, newTeacherId });
            if (response) {
                if (response.data.success) {
                    setSubjects((prev) => prev.filter(subject => subject.subjectCode !== subjectCode));
                    setSubjects((prev) => [...prev,response.data.updatedSubject]);
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
    const scheduleClass = async (subjectName,subjectCode,courseId,semester,day,classTime) => {
        try {
            const response = await API.put("subject/schedule-class", { subjectName, subjectCode, courseId, semester, day, classTime });
            if (response) {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate(`/admin-dashboard/courses/${courseId}`);
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
    const updateSchedule = async (subjectName,subjectCode,courseId,semester,day,classTime) => {
        try {
            const response = await API.put("/subject/update-schedule", { subjectName, subjectCode, courseId, semester, day, classTime });
            if (response) {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate(`/admin-dashboard/courses/${courseId}`);
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
    const createStudent = async (name,mobileNo,email,password,courseCode,rollNo,role) => {
        try {
            const response1 = await createUser(name,mobileNo,email,password,role);
            if (response1) {
                if (response1.data.success) {
                    const userId = response1.data.userId;
                    const response2 = await API.post("/student/create-student", { userId, courseCode, rollNo });
                    if (response2.data.success) {
                        setStudents((prev) => [...prev,response2.data.student]);
                        toast.success(response2.data.message);
                        navigate("/admin-dashboard");
                    } else {
                        toast.error(response2.data.message);
                    }
                } else {
                    toast.error(response1.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const deleteStudent = async (studentId,rollNo) => {
        try {
            const response1 = await API.delete(`student/delete-student/${studentId}/${rollNo}`);
            if (response1) {
                if (response1.data.success) {
                    const response2 = await deleteUser(response1.data.deletedStudent.userId);
                    if (response2) {
                        if (response2.data.success) {
                            setStudents(prev => prev.filter(student => student.studentId !== studentId && student.rollNo !== rollNo));
                            toast.success(response1.data.message);
                        } else {
                            toast.error(response2.data.message);
                        }
                    } else {
                        toast.error("Something went wrong!");
                    }
                } else {
                    toast.error(response1.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const getStudents = async () => {
        try {
            const response = await API.get("/student/get-students");
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
    const value = { courses, teachers, students, createCourse, getCourses, deleteCourse, createTeacher, deleteTeacher, getTeachers, createSubject, deleteSubject, changeSubjectTeacher, scheduleClass, updateSchedule, createStudent, deleteStudent, getStudents }
    return(
        <AdminDashboardContext.Provider value={value}>
            {children}
        </AdminDashboardContext.Provider>
    )
}

export default AdminDashboardProvider;