// import { useContext, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
// import React from "react";
// import leftArrowBlack from "../assets/leftArrowBlack.svg";
// import CourseDetailsCard from "../components/CourseDetailsCard.jsx";
// import { UserContext } from "../context/AuthContext.jsx";
// import CalendarHeader from "../components/CalendarHeader.jsx";
// import SemesterSubjectList from "../components/SemesterSubjectList.jsx";
// import Timetable from "../components/Timetable.jsx";

// const CourseDetails = () => {
//     const { user, course, subjects, getCourse, getSubjects, setSelectedDate, selectedDay, setSelectedDay, currentDate, day, getDate, getSelectedDay, getCurrentClassTime } = useContext(UserContext);
//     const { deleteCourse } = useContext(AdminDashboardContext);
//     const { courseId } = useParams();
//     const navigate = useNavigate();
//     const handleGetCourse = async () => {
//         await getCourse(courseId);
//     }
//     const handleDeleteCourse = async () => {
//         await deleteCourse(course.courseCode);
//     }
//     const handleGetSubjects = async () => {
//         await getSubjects(courseId);
//     }
//     const setSelectedDayAndDate = (index) => {
//         setSelectedDate(getDate(index));
//         setSelectedDay(getSelectedDay(index));
//     }
//     const handlePreviousWeek = () => {
//         // const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
//         // setCurrentDate(sevenDaysAgo.getDate());
//     }
//     const handleNextWeek = () => {
//         // const sevenDaysLater = new Date(new Date().setDate(new Date().getDate() + 7));
//         // setCurrentDate(sevenDaysLater.getDate());
//     }
//     useEffect(() => {
//         handleGetCourse();
//         handleGetSubjects();
//     },[]);
//     return(
//         <div className="bg-gray-50">
//             <div className="flex justify-between items-center py-2 px-2 sm:py-5 sm:px-4 lg:py-4 lg:px-5">
//                 <img onClick={() => navigate("/admin-dashboard/courses")} src={leftArrowBlack} alt="ArrowIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="text-blue-950 font-semibold sm:text-2xl lg:text-3xl">Course Details</h1>
//                 <button onClick={() => navigate(`/${user.role}-dashboard/view-profile`)} className="bg-blue-500 text-white cursor-pointer rounded p-1 text-xs sm:text-base">View Profile</button>
//             </div>
//             <div className="flex flex-col justify-center items-center gap-5">
//                 <CourseDetailsCard courseName={course.courseName} courseCode={course.courseCode} duration={course.duration} semesters={course.semesters}/>
//                 <div className="flex justify-center items-center">
//                     <button onClick={handleDeleteCourse} className="bg-red-600 text-white rounded py-2 px-5 cursor-pointer hover:bg-red-500 transition-all duration-400 ease-in-out text-xs sm:mt-1 sm:text-base">Delete course</button>
//                 </div>
//             </div>
//             <div className="mt-5">
//                 {
//                     Array(course.semesters).fill("").map((_,semester) => {
//                         const filteredSubjects = subjects.filter(subject => subject.semester === semester+1);
//                         return(
//                             <React.Fragment key={semester}>
//                                 <h1 className="text-white bg-blue-400 font-semibold text-2xl text-center p-3 my-3 sm:text-3xl">{course.courseName} - Semester {semester+1}</h1>
//                                 <SemesterSubjectList filteredSubjects={filteredSubjects} courseId={courseId} courseCode={course.courseCode} semester={semester+1}/>
//                                 <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate}/>
//                                 <Timetable filteredSubjects={filteredSubjects} courseId={courseId} semester={semester+1}/>
//                             </React.Fragment>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export default CourseDetails;

import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import React from "react";
import CourseDetailsCard from "../components/CourseDetailsCard.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import CalendarHeader from "../components/CalendarHeader.jsx";
import SemesterSubjectList from "../components/SemesterSubjectList.jsx";
import Timetable from "../components/Timetable.jsx";
// Premium Lucide Icons Ecosystem
import { ArrowLeft, User, Trash2, GraduationCap } from "lucide-react";

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
    const handlePreviousWeek = () => {}
    const handleNextWeek = () => {}

    useEffect(() => {
        handleGetCourse();
        handleGetSubjects();
    }, []);

    return (
        <div className="bg-slate-950 text-slate-300 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Navigation Bar Panel - FORCED SINGLE ROW */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900/60 shadow-xl mb-8">
                <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 flex flex-row flex-nowrap items-center justify-between gap-4">
                    
                    {/* Left Actions: Back Button */}
                    <button 
                        onClick={() => navigate("/admin-dashboard/courses")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0 flex items-center justify-center"
                        aria-label="Back to courses list ledger"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    {/* Centered Component Title */}
                    <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent sm:text-2xl text-center truncate">
                        Course Architecture
                    </h1>
                    
                    {/* Profile Trigger Button */}
                    <button 
                        onClick={() => navigate(`/${user.role}-dashboard/view-profile`)} 
                        className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 border border-slate-800 hover:border-slate-700 shadow-lg active:scale-95 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
                    >
                        <span>Profile</span>
                        <User className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
                    </button>
                </div>
            </div>

            {/* Core Blueprint Layout Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
                
                {/* Structural Profile Detail Card and Modification Blocks */}
                <div className="space-y-4">
                    <CourseDetailsCard 
                        courseName={course.courseName} 
                        courseCode={course.courseCode} 
                        duration={course.duration} 
                        semesters={course.semesters}
                    />
                    <div className="flex justify-center">
                        <button 
                            onClick={handleDeleteCourse} 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 hover:border-rose-800 text-rose-400 hover:text-rose-200 font-bold text-xs sm:text-sm rounded-xl shadow-lg active:scale-98 transition-all duration-300 cursor-pointer focus:outline-none"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove Course Descriptor</span>
                        </button>
                    </div>
                </div>

                {/* Relational Semester Track Containers Iterator */}
                <div className="space-y-12 pt-4">
                    {Array(course.semesters).fill("").map((_, semester) => {
                        const filteredSubjects = subjects.filter(subject => subject.semester === semester + 1);
                        return (
                            <React.Fragment key={semester}>
                                <div className="border border-slate-900 bg-gradient-to-r from-[#090f1c] via-slate-900 to-[#090f1c] rounded-2xl p-4 shadow-xl flex items-center justify-center gap-3">
                                    <GraduationCap className="w-6 h-6 text-blue-400 hidden sm:block" />
                                    <h2 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-200 text-center">
                                        {course.courseName} <span className="text-blue-400 font-mono text-sm sm:text-base font-semibold ml-1.5">Semester {semester + 1}</span>
                                    </h2>
                                </div>
                                
                                <div className="space-y-6">
                                    <SemesterSubjectList filteredSubjects={filteredSubjects} courseId={courseId} courseCode={course.courseCode} semester={semester + 1}/>
                                    <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate}/>
                                    <Timetable filteredSubjects={filteredSubjects} courseId={courseId} semester={semester + 1}/>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default CourseDetails;