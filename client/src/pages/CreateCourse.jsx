// import { useContext, useState } from "react";
// import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
// import toast from "react-hot-toast";
// import homeIcon from "../assets/homeIcon.svg";
// import { useNavigate } from "react-router-dom";

// const CreateCourse = () => {
//     const { createCourse } = useContext(AdminDashboardContext);
//     const navigate = useNavigate();
//     const [courseName, setCourseName] = useState("");
//     const [courseCode, setCourseCode] = useState("");
//     const [courseDuration, setCourseDuration] = useState("");
//     const handleCourseSubmit = async (event) => {
//         const numericDuration = Number(courseDuration);
//         if (Number.isNaN(numericDuration)) {
//             toast.error("Invalid course duration");
//             return;
//         }
//         event.preventDefault();
//         await createCourse(courseName,courseCode,courseDuration);
//     }
//     return(
//         <div className="flex flex-col justify-center items-center">
//             <img onClick={() => navigate("/admin-dashboard")} src={homeIcon} alt="homeIcon" className="fixed left-15 top-10 w-10 h-10 cursor-pointer"/>
//             <h1 className="text-blue-900 text-4xl mt-5 p-5 font-bold">Create course</h1>
//             <form className="flex flex-col justify-center items-center mt-4 p-3 w-70 bg-blue-400 rounded-2xl shadow-2xl sm:p-5 sm:w-120 md:w-150 lg:w-200">
//                 <div className="flex flex-col justify-center items-center m-2">
//                     <h1 className="m-2 text-2xl">Course name</h1>
//                     <input onChange={(event) => setCourseName(event.target.value)} value={courseName} type="text" placeholder="enter course name" className="outline-0 m-2 p-2 w-50 bg-gray-300 rounded-full sm:w-100 sm:p-5" required />
//                 </div>
//                 <div className="flex flex-col justify-center items-center m-2">
//                     <h1 className="m-2 text-2xl">Course code</h1>
//                     <input onChange={(event) => setCourseCode(event.target.value)} value={courseCode} type="text" placeholder="enter course code" className="outline-0 m-2 p-2 w-50 bg-gray-300 rounded-full sm:w-100 sm:p-5" required />
//                 </div>
//                 <div className="flex flex-col justify-center items-center m-2">
//                     <h1 className="m-2 text-2xl">Course duration</h1>
//                     <input onChange={(event) => setCourseDuration(event.target.value)} value={courseDuration} type="text" placeholder="enter course duration" className="outline-0 m-2 p-2 w-50 bg-gray-300 rounded-full sm:w-100 sm:p-5" required />
//                 </div>
//                 <button onClick={(event) => handleCourseSubmit(event)} className="bg-gray-300 text-blue-950 rounded mt-1 py-2 px-4">Submit</button>
//             </form>
//         </div>
//     )
// }

// export default CreateCourse;

import { useContext, useState } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Home, PlusCircle } from "lucide-react";

const CreateCourse = () => {
    const { createCourse } = useContext(AdminDashboardContext);
    const navigate = useNavigate();
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseDuration, setCourseDuration] = useState("");

    const handleCourseSubmit = async (event) => {
        // Validation check logic remains untouched
        const numericDuration = Number(courseDuration);
        if (Number.isNaN(numericDuration)) {
            toast.error("Invalid course duration");
            return;
        }
        event.preventDefault();
        await createCourse(courseName, courseCode, courseDuration);
    };

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-600 selection:text-white">
            <div className="max-w-xl mx-auto space-y-6">
                
                {/* Modern Dynamic Header Row */}
                <div className="flex items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-4 rounded-2xl shadow-xl">
                    <button 
                        type="button"
                        onClick={() => navigate("/admin-dashboard")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0"
                        aria-label="Go Home"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                    <h1 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
                        Create Course
                    </h1>
                </div>

                {/* Central Form Workspace Panel */}
                <form 
                    onSubmit={handleCourseSubmit}
                    className="bg-slate-900/20 backdrop-blur-xl border border-slate-900 p-5 sm:p-8 rounded-2xl shadow-2xl space-y-5"
                >
                    {/* Course Name Input Row */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">
                            Course Name
                        </label>
                        <input 
                            onChange={(event) => setCourseName(event.target.value)} 
                            value={courseName} 
                            type="text" 
                            placeholder="Enter course name" 
                            className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                            required 
                        />
                    </div>

                    {/* Course Code Input Row */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">
                            Course Code
                        </label>
                        <input 
                            onChange={(event) => setCourseCode(event.target.value)} 
                            value={courseCode} 
                            type="text" 
                            placeholder="Enter course code" 
                            className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                            required 
                        />
                    </div>

                    {/* Course Duration Input Row */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">
                            Course Duration (Years)
                        </label>
                        <input 
                            onChange={(event) => setCourseDuration(event.target.value)} 
                            value={courseDuration} 
                            type="text" 
                            placeholder="Enter number of years" 
                            className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                            required 
                        />
                    </div>

                    {/* Submit Registration Action Section */}
                    <div className="pt-4 border-t border-slate-900 flex justify-end">
                        <button 
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl cursor-pointer hover:bg-blue-500 shadow-lg shadow-blue-600/10 active:scale-98 transition-all duration-300 focus:outline-none"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Submit Course</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateCourse;