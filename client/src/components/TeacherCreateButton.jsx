// import { useContext, useState } from "react";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";

// const TeacherCreateButton = ({ create, isUploading, setIsUploading, name, setName, subjectId, submitDate="", setSubmitDate, file }) => {
//     const { createAssignment, createNotes } = useContext(TeacherDashboardContext);
//     const [isCreating, setIsCreating] = useState(false);
//     const handleCreateAssignment = async () => {
//         if (isUploading) {
//             setIsCreating(true);
//             if (create === "Assignment") {
//                 await createAssignment(name,subjectId,submitDate,file);
//             } else {
//                 await createNotes(name,subjectId,file);
//             }
//             setName("");
//             setSubmitDate("");
//             setIsCreating(false);
//             setIsUploading(false);
//         } else {
//             setIsUploading(true);
//         }
//     }
//     return(
//         <button onClick={handleCreateAssignment} disabled={isCreating ? true : false} className="bg-red-500 rounded py-2 px-2 mt-5 text-white cursor-pointer hover:opacity-80 transition-all duration-400 ease-in-out text-xs sm:text-base sm:py-3 sm:px-3 lg:px-5">{ isUploading ? "Upload" : "Create" } {create}</button>
//     )
// }

// export default TeacherCreateButton;

import { useContext, useState } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// Premium Lucide Icons Ecosystem
import { Plus, Loader2 } from "lucide-react";

const TeacherCreateButton = ({ 
    create, 
    isUploading, 
    setIsUploading, 
    name, 
    setName, 
    subjectId, 
    submitDate = "", 
    setSubmitDate, 
    file 
}) => {
    const { createAssignment, createNotes } = useContext(TeacherDashboardContext);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateAssignment = async () => {
        if (isUploading) {
            setIsCreating(true);
            if (create === "Assignment") {
                await createAssignment(name, subjectId, submitDate, file);
            } else {
                await createNotes(name, subjectId, file);
            }
            setName("");
            setSubmitDate("");
            setIsCreating(false);
            setIsUploading(false);
        } else {
            setIsUploading(true);
        }
    };

    return (
        <button 
            onClick={handleCreateAssignment} 
            disabled={isCreating} 
            className={`w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none select-none ${
                isCreating 
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-transparent" 
                    : isUploading
                        ? "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-lg shadow-emerald-950/40 border border-transparent"
                        : "bg-[#090f1c]/40 border border-dashed border-slate-800 text-slate-300 hover:text-white hover:border-blue-900/50 hover:bg-[#0d1527]/40"
            }`}
        >
            {isCreating ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                    <span>Uploading Payload...</span>
                </>
            ) : (
                <>
                    {!isUploading && <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />}
                    <span>
                        {isUploading ? "Confirm & Upload" : `Create New ${create}`}
                    </span>
                </>
            )}
        </button>
    );
};

export default TeacherCreateButton;