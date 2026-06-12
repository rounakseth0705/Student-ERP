// import { useContext, useEffect } from "react";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import { UserContext } from "../context/AuthContext.jsx";
// import TeacherSubjects from "../components/TeacherSubjects.jsx";
// import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";

// const Notes = () => {
//     const { userIdentity } = useContext(UserContext);
//     const { getSubjects } = useContext(TeacherDashboardContext);
//     const handleGetSubjects = async () => {
//         await getSubjects(userIdentity._id);
//     }
//     useEffect(() => {
//         handleGetSubjects();
//     },[]);
//     return(
//         <>
//             <TeacherFeaturesHeader toDisplay="Notes"/>
//             <TeacherSubjects/>
//         </>
//     )
// }

// export default Notes;

import { useContext, useEffect } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import TeacherSubjects from "../components/TeacherSubjects.jsx";
import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";

const Notes = () => {
    const { userIdentity } = useContext(UserContext);
    const { getSubjects } = useContext(TeacherDashboardContext);

    const handleGetSubjects = async () => {
        if (userIdentity?._id) {
            await getSubjects(userIdentity._id);
        }
    };

    useEffect(() => {
        handleGetSubjects();
    }, []);

    return (
        /* Viewport layout container keeping background styling consistent with the app framework */
        <div className="bg-[#030712] min-h-screen text-slate-100 font-sans antialiased pb-12 selection:bg-blue-600 selection:text-white">
            
            {/* Centered Premium Header component displaying the feature title */}
            <TeacherFeaturesHeader toDisplay="Notes" />
            
            {/* Core layout layer managing uniform spatial padding and fluid entrance animation */}
            <main className="animate-in fade-in slide-in-from-top-1 duration-300">
                <TeacherSubjects />
            </main>

        </div>
    );
};

export default Notes;