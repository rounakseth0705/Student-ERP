import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ProfileSidebar from "../components/ProfileSidebar.jsx";

const StudentDashboard = () => {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    return(
        <>
            <Navbar setIsMenuClicked={setIsMenuClicked}/>
            <ProfileSidebar isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked}/>
        </>
    )
}

export default StudentDashboard;