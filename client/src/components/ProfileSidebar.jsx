// import { useContext } from "react";
// import crossIcon from "../assets/crossIcon.svg";
// import userAvatarIcon from "../assets/userAvatarIcon.svg";
// import { UserContext } from "../context/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";

// const ProfileSidebar = ({ isMenuClicked,setIsMenuClicked }) => {
//     const { user, userIdentity } = useContext(UserContext);
//     const navigate = useNavigate();
//     return isMenuClicked && (
//         <div className="fixed top-0 w-[42vw] h-screen bg-blue-300 flex flex-col items-center rounded-r-2xl shadow-2xl sm:w-50 md:w-60">
//             <span onClick={() => setIsMenuClicked((prev) => !prev)} className="mt-8">
//                 <img src={crossIcon} alt="crossIcon" className="h-10 w-10 cursor-pointer"/>
//             </span>
//             <span className="mt-15">
//                 <img src={userAvatarIcon} alt="userAvatarIcon" className="h-25 w-25"/>
//             </span>
//             <h1 className="text-blue-950 mt-2 font-semibold">{user.name}</h1>
//             { userIdentity && <h1 className="text-blue-950">{userIdentity.courseId.courseName}</h1> }
//             <button onClick={() => navigate("view-profile")} className="bg-white my-3 text-blue-950 text-sm px-2 py-1 rounded cursor-pointer shadow-lg sm:px-3 sm:text-base">View Profile Details</button>
//             { user.role === "admin" &&
//                 <button onClick={() => navigate("create-admin")} className="mt-20 bg-white text-blue-950 px-3 py-1 rounded-2xl cursor-pointer shadow-lg">Create Admin</button>
//             }
//         </div>
//     )
// }

// export default ProfileSidebar;

import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { X, User, ShieldPlus } from "lucide-react";

const ProfileSidebar = ({ isMenuClicked, setIsMenuClicked }) => {
    const { user, userIdentity } = useContext(UserContext);
    const navigate = useNavigate();

    if (!isMenuClicked) return null;

    return (
        /* Glass Backdrop Overlay Layer for improved modal containment */
        <div className="fixed inset-0 z-50 flex font-sans selection:bg-blue-600 selection:text-white">
            
            {/* Clickable Backdrop Mask */}
            <div 
                onClick={() => setIsMenuClicked(false)}
                className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300"
            />

            {/* Profile Drawer Card Panel */}
            <div className="relative w-72 xs:w-80 sm:w-85 h-full bg-slate-900/90 backdrop-blur-2xl border-r border-slate-800/80 p-6 flex flex-col items-center shadow-[25px_0_50px_-15px_rgba(0,0,0,0.5)] z-10 transition-transform duration-300 ease-out transform translate-x-0">
                
                {/* Close Panel Trigger */}
                <div className="w-full flex justify-end">
                    <button 
                        onClick={() => setIsMenuClicked((prev) => !prev)} 
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner"
                        aria-label="Close Sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Avatar Display Wrapper Area */}
                <div className="mt-8 relative group">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all duration-300" />
                    <div className="relative h-24 w-24 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center p-1 text-slate-400 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all duration-300 shadow-2xl">
                        <User className="h-12 w-12 stroke-[1.5]" />
                    </div>
                </div>

                {/* Identity Metadata Block */}
                <div className="mt-5 text-center space-y-1 w-full px-2">
                    <h1 className="text-slate-200 font-bold text-base sm:text-lg tracking-wide truncate">
                        {user?.name || "Academic User"}
                    </h1>
                    
                    {userIdentity && (
                        <p className="text-xs text-slate-400 font-medium tracking-normal max-w-full truncate bg-slate-950/40 border border-slate-800/40 py-1 px-2.5 rounded-md inline-block">
                            {userIdentity.courseId.courseName}
                        </p>
                    )}
                </div>

                {/* Navigation CTA Actions */}
                <div className="w-full mt-6 space-y-3">
                    <button 
                        onClick={() => navigate("view-profile")} 
                        className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-200 hover:text-white text-sm font-semibold py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 text-center active:scale-98 shadow-md"
                    >
                        View Profile Details
                    </button>
                </div>

                {/* Structural Role Specific Action Node */}
                {user?.role === "admin" && (
                    <div className="mt-auto w-full pt-6 border-t border-slate-800/60">
                        <button 
                            onClick={() => navigate("create-admin")} 
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl cursor-pointer shadow-lg shadow-blue-600/10 active:scale-98 transition-all duration-300 focus:outline-none"
                        >
                            <ShieldPlus className="w-4 h-4" />
                            <span>Create Admin</span>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProfileSidebar;