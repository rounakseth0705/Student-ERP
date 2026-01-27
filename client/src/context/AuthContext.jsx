import { createContext, useEffect, useState } from "react";
import API from "../config/api.js";
import toast from "react-hot-toast";

export const UserContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userIdentity, setUserIdentity] = useState(null);
    const [token, setToken] = useState(null);
    const [isAdminExists, setIsAdminExists] = useState(null);
    const login = async (userId,password,role) => {
        try {
            let response;
            if (role == "admin") {
                response = await API.post("/user/admin-login", { identifier: userId, password });
                if (response) {
                    setUser(response.data.user);
                    setToken(response.data.token);                   
                    toast.success("Logged in successfully");
                    return;
                } else {
                    toast.error("Something went wrong");
                }
            } else if (role === "teacher") {
                response = await API.post("/teacher/teacher-login", { teacherId: userId, password });
                if (response) {
                    setUser(response.data.user);
                    setUserIdentity(response.data.teacher);
                    setToken(response.data.token);
                    toast.success("Logged in successfully");
                    return;
                } else {
                    toast.error("Something went wrong");
                }
            } else if (role === "student") {
                response = await API.post("/student/student-login", { studentId: userId, password });
                if (response) {
                    setUser(response.data.user);
                    setUserIdentity(response.data.student);
                    setToken(response.data.token);
                    toast.success("Logged in successfully");
                    return;
                } else {
                    toast.error("Something went wrong");
                }
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const checkAdmin = async () => {
        try {
            const response = await API.get("/user/get-admins");
            if (response) {
                if (response.data.success) {
                    setIsAdminExists(true);
                } else {
                    setIsAdminExists(false);
                }
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const createAdmin = async (name,mobileNo,email,password,role,adminSecret) => {
        try {
            const response = await API.post("/user/admin-signup", { name, mobileNo, email, password, role, adminSecret });
            console.log(response);
            if (response) {
                console.log(response.data.user);
                setUser(response.data.user);
                setToken(response.data.token);
                toast.success("Admin created successfully");
            } else {
                toast.error("Something went wrong");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        checkAdmin();
    }, [])
    const value = { user, userIdentity, token, isAdminExists, login, createAdmin };
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider;