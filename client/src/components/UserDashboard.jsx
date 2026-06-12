// import { useNavigate } from "react-router-dom";
// import calendarIcon from "../assets/calendarIcon.svg";
// import alarmClockIcon from "../assets/alarmClockIcon.svg";
// import openBookIcon from "../assets/openBookIcon.svg";
// import bookIcon from "../assets/bookIcon.svg";
// import notesIcon from "../assets/notesIcon.svg";
// import chalkboardPersonIcon from "../assets/chalkboardPerson.svg";
// import magnifyingGlassIcon from "../assets/magnifyingGlassIcon.svg";
// import infoIcon from "../assets/infoIcon.svg";
// import markIcon from "../assets/markIcon.svg";
// import clipboardUserIcon from "../assets/clipboardUser.svg";
// import userGraduateIcon from "../assets/userGraduateIcon.svg";
// import plusIcon from "../assets/plusIcon.svg";

// const UserDashboard = ({ role, option1, option2, option3, option4, option5, option6, dashboard, navigate1, navigate2, navigate3, navigate4, navigate5, navigate6 }) => {
//     const navigate = useNavigate();
//     return(
//         <>
//             <div className="flex items-center gap-3 mt-[3vh] mx-[4vw] py-[2vh] px-[6vw] rounded-2xl shadow-lg sm:gap-5 sm:mx-[2vw] sm:px-[5vw] lg:mt-[4vh]">
//                 <img src={magnifyingGlassIcon} alt="magnifierIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                 <input type="text" placeholder="Search modules..." className="outline-none text-gray-600 text-xs sm:text-base"/>
//             </div>
//             <div className="grid gird-rows-6 grid-cols-1 gap-7 text-white font-semibold my-[5vh] mx-12 h-[75vh] sm:h-[60vh] sm:my-10 sm:mx-10 md:mx-20 lg:mx-40 lg:h-[75vh] sm:grid-rows-3 sm:grid-cols-2">
//                 <div onClick={() => navigate(`/${dashboard}/${navigate1}`)} className="flex items-center justify-center gap-3 rounded-2xl bg-red-400 hover:scale-105 hover:shadow-lg hover:shadow-red-400 active:scale-105 active:shadow-lg active:shadow-red-400 transition-all duration-800 ease-in-out cursor-pointer sm:gap-2 md:gap-4">
//                     <h1 className="sm:text-2xl">{option1}</h1>
//                     <img src={role==="student" ? calendarIcon : role==="admin" ? chalkboardPersonIcon : openBookIcon} alt="calendarIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
//                 </div>
//                 <div onClick={() => navigate(`/${dashboard}/${navigate2}`)} className="flex items-center justify-center gap-3 rounded-2xl bg-purple-400 hover:scale-105 hover:shadow-lg hover:shadow-purple-400 active:scale-105 active:shadow-lg active:shadow-purple-400 transition-all duration-800 ease-in-out cursor-pointer sm:gap-2 md:gap-4">
//                     <h1 className="sm:text-2xl">{option2}</h1>
//                     <img src={role==="student" ? alarmClockIcon : role==="admin" ? plusIcon : infoIcon} alt="alarmClockIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
//                 </div>
//                 <div onClick={() => navigate(`/${dashboard}/${navigate3}`)} className="flex items-center justify-center gap-3 rounded-2xl bg-orange-400 hover:scale-105 hover:shadow-lg hover:shadow-orange-400 active:scale-105 active:shadow-lg active:shadow-orange-400 transition-all duration-800 ease-in-out cursor-pointer sm:gap-2 md:gap-4">
//                     <h1 className="sm:text-2xl">{option3}</h1>
//                     <img src={role==="student" ? openBookIcon : role==="admin" ? userGraduateIcon : notesIcon} alt="openBookIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
//                 </div>
//                 <div onClick={() => navigate(`/${dashboard}/${navigate4}`)} className="flex items-center justify-center gap-3 rounded-2xl bg-green-400 hover:scale-105 hover:shadow-lg hover:shadow-green-400 active:scale-105 active:shadow-lg active:shadow-green-400 transition-all duration-800 ease-in-out cursor-pointer sm:gap-2 md:gap-4">
//                     <h1 className="sm:text-2xl">{option4}</h1>
//                     <img src={role==="student" ? notesIcon : role==="admin" ? plusIcon : markIcon} alt="notesIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
//                 </div>
//                 <div onClick={() => navigate(`/${dashboard}/${navigate5}`)} className="flex items-center justify-center gap-3 rounded-2xl bg-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500 active:scale-105 active:shadow-lg active:shadow-blue-500 transition-all duration-800 ease-in-out cursor-pointer sm:gap-2 md:gap-4">
//                     <h1 className="sm:text-2xl">{option5}</h1>
//                     <img src={role==="student" ? bookIcon : role==="admin" ? bookIcon : userGraduateIcon} alt="bookIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
//                 </div>
//                 <div onClick={() => navigate(`/${dashboard}/${navigate6}`)} className="flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 hover:scale-105 hover:shadow-lg hover:shadow-indigo-600 active:scale-105 active:shadow-lg active:shadow-indigo-600 transition-all duration-800 ease-in-out cursor-pointer sm:gap-2 md:gap-4">
//                     <h1 className="sm:text-2xl">{option6}</h1>
//                     <img src={role==="student" ? bookIcon : clipboardUserIcon} alt="bookIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default UserDashboard;

