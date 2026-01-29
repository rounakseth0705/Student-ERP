import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../context/CoursesContext.jsx";

const CourseDetails = () => {
    const { courses } = useContext(CourseContext);
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
    useEffect(() => {
        getCourse();
    })
    return(
        <>
            <h1 className="text-center text-blue-950 m-5 text-3xl font-semibold">Course Details</h1>
            <div className="flex justify-around gap-5 m-10">
                <div className="bg-blue-400 text-white rounded p-10 text-2xl">
                    <h1>Course name : {courseDetails.courseName}</h1>
                    <h1>Course code : {courseDetails.courseCode}</h1>
                    <h1>Course Duration : {courseDetails.duration} years</h1>
                    <h1>Total Semesters : {courseDetails.semesters}</h1>
                </div>
                <div className="grid grid-cols-1 gap-2 bg-blue-400 text-2xl rounded p-5">
                    {
                        Array(courseDetails.semesters).fill("").map((_,index) => (
                            <div key={index} className="bg-white text-blue-950">Semester {index+1}</div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CourseDetails;