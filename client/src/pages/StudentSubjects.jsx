// import StudentFeaturesHeader from "../components/StudentFeaturesHeader";
// import StudentSubjectList from "../components/StudentSubjectList.jsx";

// const StudentSubjects = () => {
//     return(
//         <>
//             <StudentFeaturesHeader toDisplay="Subjects"/>
//             <StudentSubjectList />
//         </>
//     )
// }

// export default StudentSubjects;

import StudentFeaturesHeader from "../components/StudentFeaturesHeader";
import StudentSubjectList from "../components/StudentSubjectList.jsx";

const StudentSubjects = () => {
    return (
        <div className="bg-slate-950 text-slate-300 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Module Layer Injection */}
            <StudentFeaturesHeader toDisplay="Subjects" />
            
            {/* Main Workspace Frame Panel */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 transition-all duration-300">
                <div className="w-full">
                    <StudentSubjectList />
                </div>
            </main>
            
        </div>
    );
};

export default StudentSubjects;