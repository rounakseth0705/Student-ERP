import { useState } from "react";
import Navbar from "../components/Navbar";
import crossIcon from "../assets/crossIcon.svg";
import teacherIcon from "../assets/teacherIcon.svg";
import userIconWhite from "../assets/userIconWhite.svg";

const AdminDashboard = () => {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    return(
        <>
            <Navbar setIsMenuClicked={setIsMenuClicked}/>
            { isMenuClicked && <div className="fixed top-0 w-40 h-screen bg-yellow-500 flex flex-col justify-between items-center">
                <span onClick={() => setIsMenuClicked((prev) => !prev)} className="p-5">
                    <img src={crossIcon} alt="crossIcon" className="h-10 w-10 cursor-pointer" />
                </span>
            </div> }
            <div className="grid gird-rows-6 grid-cols-1 gap-5 mt-5 mx-20 sm:mt-10 sm:mx-20 md:mx-30 lg:mx-40 h-[75vh] sm:grid-rows-3 sm:grid-cols-2">
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-300 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1 className="text-white font-semibold">Teachers</h1>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-300 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1 className="text-white font-semibold">Create Teacher</h1>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-300 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1 className="text-white font-semibold">Students</h1>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-300 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1 className="text-white font-semibold">Create Student</h1>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-300 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1 className="text-white font-semibold">Courses</h1>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-300 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1 className="text-white font-semibold">Create Course</h1>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;