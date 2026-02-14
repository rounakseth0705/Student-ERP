const CourseDetailsCard = ({ courseName, courseCode, duration, semesters }) => {
    return(
        <div className="flex flex-col justify-center bg-blue-400 text-white shadow-xl rounded px-8 py-3 sm:py-8 sm:text-3xl md:text-4xl md:p-10">
            <h1 className="m-2 p-1 sm:p-2">Course name : {courseName}</h1>
            <h1 className="m-2 p-1 sm:p-2">Course code : {courseCode}</h1>
            <h1 className="m-2 p-1 sm:p-2">Course Duration : {duration} years</h1>
            <h1 className="m-2 p-1 sm:p-2">Total Semesters : {semesters}</h1>
        </div>
    )
}

export default CourseDetailsCard;