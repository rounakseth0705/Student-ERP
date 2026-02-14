import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";

const SemesterSubjectListHeader = ({ filteredSubjects }) => {
    const { userIdentity } = useContext(UserContext);
    return(
        <>
            <div className="flex justify-center items-center gap-12 sm:gap-50 md:gap-80 lg:gap-150 xl:gap-200">
                { filteredSubjects.length > 0 && <h1 className="text-blue-950 text-2xl font-semibold p-2 ml-2 sm:mx-5">Subjects List</h1> }
                { !userIdentity &&
                    <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${course.courseCode}/${semester+1}/create-subject`)} className="flex justify-center items-center gap-1 bg-blue-600 text-white text-sm rounded cursor-pointer p-2 mr-2 hover:bg-blue-500 transition-all duration-400 ease-in-out sm:text-base sm:mx-5">Add Subject</button>
                }
            </div>
            {/* { filteredSubjects.length > 0 &&

            } */}
        </>
    )
}

export default SemesterSubjectListHeader;