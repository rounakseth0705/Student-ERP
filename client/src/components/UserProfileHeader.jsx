import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import homeIcon from "../assets/homeIconWhite.svg";
import userAvatarIcon from "../assets/userAvatarIcon.svg";

const UserProfileHeader = () => {
    const { user, userIdentity } = useContext(UserContext);
    const navigate = useNavigate();
    return(
        <div className="bg-blue-500">
            <img onClick={() => navigate(`/${user.role}-dashboard`)} src={homeIcon} alt="homeIcon" className="fixed left-10 top-6 w-8 h-8 cursor-pointer sm:w-10 sm:h-10 sm:top-4 sm:left-15"/>
            <h1 className="text-center text-white text-4xl font-semibold pt-5">Profile</h1>
            <div className="flex flex-col items-center p-3">
                <span className="mt-5">
                    <img src={userAvatarIcon} alt="userAvatarIcon" className="h-20 w-20"/>
                </span>
                <h1 className="mt-2 text-2xl text-white font-semibold">{user.name}</h1>
                <h1 className="text-white font-semibold">{user.role}</h1>
            </div>
        </div>
    )
}

export default UserProfileHeader;