// import { useNavigate } from "react-router-dom";
// import homeIcon from "../assets/homeIconWhite.svg";

// const StudentFeaturesHeader = ({ toDisplay }) => {
//     const navigate = useNavigate();
//     return(
//         <>
//             <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-5 top-5.5 w-6 h-6 cursor-pointer sm:w-8 sm:h-8 sm:left-12 sm:top-5.5 md:w-10 md:h-10 md:left-15 md:top-4"/>
//             <h1 className="bg-blue-800 text-white text-2xl text-center py-5 font-semibold sm:text-3xl">{toDisplay}</h1>
//         </>
//     )
// }

// export default StudentFeaturesHeader;

import { useNavigate } from "react-router-dom";
// Premium Lucide Icon Asset Ecosystem
import { Home } from "lucide-react";

const StudentFeaturesHeader = ({ toDisplay }) => {
    const navigate = useNavigate();
    
    return (
        <div className="w-full px-4 pt-6 sm:px-6 lg:px-8 bg-slate-950">
            {/* Outer Header container matching the exact layout profile of your screenshot container */}
            <div className="max-w-6xl mx-auto bg-[#090f1c]/60 border border-slate-900 rounded-2xl px-5 py-4 sm:py-5 flex flex-row flex-nowrap items-center justify-between gap-4 shadow-xl">
                
                {/* Left Action: Home Trigger bounding box matching the rounded icon button look */}
                <button 
                    onClick={() => navigate("/student-dashboard")}
                    className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-slate-800/30 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none shrink-0 flex items-center justify-center"
                    aria-label="Return to student terminal dashboard home"
                >
                    <Home className="w-5 h-5" />
                </button>
                
                {/* Centered Heading Layout Block */}
                <div className="flex-1 min-w-0 text-center pr-2 sm:pr-10 md:pr-0">
                    <h1 className="text-lg font-bold uppercase tracking-wider text-slate-200 sm:text-xl md:text-2xl font-sans truncate">
                        {toDisplay}
                    </h1>
                </div>

                {/* Invisible layout balancer to maintain flawless typographic centering logic across responsive screen adjustments */}
                <div className="w-[42px] h-[42px] hidden md:block shrink-0 pointer-events-none" aria-hidden="true" />

            </div>
        </div>
    );
};

export default StudentFeaturesHeader;