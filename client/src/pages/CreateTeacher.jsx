import { useContext, useState } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext";
import CreateTeacherAndStudent from "./CreateTeacherAndStudent";

const CreateTeacher = () => {
    const { createTeacher } = useContext(AdminDashboardContext);
    return(
        <>
            <CreateTeacherAndStudent role="teacher" createUser={createTeacher}/>
        </>
    )
}

export default CreateTeacher;