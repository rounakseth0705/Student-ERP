import { useContext, useState } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";

const TeacherCreateButton = ({ create, isUploading, setIsUploading, name, setName, subjectId, submitDate="", setSubmitDate, file }) => {
    const { createAssignment, createNotes } = useContext(TeacherDashboardContext);
    const [isCreating, setIsCreating] = useState(false);
    const handleCreateAssignment = async () => {
        if (isUploading) {
            setIsCreating(true);
            if (create === "Assignment") {
                await createAssignment(name,subjectId,submitDate,file);
            } else {
                await createNotes(name,subjectId,file);
            }
            setName("");
            setSubmitDate("");
            setIsCreating(false);
            setIsUploading(false);
        } else {
            setIsUploading(true);
        }
    }
    return(
        <button onClick={handleCreateAssignment} disabled={isCreating ? true : false} className="bg-red-500 rounded py-3 px-2 mt-5 text-white text-sm cursor-pointer hover:opacity-80 transition-all duration-400 ease-in-out sm:px-3 md:text-base md:px-5">{ isUploading ? "Upload" : "Create" } {create}</button>
    )
}

export default TeacherCreateButton;