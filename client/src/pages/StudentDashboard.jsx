import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ProfileSidebar from "../components/ProfileSidebar.jsx";
import UserDashboard from "../components/UserDashboard.jsx";

const StudentDashboard = () => {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    return(
        <>
            <Navbar setIsMenuClicked={setIsMenuClicked}/>
            <ProfileSidebar isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked}/>
            <UserDashboard option1="Attendence" option2="timetable" option3="Assignments" option4="Notes" option5="Subjects" option6="Teachers" dashboard="student-dashboard" navigate1="attendence" navigate2="timetable" navigate3="assignments" navigate4="notes" navigate5="subjects" navigate6="teachers"/>
        </>
    )
}

export default StudentDashboard;