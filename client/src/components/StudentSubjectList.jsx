import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";

const StudentSubjectList = ({ isNavigate=false }) => {
    const { userIdentity } = useContext(UserContext);
    const { subjects, getSubjects } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const handleGetSubjects = async () => {
        await getSubjects(userIdentity.courseId._id,userIdentity.semester);
    }
    useEffect(() => {
        handleGetSubjects();
    },[]);
    return(
        <div className="grid grid-cols-2 gap-10 mt-15 mx-50">
            {
                subjects.map((subject,index) => (
                    <div key={index} onClick={() => isNavigate && navigate(`${subject._id}/${subject.subjectName}/${subject.subjectCode}`)} className="flex flex-col justify-center items-center py-5 bg-blue-200 text-blue-950 font-semibold rounded shadow-lg cursor-pointer hover:bg-blue-100 hover:text-blue-900 transition-all ease-in-out duration-400">
                        <h1>Subject: {subject.subjectName}</h1>
                        <h1>Code: {subject.subjectCode}</h1>
                        <h1>Semester: {subject.semester}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default StudentSubjectList;