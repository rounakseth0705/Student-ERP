import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import homeIcon from "../assets/homeIconWhite.svg";
import userAvatarIcon from "../assets/userAvatarIcon.svg";
import CurrentTime from "./CurrentTime.jsx";

const UserProfileHeader = () => {
    const { user, userIdentity } = useContext(UserContext);
    const navigate = useNavigate();
    return(
        <div className="bg-blue-500">
            <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
                <img onClick={() => navigate(`/${user.role}-dashboard`)} src={homeIcon} alt="homeIcon" className="w-5 h-5 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="text-white text-2xl font-semibold sm:text-3xl lg:text-4xl">Profile</h1>
                <CurrentTime isWhite={true}/>
            </div>
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