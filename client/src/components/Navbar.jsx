// import menuIcon from "../assets/menuIcon.svg";
// import graduationCapIcon from "../assets/graduationCapIcon.svg";
// import handIcon from "../assets/handIcon.svg";
// import { UserContext } from "../context/AuthContext.jsx";
// import { useContext, useEffect, useState } from "react";

// const Navbar = ({setIsMenuClicked}) => {
//     const { user, logout } = useContext(UserContext);
//     const [blessingWord, setBlessingWord] = useState("");
//     const handleLogout = (event) => {
//         event.preventDefault();
//         logout();
//     }
//     const getBlessingWord = () => {
//         const time = new Date().getHours();
//         if (time >= 4 && time < 12) {
//             setBlessingWord("Morning");
//         } else if (time >= 12 && time < 16) {
//             setBlessingWord("Afternoon");
//         } else {
//             setBlessingWord("Evening");
//         }
//     }
//     useEffect(() => {
//         getBlessingWord();
//     },[]);
//     return(
//         <>
//             <div className="flex items-center justify-between bg-blue-800 px-[2vw] py-[2vh] rounded-b-2xl sm:p-5">
//                 <span onClick={() => setIsMenuClicked((prev) => !prev)} className="p-1">
//                     <img src={menuIcon} alt="menuIcon" className="w-8 h-8 cursor-pointer sm:w-10 sm:h-10"/>
//                 </span>
//                 <span className="p-1">
//                     <span className="flex justify-center items-center gap-1 text-xs sm:gap-4 sm:text-base md:gap-5">
//                         <img src={graduationCapIcon} alt="graduationCap" className="w-7 h-7 cursor-pointer sm:w-10 sm:h-10"/>
//                         <span className="text-white">
//                             <h1 className="text-xs sm:text-base">Stanford University</h1>
//                         </span>
//                     </span>
//                 </span>
//                 <button onClick={(event) => handleLogout(event)} className="px-4 py-1 bg-white text-blue-950 text-xs rounded-full cursor-pointer hover:scale-102 hover:shadow-md active:scale-102 active:shadow-md transition-all duration-400 ease-in-out sm:px-5 sm:text-base">Logout</button>
//             </div>
//             <div className="shadow-md rounded-b-2xl py-[1vh] px-[4vw] sm:px-[3vw] sm:py-[2vh] md:px-[4vw] lg:px-[2vw]">
//                 <span className="flex items-center gap-1">
//                     <h1 className="text-xs sm:text-base">Good {blessingWord}</h1>
//                     <img src={handIcon} alt="handIcon" className="w-6 h-6 sm:w-8 sm:h-8"/>
//                     <h1 className="text-xs sm:text-base">{user.name.split(" ")[0]}</h1>
//                 </span>
//             </div>
//         </>
//     )
// }

// export default Navbar;

// import { UserContext } from "../context/AuthContext.jsx";
// import { useContext, useEffect, useState } from "react";
// import { Menu, GraduationCap, LogOut, Sun, Sunrise, Moon } from "lucide-react";

// const Navbar = ({ setIsMenuClicked }) => {
//     const { user, logout } = useContext(UserContext);
//     const [blessingWord, setBlessingWord] = useState("");

//     const handleLogout = (event) => {
//         event.preventDefault();
//         logout();
//     };

//     const getBlessingWord = () => {
//         const time = new Date().getHours();
//         if (time >= 4 && time < 12) {
//             setBlessingWord("Morning");
//         } else if (time >= 12 && time < 16) {
//             setBlessingWord("Afternoon");
//         } else {
//             setBlessingWord("Evening");
//         }
//     };

//     useEffect(() => {
//         getBlessingWord();
//     }, []);

//     // Helper to render matching icon based on current time context
//     const getGreetingIcon = () => {
//         if (blessingWord === "Morning") return <Sunrise className="h-5 w-5 text-amber-400 animate-pulse shrink-0" />;
//         if (blessingWord === "Afternoon") return <Sun className="h-5 w-5 text-orange-400 animate-spin-slow shrink-0" />;
//         return <Moon className="h-5 w-5 text-indigo-400 shrink-0" />;
//     };

//     return (
//         <div className="w-full font-sans bg-slate-950 px-4 pt-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
//             <div className="max-w-7xl mx-auto space-y-3">
                
