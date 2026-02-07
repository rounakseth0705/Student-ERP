import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/ProfileSidebar.jsx";
import { UserContext } from "../context/AuthContext.jsx";

const TeacherDashboard = () => {
    const { userIdentity } = useContext(UserContext);
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    return(
        <>
            <Navbar setIsMenuClicked={setIsMenuClicked}/>
            <ProfileSidebar isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked}/>
            <div className="grid gird-rows-6 grid-cols-1 gap-5 text-white font-semibold mt-5 mx-20 sm:mt-10 sm:mx-20 md:mx-30 lg:mx-40 h-[75vh] sm:grid-rows-3 sm:grid-cols-2">
                <div className="flex justify-center items-center rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer">
                    <h1>Assignments</h1>
                </div>
                <div className="flex justify-center items-center rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer">
                    <h1>About {userIdentity.courseId.courseName}</h1>
                </div>
                <div className="flex justify-center items-center rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer">
                    <h1>Notes</h1>
                </div>
                <div className="flex justify-center items-center rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer">
                    <h1>Mark Attendence</h1>
                </div>
                <div className="flex justify-center items-center rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer">
                    <h1>Review Students</h1>
                </div>
                <div className="flex justify-center items-center rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer">
                    <h1>Attendence History</h1>
                </div>
            </div>
        </>
    )
}

export default TeacherDashboard;