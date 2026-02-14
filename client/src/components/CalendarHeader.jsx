import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

const CalendarHeader = ({ selectedDate, setSelectedDayAndDate, getDate }) => {
    return(
        <>
            <h1 className="text-center mt-15 text-4xl font-semibold text-blue-950">Timetable</h1>
            <div className="flex justify-between items-center bg-blue-400 mt-5 text-white">
                <img src={leftArrow} alt="leftArrow" className="w-10 h-10 mx-10 cursor-pointer"/>
                <h1 className="my-5 text-2xl font-semibold">{new Date().toLocaleString("en-US", { month: "long" })} ({new Date().getFullYear()})</h1>
                <img src={rightArrow} alt="rightArrow" className="w-10 h-10 mx-10 cursor-pointer"/>
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
                    Array(7).fill("").map((_,index) => (
                        <h1 onClick={() => setSelectedDayAndDate(index)} key={index} className={`flex justify-center items-center font-semibold rounded-2xl cursor-pointer ${selectedDate === getDate(index) && "bg-amber-500 shadow-md text-white"} sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10`}>{getDate(index)}</h1>
                    ))
                }
            </div>
        </>
    )
}

export default CalendarHeader;