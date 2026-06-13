// import StudentFeaturesHeader from "../components/StudentFeaturesHeader";
// import StudentSubjectList from "../components/StudentSubjectList";

// const StudentAssignments = () => {
//     return(
//         <>
//             <StudentFeaturesHeader toDisplay="Assignments"/>
//             <StudentSubjectList isNavigate={true}/>
//         </>
//     )
// }

// export default StudentAssignments;

import StudentFeaturesHeader from "../components/StudentFeaturesHeader";
import StudentSubjectList from "../components/StudentSubjectList";

const StudentAssignments = () => {
    return (
        <div className="bg-slate-950 min-h-screen text-slate-300 font-sans antialiased pb-12">
            {/* Global Styled Dashboard Header */}
            <StudentFeaturesHeader toDisplay="Assignments" />
            
            {/* Optimized Grid Framework Workspace Container */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 transition-all duration-300">
                <div className="w-full">
                    <StudentSubjectList isNavigate={true} />
                </div>
            </main>
        </div>
    );
};

export default StudentAssignments;