import { useNavigate } from "react-router-dom";
import { 
    Search, Calendar, Clock, BookOpen, Book, Notebook, 
    Presentation, Info, CheckCircle, ClipboardCheck, GraduationCap, PlusCircle 
} from "lucide-react";

const UserDashboard = ({ 
    role, option1, option2, option3, option4, option5, option6, 
    dashboard, navigate1, navigate2, navigate3, navigate4, navigate5, navigate6 
}) => {
    const navigate = useNavigate();

    // Helper function to return the correct icon for Option 1
    const getIcon1 = () => {
        if (role === "student") return <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-rose-400" />;
        if (role === "admin") return <Presentation className="h-10 w-10 sm:h-12 sm:w-12 text-rose-400" />;
        return <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-rose-400" />;
    };

    // Helper function to return the correct icon for Option 2
    const getIcon2 = () => {
        if (role === "student") return <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400" />;
        if (role === "admin") return <PlusCircle className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400" />;
        return <Info className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400" />;
    };

    // Helper function to return the correct icon for Option 3
    const getIcon3 = () => {
        if (role === "student") return <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-amber-400" />;
        if (role === "admin") return <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-amber-400" />;
        return <Notebook className="h-10 w-10 sm:h-12 sm:w-12 text-amber-400" />;
    };

    // Helper function to return the correct icon for Option 4
    const getIcon4 = () => {
        if (role === "student") return <Notebook className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-400" />;
        if (role === "admin") return <PlusCircle className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-400" />;
        return <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-400" />;
    };

    // Helper function to return the correct icon for Option 5
    const getIcon5 = () => {
        if (role === "student") return <Book className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400" />;
        if (role === "admin") return <Book className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400" />;
        return <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400" />;
    };

    // Helper function to return the correct icon for Option 6
    const getIcon6 = () => {
        if (role === "student") return <Book className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-400" />;
        return <ClipboardCheck className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-400" />;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans selection:bg-blue-600 selection:text-white">
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
                
                {/* Modern Search bar Header */}
                <div className="w-full flex items-center gap-3 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl px-5 py-3.5 focus-within:border-slate-700/80 transition-all duration-300 shadow-lg">
                    <Search className="w-5 h-5 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search modules..." 
                        className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm sm:text-base outline-none font-medium"
                    />
                </div>

                {/* Main Dashboard Cards Layout Grid (Restricted to max 2 items per row) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    
                    {/* Option 1: Rose Card */}
                    <div 
                        onClick={() => navigate(`/${dashboard}/${navigate1}`)} 
                        className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-rose-500/10 hover:border-rose-500/40 hover:bg-rose-500/[0.02] shadow-xl hover:shadow-rose-500/5 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <h1 className="text-lg sm:text-xl font-bold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                            {option1}
                        </h1>
                        <div className="p-3 bg-rose-500/5 group-hover:bg-rose-500/10 rounded-xl transition-all duration-300">
                            {getIcon1()}
                        </div>
                    </div>

                    {/* Option 2: Purple Card */}
                    <div 
                        onClick={() => navigate(`/${dashboard}/${navigate2}`)} 
                        className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-purple-500/10 hover:border-purple-500/40 hover:bg-purple-500/[0.02] shadow-xl hover:shadow-purple-500/5 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <h1 className="text-lg sm:text-xl font-bold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                            {option2}
                        </h1>
                        <div className="p-3 bg-purple-500/5 group-hover:bg-purple-500/10 rounded-xl transition-all duration-300">
                            {getIcon2()}
                        </div>
                    </div>

                    {/* Option 3: Amber Card */}
                    <div 
                        onClick={() => navigate(`/${dashboard}/${navigate3}`)} 
                        className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-amber-500/10 hover:border-amber-500/40 hover:bg-amber-500/[0.02] shadow-xl hover:shadow-amber-500/5 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <h1 className="text-lg sm:text-xl font-bold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                            {option3}
                        </h1>
                        <div className="p-3 bg-amber-500/5 group-hover:bg-amber-500/10 rounded-xl transition-all duration-300">
                            {getIcon3()}
                        </div>
                    </div>

                    {/* Option 4: Emerald Card */}
                    <div 
                        onClick={() => navigate(`/${dashboard}/${navigate4}`)} 
                        className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/[0.02] shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <h1 className="text-lg sm:text-xl font-bold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                            {option4}
                        </h1>
                        <div className="p-3 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-xl transition-all duration-300">
                            {getIcon4()}
                        </div>
                    </div>

                    {/* Option 5: Blue Card */}
                    <div 
                        onClick={() => navigate(`/${dashboard}/${navigate5}`)} 
                        className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-blue-500/10 hover:border-blue-500/40 hover:bg-blue-500/[0.02] shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <h1 className="text-lg sm:text-xl font-bold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                            {option5}
                        </h1>
                        <div className="p-3 bg-blue-500/5 group-hover:bg-blue-500/10 rounded-xl transition-all duration-300">
                            {getIcon5()}
                        </div>
                    </div>

                    {/* Option 6: Indigo Card */}
                    <div 
                        onClick={() => navigate(`/${dashboard}/${navigate6}`)} 
                        className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-indigo-500/10 hover:border-indigo-500/40 hover:bg-indigo-500/[0.02] shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <h1 className="text-lg sm:text-xl font-bold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                            {option6}
                        </h1>
                        <div className="p-3 bg-indigo-500/5 group-hover:bg-indigo-500/10 rounded-xl transition-all duration-300">
                            {getIcon6()}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserDashboard;