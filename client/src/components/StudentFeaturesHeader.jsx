import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIconWhite.svg";

const StudentFeaturesHeader = ({ toDisplay }) => {
    const navigate = useNavigate();
    return(
        <>
            <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-5 top-5.5 w-6 h-6 cursor-pointer sm:w-8 sm:h-8 sm:left-12 sm:top-5.5 md:w-10 md:h-10 md:left-15 md:top-4"/>
            <h1 className="bg-blue-800 text-white text-2xl text-center py-5 font-semibold sm:text-3xl">{toDisplay}</h1>
        </>
    )
}

export default StudentFeaturesHeader;