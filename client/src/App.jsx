import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import CourseProvider from "./context/CoursesContext";

const App = () => {
    return(
        <div>
            <AuthProvider>
                <CourseProvider>
                    <Toaster/>
                    <Outlet/>
                </CourseProvider>
            </AuthProvider>
        </div>
    )
}

export default App;