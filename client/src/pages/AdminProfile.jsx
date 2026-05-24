import UserProfileHeader from "../components/UserProfileHeader.jsx";
import UserProfileFooter from "../components/UserProfileFooter.jsx";

const AdminProfile = () => {
    return(
        <div className="bg-gray-200 min-h-screen">
            <UserProfileHeader/>
            <UserProfileFooter/>
        </div>
    )
}

export default AdminProfile;