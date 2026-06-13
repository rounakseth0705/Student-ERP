// import React, { useContext, useEffect } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import homeIcon from "../assets/homeIcon.svg";
// import { useNavigate } from "react-router-dom";
// import CourseDetailsCard from "../components/CourseDetailsCard.jsx";
// import SemesterSubjectList from "../components/SemesterSubjectList.jsx";
// import CalendarHeader from "../components/CalendarHeader.jsx";
// import Timetable from "../components/Timetable.jsx";

// const AboutCourse = () => {
//     const { user, getCourse, course, getSubjects, userIdentity, subjects, setSelectedDay, selectedDate, setSelectedDate, currentDate, day, getDate, getSelectedDay } = useContext(UserContext);
//     const navigate = useNavigate();
//     const handleGetCourse = async () => {
//         await getCourse(userIdentity.courseId._id);
//     }
//     const handleGetSubjects = async () => {
//         await getSubjects(userIdentity.courseId._id);
//     }
//     const setSelectedDayAndDate = (index) => {
//         setSelectedDate(getDate(index));
//         setSelectedDay(getSelectedDay(index));
//     }
//     useEffect(() => {
//         handleGetCourse();
//         handleGetSubjects();
//     },[]);
//     return(
//         <div className="bg-gray-50">
//             <div className="flex justify-between items-center py-2 px-2 sm:py-5 sm:px-4 lg:py-4 lg:px-5">
//                 <img onClick={() => navigate("/teacher-dashboard")} src={homeIcon} alt="homeIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">About {userIdentity.courseId.courseName}</h1>
//                 <button onClick={() => navigate(`/${user.role}-dashboard/view-profile`)} className="bg-blue-400 text-white rounded p-1 cursor-pointer text-xs sm:text-base">View Profile</button>
//             </div>
//             <div className="mt-5 flex justify-center items-center">
//                 <CourseDetailsCard courseName={course.courseName} courseCode={course.courseCode} duration={course.duration} semesters={course.semesters}/>
//             </div>
//             <div className="mt-10">
//                 {
//                     Array(course.semesters).fill("").map((_,semester) => {
//                         const filteredSubjects = subjects.filter(subject => subject.semester === semester+1);
//                         return(
//                             <React.Fragment key={semester}>
//                                 <h1 className="text-white bg-blue-400 font-semibold text-3xl text-center p-3 my-8">Semester {semester+1}</h1>
//                                 <SemesterSubjectList filteredSubjects={filteredSubjects} courseId={course._id} courseCode={course.courseCode} semester={semester+1}/>
//                                 <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate}/>
//                                 <Timetable filteredSubjects={filteredSubjects}/>
//                             </React.Fragment>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export default AboutCourse;

import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import CourseDetailsCard from "../components/CourseDetailsCard.jsx";
import SemesterSubjectList from "../components/SemesterSubjectList.jsx";
import CalendarHeader from "../components/CalendarHeader.jsx";
import Timetable from "../components/Timetable.jsx";
// Premium Lucide Icons Ecosystem
import { Home, User, GraduationCap } from "lucide-react";

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
    }, []);

    return (
        <div className="bg-slate-950 text-slate-300 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Navigation Bar Panel - FORCED SINGLE ROW */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900/60 shadow-xl mb-8">
                <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 flex flex-row flex-nowrap items-center justify-between gap-4">
                    
                    {/* Left Actions: Back to Dashboard Home Button */}
                    <button 
                        onClick={() => navigate("/teacher-dashboard")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0 flex items-center justify-center"
                        aria-label="Back to dashboard home overview"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                    
                    {/* Centered Component Title */}
                    <h1 className="text-base font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent sm:text-xl md:text-2xl text-center truncate max-w-xs sm:max-w-md md:max-w-xl">
                        About {userIdentity?.courseId?.courseName}
                    </h1>
                    
                    {/* Right Actions: View Profile Context Control Trigger */}
                    <button 
                        onClick={() => navigate(`/${user.role}-dashboard/view-profile`)} 
                        className="group inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 border border-slate-800 hover:border-slate-700 shadow-lg active:scale-95 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
                    >
                        <span className="hidden sm:inline">View Profile</span>
                        <User className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
                    </button>
                </div>
            </div>

            {/* Core Blueprint Layout Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
                
                {/* Course Metadata Meta Detail Card Frame Wrapper */}
                <div className="w-full flex justify-center transform transition-all duration-300">
                    <CourseDetailsCard 
                        courseName={course.courseName} 
                        courseCode={course.courseCode} 
                        duration={course.duration} 
                        semesters={course.semesters}
                    />
                </div>

                {/* Relational Semester Track Containers Iterator */}
                <div className="space-y-12 pt-2">
                    {Array(course.semesters).fill("").map((_, semester) => {
                        const filteredSubjects = subjects.filter(subject => subject.semester === semester + 1);
                        return (
                            <React.Fragment key={semester}>
                                
                                {/* Section Banner Card Segment */}
                                <div className="border border-slate-900 bg-gradient-to-r from-[#090f1c] via-slate-900 to-[#090f1c] rounded-2xl p-4 shadow-xl flex items-center justify-center gap-3 mt-8">
                                    <GraduationCap className="w-6 h-6 text-blue-400 hidden sm:block" />
                                    <h2 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-200 text-center">
                                        Semester <span className="text-blue-400 font-mono text-sm sm:text-base font-semibold ml-1">{semester + 1}</span>
                                    </h2>
                                </div>
                                
                                {/* Modular Context Data Render Layout Components */}
                                <div className="space-y-6">
                                    <SemesterSubjectList filteredSubjects={filteredSubjects} courseId={course._id} courseCode={course.courseCode} semester={semester + 1}/>
                                    <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate}/>
                                    <Timetable filteredSubjects={filteredSubjects}/>
                                </div>
                                
                            </React.Fragment>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default AboutCourse;