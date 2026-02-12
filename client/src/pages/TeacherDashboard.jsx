import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/ProfileSidebar.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import UserDashboard from "../components/UserDashboard.jsx";

const TeacherDashboard = () => {
    const { userIdentity } = useContext(UserContext);
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    return(
        <>
            <Navbar setIsMenuClicked={setIsMenuClicked}/>
            <ProfileSidebar isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked}/>
            <UserDashboard option1="Asignments" option2={`About ${userIdentity.courseId.courseName}`} option3="Notes" option4="Mark Attendence" option5="Review Students" option6="Attendence History" dashboard="teacher-dashboard" navigate1="assignments" navigate2={`about-${userIdentity.courseId.courseName.toLowerCase()}`} navigate3="notes" navigate4="mark-attendence" navigate5="review-students" navigate6="attendence-history"/>
        </>
    )
}

export default TeacherDashboard;