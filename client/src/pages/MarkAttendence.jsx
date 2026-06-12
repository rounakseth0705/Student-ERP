// import { useContext, useEffect } from "react";
// import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";
// import TeacherSubjects from "../components/TeacherSubjects";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import { UserContext } from "../context/AuthContext.jsx";

// const MarkAttendence = () => {
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
//             <TeacherFeaturesHeader toDisplay="Mark Attendence"/>
//             <TeacherSubjects isMarkingAttendance={true}/>
//         </>
//     )
// }

// export default MarkAttendence;

import { useContext, useEffect } from "react";
import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";
import TeacherSubjects from "../components/TeacherSubjects";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";

const MarkAttendance = () => {
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
        <div className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased pb-16">
            {/* Header Module for Dashboard Sub-features */}
            <TeacherFeaturesHeader toDisplay="Mark Attendance" />
            
            {/* Main view container optimized for consistent horizontal padding alignment */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
                <div className="bg-[#090f1c]/40 border border-slate-800/60 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
                    <TeacherSubjects isMarkingAttendance={true} />
                </div>
            </main>
        </div>
    );
};

export default MarkAttendance;