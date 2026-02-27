import { useContext } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import CreateTeacherAndStudent from "../components/CreateTeacherAndStudent";

const CreateAdmin = () => {
    const { createAdmin } = useContext(AdminDashboardContext);
    return(
        <>
            <CreateTeacherAndStudent role="admin" createUser={createAdmin}/>
        </>
    )
}

export default CreateAdmin;