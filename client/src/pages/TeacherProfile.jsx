import { useParams } from "react-router-dom"
import UserProfileHeader from "../components/UserProfileHeader";
import UserProfileFooter from "../components/UserProfileFooter";

const TeacherProfile = () => {
    const { userId } = useParams();
    return(
        <>
            <UserProfileHeader/>
            <UserProfileFooter/>
        </>
    )
}

export default TeacherProfile;