//                 {/* Main Header Row */}
//                 <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-slate-800/60 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-xl">
                    
//                     {/* Menu Toggle Trigger */}
//                     <button 
//                         onClick={() => setIsMenuClicked((prev) => !prev)} 
//                         className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none"
//                         aria-label="Toggle Menu"
//                     >
//                         <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
//                     </button>
                    
//                     {/* Institution Identity Wrap */}
//                     <div className="flex items-center gap-2 sm:gap-3 group">
//                         <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300">
//                             <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
//                         </div>
//                         <div className="text-left">
//                             <h1 className="text-slate-200 font-bold text-sm sm:text-base tracking-wide group-hover:text-white transition-colors">
//                                 Stanford University
//                             </h1>
//                             <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Academic Portal</p>
//                         </div>
//                     </div>
                    
//                     {/* Logout Trigger Action */}
//                     <button 
//                         onClick={handleLogout} 
//                         className="flex items-center gap-2 px-4 py-2 bg-slate-950/40 text-slate-300 border border-slate-800 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 active:scale-98 transition-all duration-300 focus:outline-none shadow-inner"
//                     >
//                         <span>Logout</span>
//                         <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     </button>
//                 </div>
                
//                 {/* User Context Dynamic Welcome Bar */}
//                 <div className="bg-slate-900/20 backdrop-blur-sm border border-slate-900 px-5 py-3 rounded-xl shadow-sm">
//                     <span className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400">
//                         {getGreetingIcon()}
//                         <span>
//                             Good {blessingWord}, <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent font-bold text-sm sm:text-base ml-0.5">{user?.name ? user.name.split(" ")[0] : "User"}</span> 👋
//                         </span>
//                     </span>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Navbar;

// import { UserContext } from "../context/AuthContext.jsx";
// import { useContext, useEffect, useState } from "react";
// import { Menu, GraduationCap, LogOut, Sun, Sunrise, Moon } from "lucide-react";

// const Navbar = ({ setIsMenuClicked }) => {
//     const { user, logout } = useContext(UserContext);
//     const [blessingWord, setBlessingWord] = useState("");

//     const handleLogout = (event) => {
//         event.preventDefault();
//         logout();
//     };

//     const getBlessingWord = () => {
//         const time = new Date().getHours();
//         if (time >= 4 && time < 12) {
//             setBlessingWord("Morning");
//         } else if (time >= 12 && time < 16) {
//             setBlessingWord("Afternoon");
//         } else {
//             setBlessingWord("Evening");
//         }
//     };

//     useEffect(() => {
//         getBlessingWord();
//     }, []);

//     const getGreetingIcon = () => {
//         if (blessingWord === "Morning") return <Sunrise className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 animate-pulse shrink-0" />;
//         if (blessingWord === "Afternoon") return <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 shrink-0" />;
//         return <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400 shrink-0" />;
//     };

//     return (
//         <div className="w-full font-sans bg-slate-950 px-3 pt-3 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
//             <div className="max-w-7xl mx-auto space-y-2.5">
                
//                 {/* Main Responsive Header Panel */}
//                 <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-2 sm:px-6 sm:py-4 rounded-2xl shadow-xl gap-2">
                    
//                     {/* Menu Toggle Trigger */}
//                     <button 
//                         onClick={() => setIsMenuClicked((prev) => !prev)} 
//                         className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none shrink-0"
//                         aria-label="Toggle Menu"
//                     >
//                         <Menu className="w-5 h-5 sm:w-7 sm:h-7" />
//                     </button>
                    
//                     {/* Institution Identity (Scales perfectly on all screens) */}
//                     <div className="flex items-center gap-1.5 sm:gap-3 group min-w-0 flex-1 justify-center sm:justify-start">
//                         <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg sm:rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300 shrink-0">
//                             <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400" />
//                         </div>
//                         <div className="text-left min-w-0">
//                             <h1 className="text-slate-200 font-bold text-xs sm:text-base tracking-wide group-hover:text-white transition-colors truncate">
//                                 Stanford University
//                             </h1>
//                             <p className="text-[9px] sm:text-xs text-slate-500 font-medium hidden xs:block truncate">Academic Portal</p>
//                         </div>
//                     </div>
                    
