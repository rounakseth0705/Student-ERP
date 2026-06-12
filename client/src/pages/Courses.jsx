// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
// import homeIconWhite from "../assets/homeIconWhite.svg";

// const Courses = () => {
//     const { courses, getCourses } = useContext(AdminDashboardContext);
//     const navigate = useNavigate();
//     const handleGetCourses = async () => {
//         await getCourses()
//     }
//     useEffect(() => {
//         handleGetCourses();
//     },[]);
//     return(
//         <>
//             <img onClick={() => navigate("/admin-dashboard")} src={homeIconWhite} alt="homeIcon" className="absolute left-10 top-5 w-8 h-8 cursor-pointer"/>
//             <h1 className="bg-blue-800 text-center p-5 text-white font-semibold text-2xl sm:text-3xl">List of all Courses</h1>
//             <div className="grid gap-5 grid-cols-2 mx-10 my-10 sm:mx-20 md:mx-30 lg:mx-40 sm:grid-cols-3 md:grid-cols-4">
//                 { courses.length > 0 &&
//                     courses.map((course) => (
//                         <div onClick={() => navigate(`/admin-dashboard/courses/${course._id}`)} key={course._id} className="flex justify-center items-center p-10 text-white bg-blue-500 rounded hover:shadow-md hover:shadow-blue-500 hover:scale-105 active:scale-105 active:shadow-md active:shadow-blue-500 transition-all duration-700 ease-in-out cursor-pointer">
//                             <h1 className="sm:text-2xl">{course.courseName}</h1>
//                         </div>
//                     ))
//                 }
//             </div>
//         </>
//     )
// }

// export default Courses;

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import { Home, GraduationCap } from "lucide-react";

const Courses = () => {
    const { courses, getCourses } = useContext(AdminDashboardContext);
    const navigate = useNavigate();

    const handleGetCourses = async () => {
        await getCourses();
    };

    useEffect(() => {
        handleGetCourses();
    }, []);

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 font-sans p-4 sm:p-6 lg:p-8 selection:bg-blue-600 selection:text-white">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Modern Dynamic Header Row (Fixes absolute overlapping) */}
                <div className="flex items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-4 rounded-2xl shadow-xl">
                    <button 
                        onClick={() => navigate("/admin-dashboard")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0"
                        aria-label="Go Home"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                    <h1 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
                        List of all Courses
                    </h1>
                </div>

                {/* Responsive Grid System Tracking */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div 
                                onClick={() => navigate(`/admin-dashboard/courses/${course._id}`)} 
                                key={course._id} 
                                className="group relative flex flex-col justify-between items-start p-6 min-h-[140px] rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 shadow-xl cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/[0.02] hover:shadow-blue-500/[0.02] transform hover:-translate-y-1 transition-all duration-300 ease-out"
                            >
                                {/* Decorative Corner Gradient Effect */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Icon Indicator */}
                                <div className="p-2 bg-slate-950/60 border border-slate-800/60 rounded-xl text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-colors shrink-0">
                                    <GraduationCap className="w-5 h-5" />
                                </div>

                                {/* Course Title Info */}
                                <div className="w-full mt-4">
                                    <h1 className="text-sm sm:text-base font-bold text-slate-200 group-hover:text-white tracking-wide truncate transition-colors">
                                        {course.courseName}
                                    </h1>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-1">
                                        View Details &rarr;
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center text-sm text-slate-500 font-medium bg-slate-900/10 border border-slate-900/60 rounded-2xl">
                            No academic courses registered in the database.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Courses;