// import { useContext, useEffect } from "react";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import { UserContext } from "../context/AuthContext.jsx";
// import TeacherSubjects from "../components/TeacherSubjects.jsx";
// import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";

// const Assignments = () => {
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
//             <TeacherFeaturesHeader toDisplay="Assignments"/>
//             <TeacherSubjects/>
//         </>
//     )
// }

// export default Assignments;

import { useContext, useEffect } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import TeacherSubjects from "../components/TeacherSubjects.jsx";
import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";

const Assignments = () => {
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
        /* Structural viewport layout wrapper keeping UI perfectly dark across page mounts */
        <div className="bg-[#030712] min-h-screen text-slate-100 font-sans antialiased pb-12 selection:bg-blue-600 selection:text-white">
            
            {/* Context Centered Custom Header Component */}
            <TeacherFeaturesHeader toDisplay="Assignments" />
            
            {/* Secondary Content Layer to feed smooth layout entrance parameters */}
            <main className="animate-in fade-in slide-in-from-top-1 duration-300">
                <TeacherSubjects />
            </main>

        </div>
    );
};

export default Assignments;