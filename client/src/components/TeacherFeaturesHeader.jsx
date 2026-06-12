// import { useNavigate } from "react-router-dom";
// import homeIcon from "../assets/homeIconWhite.svg";

// const TeacherFeaturesHeader = ({ toDisplay }) => {
//     const navigate = useNavigate();
//     return(
//         <>
//             <img onClick={() => navigate("/teacher-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-5 top-5.5 w-6 h-6 cursor-pointer sm:w-8 sm:h-8 sm:left-12 md:w-10 md:h-10 md:left-15 md:top-4"/>
//             <h1 className="text-2xl text-white bg-blue-800 font-semibold text-center py-5 sm:text-3xl">{toDisplay}</h1>
//         </>
//     )
// }

// export default TeacherFeaturesHeader;

import { useNavigate } from "react-router-dom";
// Imported Lucide Home Icon
import { Home } from "lucide-react";

const TeacherFeaturesHeader = ({ toDisplay }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 pt-6 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
            {/* Header Main Panel Body */}
            <div className="relative flex items-center justify-between bg-[#090f1c]/40 border border-slate-800/60 rounded-xl p-4 sm:p-5 shadow-xl transition-all">
                
                {/* Navigation Button Wrapper */}
                <div className="flex items-center z-10">
                    <button
                        onClick={() => navigate("/teacher-dashboard")}
                        className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-900/50 transition-all flex items-center justify-center focus:outline-none group"
                        aria-label="Back to dashboard"
                    >
                        <Home className="w-5 h-5 group-hover:scale-105 transition-transform" />
                    </button>
                </div>

                {/* Absolute Centered Heading Panel - Exact color & font weight match to the provided screenshot */}
                <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-lg sm:text-xl font-bold tracking-wider uppercase text-slate-300 font-sans antialiased select-none text-center px-16 truncate pointer-events-auto">
                        {toDisplay}
                    </h1>
                </div>

                {/* Spacer block to balance the flex distribution */}
                <div className="w-10 h-10 invisible" aria-hidden="true" />

            </div>
        </div>
    );
};

export default TeacherFeaturesHeader;