import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";

const AboutCourse = () => {
    const { userIdentity } = useContext(UserContext);
    const { students, getCourseStudents } = useContext(TeacherDashboardContext);
    const handleGetCourseStudents = async () => {
        await getCourseStudents(userIdentity.courseId);
    }
    return(
        <div>
            <h1>About course</h1>
        </div>
    )
}

export default AboutCourse;