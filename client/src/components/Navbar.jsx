import menuIcon from "../assets/menuIcon.svg";
import graduationCapIcon from "../assets/graduationCapIcon.svg";
import { UserContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

const Navbar = ({setIsMenuClicked}) => {
    const { logout } = useContext(UserContext);
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    }
    return(
        <div className="flex items-center justify-between bg-blue-800 p-3 sm:p-5">
            <span onClick={() => setIsMenuClicked((prev) => !prev)} className="p-1">
                <img src={menuIcon} alt="menuIcon" className="w-10 h-10  cursor-pointer"/>
            </span>
            <span className="p-1">
                <img src={graduationCapIcon} alt="graduationCap" className="w-10 h-10 cursor-pointer"/>
            </span>
            <button onClick={(event) => handleLogout(event)} className="px-5 py-1 bg-white text-blue-950 rounded-full cursor-pointer hover:opacity-95 transition-all duration-400 ease-in-out">Logout</button>
        </div>
    )
}

export default Navbar;