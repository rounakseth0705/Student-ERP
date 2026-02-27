import { useParams } from "react-router-dom"

const StudentProfile = () => {
    const { userId } = useParams();
    return(
        <div>{userId}</div>
    )
}

export default StudentProfile;