import StudentFeaturesHeader from "../components/StudentFeaturesHeader";
import StudentSubjectList from "../components/StudentSubjectList";

const StudentSubjects = () => {
    return(
        <>
            <StudentFeaturesHeader toDisplay="Subjects"/>
            <StudentSubjectList />
        </>
    )
}

export default StudentSubjects;