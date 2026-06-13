// import { useContext } from "react";
// import leftArrow from "../assets/leftArrow.svg";
// import rightArrow from "../assets/rightArrow.svg";
// import { UserContext } from "../context/AuthContext.jsx";

// const CalendarHeader = ({ setSelectedDayAndDate, getDate, toShow }) => {
//     const { selectedDate, } = useContext(UserContext);
//     return(
//         <>
//             <h1 className="text-center mt-3 font-semibold text-blue-950 sm:text-3xl md:text-4xl sm:mt-5">{toShow}</h1>
//             <div className="flex justify-between items-center bg-blue-400 mt-3 text-white sm:mt-5">
//                 <img src={leftArrow} alt="leftArrow" className="w-10 h-10 mx-5 cursor-pointer sm:mx-10"/>
//                 <h1 className="my-5 font-semibold sm:text-2xl">{new Date().toLocaleString("en-US", { month: "long" })} ({new Date().getFullYear()})</h1>
//                 <img src={rightArrow} alt="rightArrow" className="w-10 h-10 mx-5 cursor-pointer sm:mx-10"/>
//             </div>
//             <div className="bg-blue-300 grid grid-cols-7 mt-1 mx-3 py-3 text-blue-950 sm:mx-10 md:mx-15 xl:px-3">
//                 <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Mon</h1>
//                 <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Tue</h1>
//                 <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Wed</h1>
//                 <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Thu</h1>
//                 <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Fri</h1>
//                 <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Sat</h1>
//                 <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Sun</h1>
//             </div>
//             <div className="grid grid-cols-7 mx-3 py-3 shadow-lg sm:mx-10 md:mx-15 xl:px-3">
//                 {
//                     Array(7).fill("").map((_,index) => {
//                         const date = getDate(index);
//                         return(
//                             <h1 onClick={() => setSelectedDayAndDate(index)} key={index} className={`flex justify-center items-center font-semibold rounded-2xl cursor-pointer ${selectedDate === date && "bg-amber-500 shadow-md text-white"} sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10`}>{date}</h1>
//                         )
//                     })
//                 }
//             </div>
//         </>
//     )
// }

// export default CalendarHeader;

import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
// Premium Lucide Icons Ecosystem
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const CalendarHeader = ({ setSelectedDayAndDate, getDate, toShow }) => {
    const { selectedDate } = useContext(UserContext);
    
    return (
        <div className="w-full bg-[#090f1c] border border-slate-900 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            
            {/* Visual Header Display Parameter Content */}
            {toShow && (
                <h3 className="text-center text-sm font-bold uppercase font-mono text-slate-400 tracking-wider">
                    {toShow}
                </h3>
            )}

            {/* Month Timeline Pagination Navigator Bar Context Panel */}
            <div className="flex items-center justify-between bg-slate-950/60 border border-slate-900 rounded-xl px-2 py-2">
                <button 
                    className="p-1.5 text-slate-500 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-all cursor-pointer"
                    aria-label="Previous Week Window View"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>{new Date().toLocaleString("en-US", { month: "long" })}</span>
                    <span className="text-slate-600 font-mono">({new Date().getFullYear()})</span>
                </div>
                <button 
                    className="p-1.5 text-slate-500 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-all cursor-pointer"
                    aria-label="Next Week Window View"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Weekdays Label Identifier Layout Row Header */}
            <div className="grid grid-cols-7 text-center bg-slate-950/30 border border-slate-900/50 rounded-xl py-2 text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName) => (
                    <div key={dayName}>{dayName}</div>
                ))}
            </div>

            {/* Calendar Day Trigger Points Iterative Matrix Map */}
            <div className="grid grid-cols-7 gap-1.5 text-center pt-0.5">
                {Array(7).fill("").map((_, index) => {
                    const date = getDate(index);
                    const isCurrentActiveNode = selectedDate === date;
                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedDayAndDate(index)}
                            className={`py-2 text-xs sm:text-sm font-mono font-bold rounded-xl transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center border ${
                                isCurrentActiveNode
                                    ? "bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-950/40 transform scale-[1.04]"
                                    : "bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            {date}
                        </button>
                    );
                })}
            </div>

        </div>
    );
}

export default CalendarHeader;