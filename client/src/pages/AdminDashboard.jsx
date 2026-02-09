import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar.jsx";
import UserDashboard from "../components/UserDashboard.jsx";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    return(
        <>
            <Navbar setIsMenuClicked={setIsMenuClicked}/>
            <ProfileSidebar isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked}/>
            <UserDashboard option1="Teachers" option2="Create Teacher" option3="Students" option4="Create Student" option5="Courses" option6="Create Course" dashboard="admin-dashboard" navigate1="teachers" navigate2="create-teacher" navigate3="students" navigate4="create-student" navigate5="courses" navigate6="create-course"/>
        </>
    )
}

export default AdminDashboard;