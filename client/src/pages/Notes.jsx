import { useContext, useEffect } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import AssignmentsAndNotesHeader from "../components/AssignmentsAndNotesHeader.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import TeacherSubjects from "../components/TeacherSubjects.jsx";

const Notes = () => {
    const { userIdentity } = useContext(UserContext);
    const { getSubjects } = useContext(TeacherDashboardContext);
    const handleGetSubjects = async () => {
        await getSubjects(userIdentity._id);
    }
    useEffect(() => {
        handleGetSubjects();
    },[]);
    return(
        <>
            <AssignmentsAndNotesHeader toDisplay="Notes"/>
            <TeacherSubjects/>
        </>
    )
}

export default Notes;