import { useContext } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";

const TeacherCreateButton = ({ create, isUploading, setIsUploading, assignmentName, assignmentSubjectCode, assignmentSubmitDate, assignmentFile }) => {
    const { createAssignment } = useContext(TeacherDashboardContext);
    const handleCreateAssignment = async () => {
        if (isUploading) {
            await createAssignment(assignmentName,assignmentSubjectCode,assignmentSubmitDate,assignmentFile);
            setIsUploading(false);
        } else {
            setIsUploading(true);
        }
    }
    return(
        <button onClick={handleCreateAssignment} className="bg-red-500 rounded py-3 px-5 mt-5 text-white cursor-pointer hover:opacity-80 transition-all duration-400 ease-in-out">{ isUploading ? "Upload" : "Create" } {create}</button>
    )
}

export default TeacherCreateButton;