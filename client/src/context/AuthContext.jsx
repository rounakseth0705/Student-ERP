import { createContext, useEffect, useState } from "react";
import API from "../config/api.js";

export const UserContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userIdentity, setUserIdentity] = useState(null);
    const [token, setToken] = useState(null);
    const login = async (userId,password,role) => {
        try {
            let response;
            if (role == "admin") {
                response = await API.post("/user/admin-login", { identifier: userId, password });
                if (response?.data?.success) {
                    setUser(response.data.user);
                    setToken(response.data.token);
                }
            } else if (role === "teacher") {
                response = await API.post("/teacher/teacher-login", { teacherId: userId, password });
                if (response?.data?.success) {
                    setUser(response.data.user);
                    setUserIdentity(response.data.teacher);
                    setToken(response.data.token);
                }
            } else if (role === "student") {
                response = await API.post("/student/student-login", { studentId: userId, password });
                if (response?.data?.success) {
                    setUser(response.data.user);
                    setUserIdentity(response.data.student);
                    setToken(response.data.token);
                }
            }
        } catch(error) {
            console.log(error.message);
        }
    }
    const checkAdmin = async () => {
        try {
            
        } catch(error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        checkAdmin();
    }, [])
    const value = { user, userIdentity, token, login };
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider;