import { useContext } from "react";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import { UserContext } from "../context/AuthContext.jsx";

const CalendarHeader = ({ setSelectedDayAndDate, getDate, toShow }) => {
    const { selectedDate, } = useContext(UserContext);
    return(
        <>
            <h1 className="text-center mt-3 font-semibold text-blue-950 sm:text-3xl md:text-4xl sm:mt-5">{toShow}</h1>
            <div className="flex justify-between items-center bg-blue-400 mt-3 text-white sm:mt-5">
                <img src={leftArrow} alt="leftArrow" className="w-10 h-10 mx-5 cursor-pointer sm:mx-10"/>
                <h1 className="my-5 font-semibold sm:text-2xl">{new Date().toLocaleString("en-US", { month: "long" })} ({new Date().getFullYear()})</h1>
                <img src={rightArrow} alt="rightArrow" className="w-10 h-10 mx-5 cursor-pointer sm:mx-10"/>
            </div>
            <div className="bg-blue-300 grid grid-cols-7 mt-1 mx-3 py-3 text-blue-950 sm:mx-10 md:mx-15 xl:px-3">
                <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Mon</h1>
                <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Tue</h1>
                <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Wed</h1>
                <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Thu</h1>
                <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Fri</h1>
                <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Sat</h1>
                <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Sun</h1>
            </div>
            <div className="grid grid-cols-7 mx-3 py-3 shadow-lg sm:mx-10 md:mx-15 xl:px-3">
                {
                    Array(7).fill("").map((_,index) => {
                        const date = getDate(index);
                        return(
                            <h1 onClick={() => setSelectedDayAndDate(index)} key={index} className={`flex justify-center items-center font-semibold rounded-2xl cursor-pointer ${selectedDate === date && "bg-amber-500 shadow-md text-white"} sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10`}>{date}</h1>
                        )
                    })
                }
            </div>
        </>
    )
}

export default CalendarHeader;