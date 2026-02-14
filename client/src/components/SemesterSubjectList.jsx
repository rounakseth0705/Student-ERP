import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import checkIcon from "../assets/checkIcon.svg";
import editIcon from "../assets/editIcon.svg";
import removeIcon from "../assets/removeIcon.svg";

const SemesterSubjectList = ({ subjectName, subjectCode, teacher, newTeacherId, setNewTeacherId }) => {
    const { isEditing, setIsEditing, userIdentity } = useContext(UserContext);
    return(
        <>
            <hr/>
            <div className={`grid ${userIdentity ? "grid-cols-3" : "grid-cols-4"} p-2`}>
                <h1 className="flex justify-center flex-wrap sm:mx-2 md:mx-2 lg:mx-7">{subjectName}</h1>
                <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">{subjectCode}</h1>
                <div className="flex justify-center gap-1 sm:gap-2">
                    { isEditing && subject.subjectCode===subjectCode ? <input onChange={(event) => setNewTeacherId(event.target.value)} value={newTeacherId} type="text" className="border rounded px-1 w-20 sm:w-25 md:w-30"/> : <h1 className="sm:mx-2 md:mx-2 lg:mx-7">{teacher}</h1> }
                    { (isEditing && subject.subjectCode===subjectCode) && <img onClick={() => handleEditTeacherId(subjectCode,teacher)} src={checkIcon} alt="checkIcon" className="w-5 h-5 cursor-pointer" /> }
                </div>
                { !userIdentity &&
                    <div className="flex justify-center gap-1 sm:gap-2 sm:mx-2 md:gap-3 md:mx-2 lg:mx-7">
                        <img onClick={() => {
                            setIsEditing(true);
                            setSubjectCode(subject.subjectCode);
                        }} src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5" />
                        <img onClick={() => handleDeleteSubject(subject._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5" />
                    </div>
                }
            </div>
        </>
    )
}

export default SemesterSubjectList;