import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIconWhite.svg";
import { useContext, useEffect } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";

const Assignments = () => {
    const { userIdentity } = useContext(UserContext);
    const { getSubjects, subjects } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const handleGetSubjects = async () => {
        await getSubjects(userIdentity._id);
    }
    useEffect(() => {
        handleGetSubjects();
    },[])
    return(
        <>
            <img onClick={() => navigate("/teacher-dashboard")} src={homeIcon} alt="homeIcon" className="fixed left-15 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-3xl text-white bg-blue-800 font-semibold text-center py-5">Assignments</h1>
            <div className="grid grid-cols-2 gap-10 mt-15 mx-50">
                {
                    subjects.map((subject,index) => (
                        <div key={index} onClick={() => navigate(`${subject._id}/${subject.subjectName}/${subject.subjectCode}`)} className="flex flex-col justify-center items-center py-5 bg-blue-200 text-blue-950 font-semibold shadow-lg cursor-pointer hover:bg-blue-100 hover:text-blue-900 transition-all ease-in-out duration-400">
                            <h1>Subject: {subject.subjectName}</h1>
                            <h1>Code: {subject.subjectCode}</h1>
                            <h1>Semester: {subject.semester}</h1>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Assignments;