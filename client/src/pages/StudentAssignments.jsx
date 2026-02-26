import StudentFeaturesHeader from "../components/StudentFeaturesHeader";
import StudentSubjectList from "../components/StudentSubjectList";

const StudentAssignments = () => {
    return(
        <>
            <StudentFeaturesHeader toDisplay="Assignments"/>
            <StudentSubjectList isNavigate={true}/>
        </>
    )
}

export default StudentAssignments;