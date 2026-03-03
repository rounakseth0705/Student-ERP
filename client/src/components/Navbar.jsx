import menuIcon from "../assets/menuIcon.svg";
import graduationCapIcon from "../assets/graduationCapIcon.svg";
import { UserContext } from "../context/AuthContext.jsx";
import { useContext, useEffect, useState } from "react";

const Navbar = ({setIsMenuClicked}) => {
    const { user, logout } = useContext(UserContext);
    const [blessingWord, setBlessingWord] = useState("");
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    }
    const getBlessingWord = () => {
        const time = new Date().getHours();
        if (time >= 4 && time < 12) {
            setBlessingWord("Morning");
        } else if (time >= 12 && time < 16) {
            setBlessingWord("Afternoon");
        } else {
            setBlessingWord("Evening");
        }
    }
    useEffect(() => {
        getBlessingWord();
    },[]);
    return(
        <div className="flex items-center justify-between bg-blue-800 p-3 sm:p-5">
            <span onClick={() => setIsMenuClicked((prev) => !prev)} className="p-1">
                <img src={menuIcon} alt="menuIcon" className="w-8 h-8 cursor-pointer sm:w-10 sm:h-10"/>
            </span>
            <span className="p-1">
                <span className="flex justify-center items-center gap-1 text-xs sm:gap-4 sm:text-base md:gap-5">
                    <img src={graduationCapIcon} alt="graduationCap" className="w-8 h-8 cursor-pointer sm:w-10 sm:h-10"/>
                    <span className="text-white">
                        <h1 className="">Good {blessingWord}</h1>
                        <h1>{user.name.split(" ")[0].toUpperCase()}</h1>
                    </span>
                </span>
            </span>
            <button onClick={(event) => handleLogout(event)} className="px-4 py-1 bg-white text-blue-950 text-xs rounded-full cursor-pointer hover:opacity-95 transition-all duration-400 ease-in-out sm:px-5 sm:text-base">Logout</button>
        </div>
    )
}

export default Navbar;