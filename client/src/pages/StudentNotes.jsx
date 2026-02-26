import StudentFeaturesHeader from "../components/StudentFeaturesHeader";
import StudentSubjectList from "../components/StudentSubjectList";

const StudentNotes = () => {
    return(
        <>
            <StudentFeaturesHeader toDisplay="Notes"/>
            <StudentSubjectList isNavigate={true}/>
        </>
    )
}

export default StudentNotes;