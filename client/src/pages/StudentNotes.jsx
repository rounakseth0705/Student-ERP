// import StudentFeaturesHeader from "../components/StudentFeaturesHeader.jsx";
// import StudentSubjectList from "../components/StudentSubjectList.jsx";

// const StudentNotes = () => {
//     return(
//         <>
//             <StudentFeaturesHeader toDisplay="Notes"/>
//             <StudentSubjectList isNavigate={true}/>
//         </>
//     )
// }

// export default StudentNotes;

import StudentFeaturesHeader from "../components/StudentFeaturesHeader.jsx";
import StudentSubjectList from "../components/StudentSubjectList.jsx";

const StudentNotes = () => {
    return (
        <div className="bg-slate-950 min-h-screen text-slate-300 font-sans antialiased pb-12">
            {/* Context Header Element Banner */}
            <StudentFeaturesHeader toDisplay="Notes" />
            
            {/* Layout Wrapper with Responsive Horizontal and Vertical Padding */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
                <StudentSubjectList isNavigate={true} />
            </div>
        </div>
    );
};

export default StudentNotes;