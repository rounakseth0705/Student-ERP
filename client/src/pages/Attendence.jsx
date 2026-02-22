import homeIcon from "../assets/homeIcon.svg";

const Attendence = () => {
    return(
        <div>
            <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-10 top-5 w-8 h-8 cursor-pointer"/>
            <h1 className="text-center mt-5 text-4xl text-blue-950 font-semibold">Attendence</h1>
            <div className="grid grid-cols-1 gap-12 mx-80 mt-10 text-white text-2xl">
                <div className="flex justify-center items-center bg-blue-500 py-10 px-5 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out">Day Wise Attendence</div>
                <div className="flex justify-center items-center bg-blue-500 py-10 px-5 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out">Overall Attendence</div>
                <div className="flex justify-center items-center bg-blue-500 py-10 px-5 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out">Subject Wise Attendence</div>
            </div>
        </div>
    )
}

export default Attendence;