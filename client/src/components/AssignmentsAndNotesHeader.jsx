import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIconWhite.svg";

const AssignmentsAndNotesHeader = ({ toDisplay }) => {
    const navigate = useNavigate();
    return(
        <>
            <img onClick={() => navigate("/teacher-dashboard")} src={homeIcon} alt="homeIcon" className="fixed left-15 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-3xl text-white bg-blue-800 font-semibold text-center py-5">{toDisplay}</h1>
        </>
    )
}

export default AssignmentsAndNotesHeader;