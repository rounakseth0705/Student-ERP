// const CourseDetailsCard = ({ courseName, courseCode, duration, semesters }) => {
//     return(
//         <div className="flex flex-col justify-center text-gray-700 px-8 py-3 text-sm sm:py-5 sm:text-2xl lg:py-6 lg:px-10">
//             <h1 className="bg-white rounded-2xl shadow-xl m-2 px-12 py-3 sm:px-12 sm:py-4">Course name :- {courseName}</h1>
//             <h1 className="bg-white rounded-2xl shadow-xl m-2 px-12 py-3 sm:px-12 sm:py-4">Course code :- {courseCode}</h1>
//             <h1 className="bg-white rounded-2xl shadow-xl m-2 px-12 py-3 sm:px-12 sm:py-4">Course Duration :- {duration} years</h1>
//             <h1 className="bg-white rounded-2xl shadow-xl m-2 px-12 py-3 sm:px-12 sm:py-4">Total Semesters :- {semesters}</h1>
//         </div>
//     )
// }

// export default CourseDetailsCard;

import React from "react";
// Premium Lucide Icons Ecosystem
import { Bookmark, Code, Clock, Layers } from "lucide-react";

const CourseDetailsCard = ({ courseName, courseCode, duration, semesters }) => {
    return (
        <div className="max-w-3xl mx-auto w-full bg-[#090f1c] border border-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Field A: Description Text */}
            <div className="bg-slate-950/50 border border-slate-900/50 p-4 rounded-xl flex items-center gap-3.5 min-w-0">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg shrink-0">
                    <Bookmark className="w-4 h-4 sm:w-5 h-5" />
                </div>
                <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase font-mono text-slate-500 tracking-wider">Course Name</span>
                    <h3 className="text-sm font-bold text-slate-200 mt-0.5 truncate">{courseName}</h3>
                </div>
            </div>

            {/* Field B: Numeric/Text Identifier Code */}
            <div className="bg-slate-950/50 border border-slate-900/50 p-4 rounded-xl flex items-center gap-3.5 min-w-0">
                <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg shrink-0">
                    <Code className="w-4 h-4 sm:w-5 h-5" />
                </div>
                <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase font-mono text-slate-500 tracking-wider">Course Code</span>
                    <h3 className="text-sm font-mono font-bold text-slate-200 mt-0.5 truncate">{courseCode}</h3>
                </div>
            </div>

            {/* Field C: Longevity Parameter */}
            <div className="bg-slate-950/50 border border-slate-900/50 p-4 rounded-xl flex items-center gap-3.5 min-w-0">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 h-5" />
                </div>
                <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase font-mono text-slate-500 tracking-wider">Duration</span>
                    <h3 className="text-sm font-bold text-slate-200 mt-0.5">{duration} Academic Years</h3>
                </div>
            </div>

            {/* Field D: Block Segments Count */}
            <div className="bg-slate-950/50 border border-slate-900/50 p-4 rounded-xl flex items-center gap-3.5 min-w-0">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
                    <Layers className="w-4 h-4 sm:w-5 h-5" />
                </div>
                <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase font-mono text-slate-500 tracking-wider">Total Terms</span>
                    <h3 className="text-sm font-mono font-bold text-slate-200 mt-0.5">{semesters} Semesters</h3>
                </div>
            </div>

        </div>
    );
};

export default CourseDetailsCard;