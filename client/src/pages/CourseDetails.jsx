import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import React from "react";
import leftArrowBlack from "../assets/leftArrowBlack.svg";
import CourseDetailsCard from "../components/CourseDetailsCard.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import CalendarHeader from "../components/CalendarHeader.jsx";
import SemesterSubjectList from "../components/SemesterSubjectList.jsx";
import Timetable from "../components/Timetable.jsx";

const CourseDetails = () => {
    const { user, course, subjects, getCourse, getSubjects, setSelectedDate, selectedDay, setSelectedDay, currentDate, day, getDate, getSelectedDay, getCurrentClassTime } = useContext(UserContext);
    const { deleteCourse } = useContext(AdminDashboardContext);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleGetCourse = async () => {
        await getCourse(courseId);
    }
    const handleDeleteCourse = async () => {
        await deleteCourse(course.courseCode);
    }
    const handleGetSubjects = async () => {
        await getSubjects(courseId);
    }
    const setSelectedDayAndDate = (index) => {
        setSelectedDate(getDate(index));
        setSelectedDay(getSelectedDay(index));
    }
    const handlePreviousWeek = () => {
        // const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        // setCurrentDate(sevenDaysAgo.getDate());
    }
    const handleNextWeek = () => {
        // const sevenDaysLater = new Date(new Date().setDate(new Date().getDate() + 7));
        // setCurrentDate(sevenDaysLater.getDate());
    }
    useEffect(() => {
        handleGetCourse();
        handleGetSubjects();
    },[]);
    return(
        <div className="bg-gray-50">
            <div className="flex justify-between items-center py-2 px-2 sm:py-5 sm:px-4 lg:py-4 lg:px-5">
                <img onClick={() => navigate("/admin-dashboard/courses")} src={leftArrowBlack} alt="ArrowIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="text-blue-950 font-semibold sm:text-2xl lg:text-3xl">Course Details</h1>
                <button onClick={() => navigate(`/${user.role}-dashboard/view-profile`)} className="bg-blue-500 text-white cursor-pointer rounded p-1 text-xs sm:text-base">View Profile</button>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
                <CourseDetailsCard courseName={course.courseName} courseCode={course.courseCode} duration={course.duration} semesters={course.semesters}/>
                <div className="flex justify-center items-center">
                    <button onClick={handleDeleteCourse} className="bg-red-600 text-white rounded py-2 px-5 cursor-pointer hover:bg-red-500 transition-all duration-400 ease-in-out text-xs sm:mt-1 sm:text-base">Delete course</button>
                </div>
            </div>
            <div className="mt-5">
                {
                    Array(course.semesters).fill("").map((_,semester) => {
                        const filteredSubjects = subjects.filter(subject => subject.semester === semester+1);
                        return(
                            <React.Fragment key={semester}>
                                <h1 className="text-white bg-blue-400 font-semibold text-2xl text-center p-3 my-3 sm:text-3xl">{course.courseName} - Semester {semester+1}</h1>
                                <SemesterSubjectList filteredSubjects={filteredSubjects} courseId={courseId} courseCode={course.courseCode} semester={semester+1}/>
                                <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate}/>
                                <Timetable filteredSubjects={filteredSubjects} courseId={courseId} semester={semester+1}/>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CourseDetails;