//                     {/* Logout Trigger Action (Icon-only on mobile, full text on tablet+) */}
//                     <button 
//                         onClick={handleLogout} 
//                         className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-slate-950/40 text-slate-300 border border-slate-800 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 active:scale-98 transition-all duration-300 focus:outline-none shadow-inner shrink-0"
//                     >
//                         <span className="hidden sm:inline">Logout</span>
//                         <LogOut className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
//                     </button>
//                 </div>
                
//                 {/* User Context Dynamic Welcome Bar */}
//                 <div className="bg-slate-900/20 backdrop-blur-sm border border-slate-900 px-4 py-2 rounded-xl shadow-sm">
//                     <span className="flex items-center gap-1.5 text-[11px] sm:text-sm font-medium text-slate-400">
//                         {getGreetingIcon()}
//                         <span className="truncate">
//                             Good {blessingWord}, <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent font-bold text-xs sm:text-base ml-0.5">{user?.name ? user.name.split(" ")[0] : "User"}</span> 👋
//                         </span>
//                     </span>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Navbar;

import { UserContext } from "../context/AuthContext.jsx";
import { useContext, useEffect, useState } from "react";
import { Menu, GraduationCap, LogOut, Sun, Sunrise, Moon } from "lucide-react";

const Navbar = ({ setIsMenuClicked }) => {
    const { user, logout } = useContext(UserContext);
    const [blessingWord, setBlessingWord] = useState("");

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    };

    const getBlessingWord = () => {
        const time = new Date().getHours();
        if (time >= 4 && time < 12) {
            setBlessingWord("Morning");
        } else if (time >= 12 && time < 16) {
            setBlessingWord("Afternoon");
        } else {
            setBlessingWord("Evening");
        }
    };

    useEffect(() => {
        getBlessingWord();
    }, []);

    const getGreetingIcon = () => {
        if (blessingWord === "Morning") return <Sunrise className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 animate-pulse shrink-0" />;
        if (blessingWord === "Afternoon") return <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 shrink-0" />;
        return <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400 shrink-0" />;
    };

    return (
        <div className="w-full font-sans bg-slate-950 px-3 pt-3 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
            <div className="max-w-7xl mx-auto space-y-2.5">
                
                {/* Main Responsive Header Panel */}
                <div className="relative flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-2 sm:px-6 sm:py-4 rounded-2xl shadow-xl gap-2">
                    
                    {/* Menu Toggle Trigger */}
                    <button 
                        onClick={() => setIsMenuClicked((prev) => !prev)} 
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none shrink-0 z-10"
                        aria-label="Toggle Menu"
                    >
                        <Menu className="w-5 h-5 sm:w-7 sm:h-7" />
                    </button>
                    
                    {/* Institution Identity - Center Aligned on Medium/Large Screens */}
                    <div className="flex items-center gap-1.5 sm:gap-3 group min-w-0 md:absolute md:left-1/2 md:-translate-x-1/2 justify-center flex-1 md:flex-initial z-0">
                        <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg sm:rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300 shrink-0">
                            <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400" />
                        </div>
                        <div className="text-center sm:text-left min-w-0">
                            <h1 className="text-slate-200 font-bold text-xs sm:text-base tracking-wide group-hover:text-white transition-colors truncate">
                                Stanford University
                            </h1>
                            <p className="text-[9px] sm:text-xs text-slate-500 font-medium hidden xs:block truncate">Academic Portal</p>
                        </div>
                    </div>
                    
                    {/* Logout Trigger Action */}
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-slate-950/40 text-slate-300 border border-slate-800 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 active:scale-98 transition-all duration-300 focus:outline-none shadow-inner shrink-0 z-10"
                    >
                        <span className="hidden sm:inline">Logout</span>
                        <LogOut className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                </div>
                
                {/* User Context Dynamic Welcome Bar */}
                <div className="bg-slate-900/20 backdrop-blur-sm border border-slate-900 px-4 py-2 rounded-xl shadow-sm">
                    <span className="flex items-center gap-1.5 text-[11px] sm:text-sm font-medium text-slate-400">
                        {getGreetingIcon()}
                        <span className="truncate">
                            Good {blessingWord}, <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent font-bold text-xs sm:text-base ml-0.5">{user?.name ? user.name.split(" ")[0] : "User"}</span> 👋
                        </span>
                    </span>
                </div>

            </div>
        </div>
    );
};

export default Navbar;