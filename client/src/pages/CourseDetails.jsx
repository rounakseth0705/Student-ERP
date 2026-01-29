import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";

const CourseDetails = () => {
    const { courses, deleteCourse } = useContext(AdminDashboardContext);
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState({});
    const getCourse = () => {
        for (let course of courses) {
            if (course._id === courseId) {
                setCourseDetails(course);
                return;
            }
        }
    }
    const handleDeleteCourse = async (event) => {
        event.preventDefault();
        await deleteCourse(courseDetails.courseCode);
    }
    useEffect(() => {
        getCourse();
    })
    return(
        <>
            <h1 className="text-center text-blue-950 m-5 text-3xl font-semibold">Course Details</h1>
            <div className="flex flex-col justify-around gap-5 m-5 mt-10 sm:flex-row lg:m-10">
                <div className="flex flex-col justify-center bg-blue-400 text-white rounded p-5 sm:text-2xl md:text-3xl md:p-10">
                    <h1 className="m-1 p-1 sm:m-2 sm:p-2">Course name : {courseDetails.courseName}</h1>
                    <h1 className="m-1 p-1 sm:m-2 sm:p-2">Course code : {courseDetails.courseCode}</h1>
                    <h1 className="m-1 p-1 sm:m-2 sm:p-2">Course Duration : {courseDetails.duration} years</h1>
                    <h1 className="m-1 p-1 sm:m-2 sm:p-2">Total Semesters : {courseDetails.semesters}</h1>
                </div>
                <div className={`grid grid-cols-2 gap-3 rounded p-5 ${courseDetails.semesters > 4 ? "sm:grid-cols-2" : "sm:grid-cols-1"} md:text-2xl`}>
                    {
                        Array(courseDetails.semesters).fill("").map((_,index) => (
                            <div key={index} className="bg-blue-400 text-white p-5 rounded cursor-pointer hover:bg-blue-300 transition-all duration-400 ease-in-out">Semester {index+1}</div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={(event) => handleDeleteCourse(event)} className="bg-red-600 text-white rounded mt-2 py-2 px-5 cursor-pointer hover:bg-red-500 transition-all duration-400 ease-in-out sm:mt-5 sm:text-2xl">Delete course</button>
            </div>
        </>
    )
}

export default CourseDetails;