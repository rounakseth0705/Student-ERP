import StudentFeaturesHeader from "../components/StudentFeaturesHeader.jsx";
import StudentSubjectList from "../components/StudentSubjectList.jsx";

const StudentNotes = () => {
    return(
        <>
            <StudentFeaturesHeader toDisplay="Notes"/>
            <StudentSubjectList isNavigate={true}/>
        </>
    )
}

export default StudentNotes;