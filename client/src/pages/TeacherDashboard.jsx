import { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/ProfileSidebar";

const TeacherDashboard = () => {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    return(
        <>
            <Navbar setIsMenuClicked={setIsMenuClicked}/>
            <ProfileSidebar isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked}/>
        </>
    )
}

export default TeacherDashboard;