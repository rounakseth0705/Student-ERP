import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import homeIconWhite from "../assets/homeIconWhite.svg";

const Courses = () => {
    const { courses, getCourses } = useContext(AdminDashboardContext);
    const navigate = useNavigate();
    const handleGetCourses = async () => {
        await getCourses()
    }
    useEffect(() => {
        handleGetCourses();
    },[]);
    return(
        <>
            <img onClick={() => navigate("/admin-dashboard")} src={homeIconWhite} alt="homeIcon" className="absolute left-10 top-5 w-8 h-8 cursor-pointer"/>
            <h1 className="bg-blue-800 text-center p-5 text-white font-semibold text-2xl sm:text-3xl">List of all Courses</h1>
            <div className="grid gap-5 grid-cols-2 mx-10 my-10 sm:mx-20 md:mx-30 lg:mx-40 sm:grid-cols-3 md:grid-cols-4">
                { courses.length > 0 &&
                    courses.map((course) => (
                        <div onClick={() => navigate(`/admin-dashboard/courses/${course._id}`)} key={course._id} className="flex justify-center items-center p-10 text-white bg-blue-500 rounded hover:shadow-md hover:shadow-blue-500 hover:scale-105 active:scale-105 active:shadow-md active:shadow-blue-500 transition-all duration-700 ease-in-out cursor-pointer">
                            <h1 className="sm:text-2xl">{course.courseName}</h1>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Courses;