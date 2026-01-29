import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    return(
        <>
            <Navbar setIsMenuClicked={setIsMenuClicked}/>
            <ProfileSidebar isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked}/>
            <div className="grid gird-rows-6 grid-cols-1 gap-5 text-white font-semibold mt-5 mx-20 sm:mt-10 sm:mx-20 md:mx-30 lg:mx-40 h-[75vh] sm:grid-rows-3 sm:grid-cols-2">
                <div onClick={() => navigate("/admin-dashboard/teachers")} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>Teachers</h1>
                </div>
                <div onClick={() => navigate("/admin-dashboard/create-teacher")} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>Create Teacher</h1>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>Students</h1>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>Create Student</h1>
                </div>
                <div onClick={() => navigate("/admin-dashboard/courses")} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>Courses</h1>
                </div>
                <div onClick={() => navigate("/admin-dashboard/create-course")} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>Create Course</h1>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;