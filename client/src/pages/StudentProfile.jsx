import { useParams } from "react-router-dom"
import UserProfileHeader from "../components/UserProfileHeader";
import UserProfileFooter from "../components/UserProfileFooter";

const StudentProfile = () => {
    const { userId } = useParams();
    return(
        <>
            <UserProfileHeader/>
            <UserProfileFooter/>
        </>
    )
}

export default StudentProfile;