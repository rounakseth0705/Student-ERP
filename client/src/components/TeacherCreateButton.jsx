import { useContext, useState } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";

const TeacherCreateButton = ({ create, isUploading, setIsUploading, name, setName, subjectCode, submitDate="", setSubmitDate, file }) => {
    const { createAssignment, createNotes } = useContext(TeacherDashboardContext);
    const [isCreating, setIsCreating] = useState(false);
    const handleCreateAssignment = async () => {
        if (isUploading) {
            setIsCreating(true);
            if (create === "assignment") {
                await createAssignment(name,subjectCode,submitDate,file);
            } else {
                await createNotes(name,subjectCode,file);
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
        <button onClick={handleCreateAssignment} disabled={isCreating ? true : false} className="bg-red-500 rounded py-3 px-5 mt-5 text-white cursor-pointer hover:opacity-80 transition-all duration-400 ease-in-out">{ isUploading ? "Upload" : "Create" } {create}</button>
    )
}

export default TeacherCreateButton;