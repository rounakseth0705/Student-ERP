import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import AdminDashboardProvider from "./context/AdminDashboardContext";

const App = () => {
    return(
        <div>
            <AuthProvider>
                <AdminDashboardProvider>
                    <Toaster/>
                    <Outlet/>
                </AdminDashboardProvider>
            </AuthProvider>
        </div>
    )
}

export default App;