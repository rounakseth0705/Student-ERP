// import UserProfileHeader from "../components/UserProfileHeader";
// import UserProfileFooter from "../components/UserProfileFooter";

// const TeacherProfile = () => {
//     return(
//         <div className="bg-gray-200 min-h-screen">
//             <UserProfileHeader/>
//             <UserProfileFooter/>
//         </div>
//     )
// }

// export default TeacherProfile;

import React from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import UserProfileFooter from "../components/UserProfileFooter";

const TeacherProfile = () => {
    return (
        <div className="bg-slate-950 min-h-screen selection:bg-blue-600 selection:text-white">
            <UserProfileHeader />
            <UserProfileFooter />
        </div>
    );
};

export default TeacherProfile;