import { useContext, useEffect } from "react";
import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";
import TeacherSubjects from "../components/TeacherSubjects";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";

const MarkAttendence = () => {
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
            <TeacherFeaturesHeader toDisplay="Mark Attendence"/>
            <TeacherSubjects/>
        </>
    )
}

export default MarkAttendence;