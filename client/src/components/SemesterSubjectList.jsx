import React, { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import editIcon from "../assets/editIcon.svg";
import removeIcon from "../assets/removeIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import { useNavigate } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";

const SemesterSubjectList = ({ filteredSubjects, courseId, courseCode, semester }) => {
    const { userIdentity, isEditing, newTeacherId, temperarySubjectCode, setTemperarySubjectCode, setNewTeacherId, setIsEditing } = useContext(UserContext);
    const { deleteSubject, changeSubjectTeacher } = useContext(AdminDashboardContext);
    const navigate = useNavigate();
    const handleEditTeacherId = async (subjectCode,teacherId) => {
        await changeSubjectTeacher(subjectCode,teacherId,newTeacherId);
        setTemperarySubjectCode("");
        setNewTeacherId("");
        setIsEditing(false);
    }
    const handleDeleteSubject = async (subjectId) => {
        await deleteSubject(subjectId);
    }
    return(
        <>
            <div className="flex justify-center items-center gap-12 sm:gap-50 md:gap-80 lg:gap-150 xl:gap-200">
                { filteredSubjects.length > 0 && <h1 className="text-blue-950 text-2xl font-semibold p-2 ml-2 sm:mx-5">Subjects List</h1> }
                { !userIdentity &&
                    <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${courseCode}/${semester}/create-subject`)} className="flex justify-center items-center gap-1 bg-blue-600 text-white text-sm rounded cursor-pointer p-2 mr-2 hover:bg-blue-500 transition-all duration-400 ease-in-out sm:text-base sm:mx-5">Add Subject</button>
                }
            </div>
            { filteredSubjects.length > 0 &&
                <div className="mt-5 mx-2 bg-blue-50 text-blue-950 text-sm rounded shadow-lg sm:text-base sm:mx-3 md:mx-5 lg:mx-10">
                    <div className={`grid ${userIdentity ? "grid-cols-3" : "grid-cols-4"} font-semibold py-2 sm:px-2`}>
                        <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">NAME</h1>
                        <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">CODE</h1>
                        <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">TEACHER</h1>
                        { !userIdentity && <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">ACTION</h1> }
                    </div>
                    { filteredSubjects.length > 0 &&
                        filteredSubjects.map((subject,index) => (
                            <React.Fragment key={index}>
                                <hr/>
                                <div className={`grid ${userIdentity ? "grid-cols-3" : "grid-cols-4"} p-2`}>
                                    <h1 className="flex justify-center flex-wrap sm:mx-2 md:mx-2 lg:mx-7">{subject.subjectName}</h1>
                                    <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">{subject.subjectCode}</h1>
                                    <div className="flex justify-center gap-1 sm:gap-2">
                                        { isEditing && subject.subjectCode===temperarySubjectCode ? <input onChange={(event) => setNewTeacherId(event.target.value)} value={newTeacherId} type="text" className="border rounded px-1 w-20 sm:w-25 md:w-30"/> : <h1 className="sm:mx-2 md:mx-2 lg:mx-7">{subject.teacherId.teacherId}</h1> }
                                        { (isEditing && subject.subjectCode===temperarySubjectCode) && <img onClick={() => handleEditTeacherId(subject.subjectCode,subject.teacherId.teacherId)} src={checkIcon} alt="checkIcon" className="w-5 h-5 cursor-pointer" /> }
                                    </div>
                                    { !userIdentity &&
                                        <div className="flex justify-center gap-1 sm:gap-2 sm:mx-2 md:gap-3 md:mx-2 lg:mx-7">
                                            <img onClick={() => {
                                                setIsEditing(true);
                                                setTemperarySubjectCode(subject.subjectCode);
                                            }} src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5" />
                                            <img onClick={() => handleDeleteSubject(subject._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5" />
                                        </div>
                                    }
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default SemesterSubjectList;