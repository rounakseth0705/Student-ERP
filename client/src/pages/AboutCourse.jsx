import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import homeIcon from "../assets/homeIcon.svg";
import { useNavigate } from "react-router-dom";
import CourseDetailsCard from "../components/CourseDetailsCard.jsx";
import SemesterSubjectList from "../components/SemesterSubjectList.jsx";
import CalendarHeader from "../components/CalendarHeader.jsx";
import Timetable from "../components/Timetable.jsx";

const AboutCourse = () => {
    const { user, getCourse, course, getSubjects, userIdentity, subjects, setSelectedDay, selectedDate, setSelectedDate, currentDate, day, getDate, getSelectedDay } = useContext(UserContext);
    const navigate = useNavigate();
    const handleGetCourse = async () => {
        await getCourse(userIdentity.courseId._id);
    }
    const handleGetSubjects = async () => {
        await getSubjects(userIdentity.courseId._id);
    }
    const setSelectedDayAndDate = (index) => {
        setSelectedDate(getDate(index));
        setSelectedDay(getSelectedDay(index));
    }
    useEffect(() => {
        handleGetCourse();
        handleGetSubjects();
    },[]);
    return(
        <div className="bg-gray-50">
            <div className="flex justify-between items-center py-2 px-2 sm:py-5 sm:px-4 lg:py-4 lg:px-5">
                <img onClick={() => navigate("/teacher-dashboard")} src={homeIcon} alt="homeIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">About {userIdentity.courseId.courseName}</h1>
                <button onClick={() => navigate(`/${user.role}-dashboard/view-profile`)} className="bg-blue-400 text-white rounded p-1 cursor-pointer text-xs sm:text-base">View Profile</button>
            </div>
            <div className="mt-5 flex justify-center items-center">
                <CourseDetailsCard courseName={course.courseName} courseCode={course.courseCode} duration={course.duration} semesters={course.semesters}/>
            </div>
            <div className="mt-10">
                {
                    Array(course.semesters).fill("").map((_,semester) => {
                        const filteredSubjects = subjects.filter(subject => subject.semester === semester+1);
                        return(
                            <React.Fragment key={semester}>
                                <h1 className="text-white bg-blue-400 font-semibold text-3xl text-center p-3 my-8">Semester {semester+1}</h1>
                                <SemesterSubjectList filteredSubjects={filteredSubjects} courseId={course._id} courseCode={course.courseCode} semester={semester+1}/>
                                <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate}/>
                                <Timetable filteredSubjects={filteredSubjects}/>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AboutCourse;