import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import AdminDashboardProvider from "./context/AdminDashboardContext";
import TeacherDashboardProvider from "./context/TeacherDashboardContext";

const App = () => {
    return(
        <>
            <AuthProvider>
                <AdminDashboardProvider>
                    <TeacherDashboardProvider>
                        <Toaster/>
                        <Outlet/>
                    </TeacherDashboardProvider>
                </AdminDashboardProvider>
            </AuthProvider>
        </>
    )
}

export default App;