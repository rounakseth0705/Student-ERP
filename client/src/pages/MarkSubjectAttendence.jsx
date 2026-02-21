import { useParams } from "react-router-dom";

const MarkSubjectAttendence = () => {
    const { subjectId } = useParams();
    return(
        <div>{subjectId}</div>
    )
}

export default MarkSubjectAttendence;