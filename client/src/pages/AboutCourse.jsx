import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import homeIcon from "../assets/homeIcon.svg";
import { useNavigate } from "react-router-dom";
import CourseDetailsCard from "../components/CourseDetailsCard.jsx";
import SemesterSubjectList from "../components/SemesterSubjectList.jsx";
import CalendarHeader from "../components/CalendarHeader.jsx";

const AboutCourse = () => {
    const { course, getCourse, userIdentity, selectedDate, currentDate } = useContext(UserContext);
    const navigate = useNavigate();
    const handleGetCourse = async () => {
        await getCourse(userIdentity.courseId._id);
    }
    useEffect(() => {
        handleGetCourse();
    },[]);
    return(
        <div>
            <img onClick={() => navigate("/teacher-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-10 top-5 w-8 h-8 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">About {userIdentity.courseId.courseName}</h1>
            <div className="mt-5 flex justify-center items-center">
                <CourseDetailsCard courseName={course.courseName} courseCode={course.courseCode} duration={course.duration} semesters={course.semesters}/>
            </div>
            <div className="mt-5">
                {
                    Array(course.semesters).fill("").map((_,semester) => {
                        const filteredSubjects = subjects.filter(subject => subject.semester === semester+1);
                        <React.Fragment key={semester}>
                            <h1 className="text-white bg-blue-400 font-semibold text-3xl text-center p-3 my-3">Semester {semester+1}</h1>
                            <SemesterSubjectList filteredSubjects={filteredSubjects} courseId={course._id} courseCode={course.courseCode} semester={semester+1}/>
                            <CalendarHeader />
                        </React.Fragment>
                    })
                }
            </div>
        </div>
    )
}

export default AboutCourse;