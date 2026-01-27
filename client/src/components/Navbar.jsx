import menuIcon from "../assets/menuIcon.svg";
import graduationCapIcon from "../assets/graduationCapIcon.svg";
import { UserContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

const Navbar = () => {
    const { logout } = useContext(UserContext);
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    }
    return(
        <div className="flex items-center justify-between bg-blue-500 p-5">
            <span className="p-1">
                <img src={menuIcon} alt="menuIcon" className="w-10 h-10" />
            </span>
            <span className="p-1">
                <img src={graduationCapIcon} alt="erpLogo" className="w-10 h-10" />
            </span>
            <button onClick={(event) => handleLogout(event)} className="px-5 py-1 bg-white text-blue-950 rounded-full">Logout</button>
        </div>
    )
}

export default Navbar;