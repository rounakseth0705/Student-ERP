import { useContext, useState } from "react";
import { CourseContext } from "../context/CoursesContext.jsx";
import toast from "react-hot-toast";

const CreateCourse = () => {
    const { createCourse } = useContext(CourseContext);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseDuration, setCourseDuration] = useState("");
    const handleCourseSubmit = async (event) => {
        const numericDuration = Number(courseDuration);
        if (Number.isNaN(numericDuration)) {
            toast.error("Invalid course duration");
            return;
        }
        event.preventDefault();
        await createCourse(courseName,courseCode,courseDuration);
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-blue-900 text-4xl mt-5 p-5 font-bold">Create course</h1>
            <form className="flex flex-col justify-center items-center mt-4 p-3 w-70 bg-blue-400 rounded-2xl shadow-2xl sm:p-5 sm:w-120 md:w-150 lg:w-200">
                <div className="flex flex-col justify-center items-center m-2">
                    <h1 className="m-2 text-2xl">Course name</h1>
                    <input onChange={(event) => setCourseName(event.target.value)} value={courseName} type="text" placeholder="enter course name" className="outline-0 m-2 p-2 w-50 bg-gray-300 rounded-full sm:w-100 sm:p-5" required />
                </div>
                <div className="flex flex-col justify-center items-center m-2">
                    <h1 className="m-2 text-2xl">Course code</h1>
                    <input onChange={(event) => setCourseCode(event.target.value)} value={courseCode} type="text" placeholder="enter course code" className="outline-0 m-2 p-2 w-50 bg-gray-300 rounded-full sm:w-100 sm:p-5" required />
                </div>
                <div className="flex flex-col justify-center items-center m-2">
                    <h1 className="m-2 text-2xl">Course duration</h1>
                    <input onChange={(event) => setCourseDuration(event.target.value)} value={courseDuration} type="text" placeholder="enter course duration" className="outline-0 m-2 p-2 w-50 bg-gray-300 rounded-full sm:w-100 sm:p-5" required />
                </div>
                <button onClick={(event) => handleCourseSubmit(event)} className="bg-gray-300 text-blue-950 rounded mt-1 py-2 px-4">Submit</button>
            </form>
        </div>
    )
}

export default CreateCourse;