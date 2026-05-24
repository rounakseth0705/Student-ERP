const CourseDetailsCard = ({ courseName, courseCode, duration, semesters }) => {
    return(
        <div className="flex flex-col justify-center text-gray-700 px-8 py-3 text-sm sm:py-5 sm:text-2xl lg:py-6 lg:px-10">
            <h1 className="bg-white rounded-2xl shadow-xl m-2 px-12 py-3 sm:px-12 sm:py-4">Course name :- {courseName}</h1>
            <h1 className="bg-white rounded-2xl shadow-xl m-2 px-12 py-3 sm:px-12 sm:py-4">Course code :- {courseCode}</h1>
            <h1 className="bg-white rounded-2xl shadow-xl m-2 px-12 py-3 sm:px-12 sm:py-4">Course Duration :- {duration} years</h1>
            <h1 className="bg-white rounded-2xl shadow-xl m-2 px-12 py-3 sm:px-12 sm:py-4">Total Semesters :- {semesters}</h1>
        </div>
    )
}

export default CourseDetailsCard;