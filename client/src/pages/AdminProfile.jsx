import { useParams } from "react-router-dom";

const AdminProfile = () => {
    const { userId } = useParams();
    return(
        <div>
            {userId}
        </div>
    )
}

export default AdminProfile;