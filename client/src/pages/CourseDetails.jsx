import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import React from "react";
import removeIcon from "../assets/removeIcon.svg";
import editIcon from "../assets/editIcon.svg";

const CourseDetails = () => {
    const { course, subjects, deleteCourse, getCourse, getSubjects, deleteSubject } = useContext(AdminDashboardContext);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleGetCourse = async () => {
        await getCourse(courseId);
    }
    const handleDeleteCourse = async () => {
        await deleteCourse(course.courseCode);
    }
    const handleGetSubjects = async (semester) => {
        await getSubjects(courseId,semester);
    }
    const handleDeleteSubject = async (subjectId) => {
        await deleteSubject(subjectId);
    }
    useEffect(() => {
        handleGetCourse();
        handleGetSubjects();
    },[]);
    return(
        <>
            <h1 className="text-center text-blue-950 m-5 text-3xl font-semibold">Course Details</h1>
            <div className="flex flex-col justify-center items-center gap-5">
                <div className="flex flex-col justify-center bg-blue-400 text-white rounded p-8 sm:text-3xl md:text-4xl md:p-10">
                    <h1 className="m-2 p-2">Course name : {course.courseName}</h1>
                    <h1 className="m-2 p-2">Course code : {course.courseCode}</h1>
                    <h1 className="m-2 p-2">Course Duration : {course.duration} years</h1>
                    <h1 className="m-2 p-2">Total Semesters : {course.semesters}</h1>
                </div>
                {/* <div className={`grid grid-cols-2 gap-3 rounded p-5 ${courseDetails.semesters > 4 ? "sm:grid-cols-2" : "sm:grid-cols-1"} md:text-2xl`}>
                    {
                        Array(courseDetails.semesters).fill("").map((_,index) => (
                            <div onClick={() => navigate(`/admin-dashboard/courses/$${courseId}/`)} key={index} className="bg-blue-400 text-white p-5 rounded cursor-pointer hover:bg-blue-300 transition-all duration-400 ease-in-out">Semester {index+1}</div>
                        ))
                    }
                </div> */}
                <div className="flex justify-center items-center">
                    <button onClick={handleDeleteCourse} className="bg-red-600 text-white rounded mt-2 py-2 px-5 cursor-pointer hover:bg-red-500 transition-all duration-400 ease-in-out sm:mt-5 sm:text-2xl">Delete course</button>
                </div>
            </div>
            <div className="mt-5">
                {
                    Array(course.semesters).fill("").map((_,index) => (
                        <React.Fragment key={index}>
                            <h1 className="text-white bg-blue-400 font-semibold text-3xl text-center p-3 my-3">{course.courseName} - Semester {index+1}</h1>
                            <div className="flex justify-between items-center">
                                <h1 className="text-blue-950 text-2xl p-2 mx-5">Subjects List</h1>
                                <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${course.courseCode}/${index+1}/create-subject`)} className="bg-blue-600 text-white rounded cursor-pointer p-2 mx-5 hover:bg-blue-500 transition-all duration-400 ease-in-out">Add Subject</button>
                            </div>
                            <div className="mt-5 text-blue-950">
                                { subjects.length > 0 &&
                                    subjects.filter(subject => subject.semester===index+1).map((subject,index) => (
                                        <div key={index} className="flex justify-around items-center p-2">
                                            <h1>{index+1}.</h1>
                                            <h1 className="">{subject.subjectName}</h1>
                                            <h1>{subject.subjectCode}</h1>
                                            <h1>{subject.teacherId}</h1>
                                            <div className="flex gap-3">
                                                <img src={editIcon} alt="editIcon" className="w-5 h-5 cursor-pointer" />
                                                <img onClick={() => handleDeleteSubject(subject._id)} src={removeIcon} alt="removeIcon" className="w-5 h-5 cursor-pointer" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    )
}

export default CourseDetails;