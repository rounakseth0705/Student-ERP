import StudentFeaturesHeader from "../components/StudentFeaturesHeader";
import StudentSubjectList from "../components/StudentSubjectList.jsx";

const StudentSubjects = () => {
    return(
        <>
            <StudentFeaturesHeader toDisplay="Subjects"/>
            <StudentSubjectList />
        </>
    )
}

export default StudentSubjects;