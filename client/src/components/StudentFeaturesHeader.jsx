import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIconWhite.svg";

const StudentFeaturesHeader = ({ toDisplay }) => {
    const navigate = useNavigate();
    return(
        <>
            <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="fixed left-15 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="bg-blue-800 text-white text-3xl text-center py-5 font-semibold">{toDisplay}</h1>
        </>
    )
}

export default StudentFeaturesHeader;