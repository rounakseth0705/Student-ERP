import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";

import UserProfileHeader from "../components/UserProfileHeader.jsx";
import UserProfileFooter from "../components/UserProfileFooter.jsx";

const AdminProfile = () => {
    const { userId } = useParams();
    const { user, userIdentity } = useContext(UserContext);
    return(
        <>
            <UserProfileHeader/>
            <UserProfileFooter/>
        </>
    )
}

export default AdminProfile;