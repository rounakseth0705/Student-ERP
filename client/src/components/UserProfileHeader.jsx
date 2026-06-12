// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/AuthContext.jsx";
// import homeIcon from "../assets/homeIconWhite.svg";
// import userAvatarIcon from "../assets/userAvatarIcon.svg";

// const UserProfileHeader = () => {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();
//     return(
//         <div className="bg-blue-500">
//             <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
//                 <img onClick={() => navigate(`/${user.role}-dashboard`)} src={homeIcon} alt="homeIcon" className="w-5 h-5 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="text-white text-2xl font-semibold sm:text-3xl lg:text-4xl">Profile</h1>
//                 <h1></h1>
//             </div>
//             <div className="flex flex-col items-center p-3">
//                 <span className="mt-5">
//                     <img src={userAvatarIcon} alt="userAvatarIcon" className="h-20 w-20"/>
//                 </span>
//                 <h1 className="mt-2 text-2xl text-white font-semibold">{user.name}</h1>
//                 <h1 className="text-white font-semibold">{user.role[0].toUpperCase() + user.role.slice(1)}</h1>
//             </div>
//         </div>
//     )
// }

// export default UserProfileHeader;

// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/AuthContext.jsx";
// import { Home, User } from "lucide-react";

// const UserProfileHeader = () => {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     return (
//         <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 border-b border-slate-900 shadow-xl">
//             {/* Header Navigation Bar */}
//             <div className="flex justify-between items-center max-w-4xl mx-auto px-4 py-4 sm:px-6">
//                 <button
//                     type="button"
//                     onClick={() => navigate(`/${user.role}-dashboard`)}
//                     className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0"
//                     aria-label="Go Home"
//                 >
//                     <Home className="w-5 h-5" />
//                 </button>
//                 <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent sm:text-2xl">
//                     Profile
//                 </h1>
//                 {/* Visual balance placeholder spacer */}
//                 <div className="w-10 h-10 pointer-events-none opacity-0" aria-hidden="true" />
//             </div>

//             {/* User Hero Panel */}
//             <div className="flex flex-col items-center pb-8 pt-4">
//                 <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-xl shadow-blue-500/10">
//                     <div className="h-20 w-20 rounded-full bg-slate-900 flex items-center justify-center border border-slate-950">
//                         <User className="h-10 w-10 text-slate-300" />
//                     </div>
//                 </div>
//                 <h2 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
//                     {user?.name}
//                 </h2>
//                 <span className="mt-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
//                     {user?.role ? user.role[0].toUpperCase() + user.role.slice(1) : ""}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default UserProfileHeader;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { Home, User } from "lucide-react";

const UserProfileHeader = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 border-b border-slate-900/60 shadow-xl">
            {/* Header Navigation Bar Panel */}
            <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 flex flex-row flex-nowrap items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => navigate(`/${user?.role}-dashboard`)}
                    className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0 flex items-center justify-center"
                    aria-label="Go Home"
                >
                    <Home className="w-5 h-5" />
                </button>
                
                <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent sm:text-2xl text-center truncate">
                    Profile Dashboard
                </h1>
                
                {/* Fixed placeholder balance node prevents layout drift */}
                <div className="w-10 h-10 pointer-events-none opacity-0 shrink-0" aria-hidden="true" />
            </div>

            {/* User Hero Panel */}
            <div className="flex flex-col items-center pb-8 pt-4 px-4 text-center">
                <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-xl shadow-blue-500/10">
                    <div className="h-20 w-20 rounded-full bg-slate-900 flex items-center justify-center border border-slate-950">
                        <User className="h-10 w-10 text-slate-300" />
                    </div>
                </div>
                <h2 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-2xl truncate max-w-full">
                    {user?.name}
                </h2>
                <span className="mt-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                    {user?.role ? user.role[0].toUpperCase() + user.role.slice(1) : ""}
                </span>
            </div>
        </div>
    );
};

export default UserProfileHeader;