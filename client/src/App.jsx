import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import AdminDashboardProvider from "./context/AdminDashboardContext";
import TeacherDashboardProvider from "./context/TeacherDashboardContext";
import StudentDashboardProvider from "./context/StudentDashboardContext";

const App = () => {
    return(
        <>
            <AuthProvider>
                <AdminDashboardProvider>
                    <TeacherDashboardProvider>
                        <StudentDashboardProvider>
                            <Toaster/>
                            <Outlet/>
                        </StudentDashboardProvider>
                    </TeacherDashboardProvider>
                </AdminDashboardProvider>
            </AuthProvider>
        </>
    )
}

export default App;