import UserProfileHeader from "../components/UserProfileHeader";
import UserProfileFooter from "../components/UserProfileFooter";

const StudentProfile = () => {
    return(
        <div className="bg-gray-200 min-h-screen">
            <UserProfileHeader/>
            <UserProfileFooter/>
        </div>
    )
}

export default StudentProfile;