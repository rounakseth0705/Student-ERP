import { useContext } from "react";
import crossIcon from "../assets/crossIcon.svg";
import userAvatarIcon from "../assets/userAvatarIcon.svg";
import { UserContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ isMenuClicked,setIsMenuClicked }) => {
    const { user, userIdentity } = useContext(UserContext);
    const navigate = useNavigate();
    return isMenuClicked && (
        <div className="fixed top-0 w-40 h-screen bg-blue-300 flex flex-col items-center rounded-r-2xl shadow-2xl sm:w-60">
            <span onClick={() => setIsMenuClicked((prev) => !prev)} className="mt-8">
                <img src={crossIcon} alt="crossIcon" className="h-10 w-10 cursor-pointer"/>
            </span>
            <span className="mt-15">
                <img src={userAvatarIcon} alt="userAvatarIcon" className="h-25 w-25"/>
            </span>
            <h1 className="text-blue-950 mt-2 font-semibold">{user.name}</h1>
            <h1 className="text-blue-950">{userIdentity.courseId.courseName}</h1>
            <button onClick={() => navigate(user._id)} className="bg-white my-3 text-blue-950 px-3 py-1 rounded cursor-pointer shadow-lg">View Profile Details</button>
        </div>
    )
}

export default ProfileSidebar;