import { useContext, useEffect } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import TeacherSubjects from "../components/TeacherSubjects.jsx";
import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";

const Assignments = () => {
    const { userIdentity } = useContext(UserContext);
    const { getSubjects } = useContext(TeacherDashboardContext);
    const handleGetSubjects = async () => {
        await getSubjects(userIdentity._id);
    }
    useEffect(() => {
        handleGetSubjects();
    },[])
    return(
        <>
            <TeacherFeaturesHeader toDisplay="Assignments"/>
            <TeacherSubjects/>
        </>
    )
}

export default Assignments;