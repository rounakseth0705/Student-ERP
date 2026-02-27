import { useParams } from "react-router-dom"

const TeacherProfile = () => {
    const { userId } = useParams();
    return(
        <div>
            {userId}
        </div>
    )
}

export default TeacherProfile;