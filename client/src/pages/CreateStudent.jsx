import { useContext } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import CreateTeacherAndStudent from "../components/CreateTeacherAndStudent.jsx";

const CreateStudent = () => {
    const { createStudent } = useContext(AdminDashboardContext);
    return(
        <>
            <CreateTeacherAndStudent role="student" createUser={createStudent}/>
        </>
    )
}

export default CreateStudent;