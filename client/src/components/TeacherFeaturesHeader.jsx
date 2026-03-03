import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIconWhite.svg";

const TeacherFeaturesHeader = ({ toDisplay }) => {
    const navigate = useNavigate();
    return(
        <>
            <img onClick={() => navigate("/teacher-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-5 top-5.5 w-6 h-6 cursor-pointer sm:w-8 sm:h-8 sm:left-12 md:w-10 md:h-10 md:left-15 md:top-4"/>
            <h1 className="text-2xl text-white bg-blue-800 font-semibold text-center py-5 sm:text-3xl">{toDisplay}</h1>
        </>
    )
}

export default TeacherFeaturesHeader;