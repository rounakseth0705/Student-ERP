import { useParams } from "react-router-dom";

const SubjectAssignments = () => {
    const { courseId } = useParams();
    return(
        <div>Subject Assignments</div>
    )
}

export default SubjectAssignments;