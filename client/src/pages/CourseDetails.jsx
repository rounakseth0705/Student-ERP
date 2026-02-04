import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import React from "react";
import plusIcon from "../assets/plusIcon.svg";
import removeIcon from "../assets/removeIcon.svg";
import editIcon from "../assets/editIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import clockIcon from "../assets/clockIcon.svg";
import { useState } from "react";

const CourseDetails = () => {
    const { course, subjects, deleteCourse, getCourse, getSubjects, deleteSubject, changeSubjectTeacher } = useContext(AdminDashboardContext);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [subjectCode, setSubjectCode] = useState("");
    const [newTeacherId, setNewTeacherId] = useState("");
    const [day, setDay] = useState(new Date().toLocaleString("en-US", { weekday: "long" }));
    // const day = useRef(new Date().toLocaleString("en-US", { weekday: "long" }));
    const [currentDate, setCurrentDate] = useState(new Date().getDate());
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [selectedDay, setSelectedDay] = useState(new Date().toLocaleString("en-US", { weekday: "long" }));
    const handleGetCourse = async () => {
        await getCourse(courseId);
    }
    const handleDeleteCourse = async () => {
        await deleteCourse(course.courseCode);
    }
    const handleGetSubjects = async () => {
        await getSubjects(courseId);
    }
    const handleDeleteSubject = async (subjectId) => {
        await deleteSubject(subjectId);
    }
    const handleEditTeacherId = async (subjectCode,teacherId) => {
        await changeSubjectTeacher(subjectCode,teacherId,newTeacherId);
        setSubjectCode("");
        setIsEditing(false);
    }
    const getCurrentClassTime = (index,minutesToAdd,isEndTime=false) => {
        const date = new Date();
        date.setHours(9,30,0,0);
        date.setMinutes(date.getMinutes() + (minutesToAdd*index));
        if (index > 3) {
            date.setMinutes(date.getMinutes() + 60);
        }
        if (!isEndTime) {
            return date.toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
        }
        if (isEndTime) {
            date.setMinutes(date.getMinutes() + minutesToAdd);
            return date.toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
        }
    }
    const getDate = (index) => {
        let dayToShow;
        if (day === "Monday") {
            dayToShow = currentDate - 0 + index;
            if (dayToShow < 1) {
                
            }
            return dayToShow;
        } else if (day === "Tuesday") {
            dayToShow = currentDate - 1 + index;
            return dayToShow;
        } else if (day === "Wednesday") {
            dayToShow = currentDate - 2 + index;
            return dayToShow;
        } else if (day === "Thursday") {
            dayToShow = currentDate - 3 + index;
            return dayToShow;
        } else if (day === "Friday") {
            dayToShow = currentDate - 4 + index;
            return dayToShow;
        } else if (day === "Saturday") {
            dayToShow = currentDate - 5 + index;
            return dayToShow;
        } else if (day === "Sunday") {
            dayToShow = currentDate - 6 + index;
            return dayToShow;
        }
    }
    const getSelectedDay = (index) => {
        if (index === 0) {
            return "Monday";
        } else if (index === 1) {
            return "Tuesday";
        } else if (index === 2) {
            return "Wednesday";
        } else if (index === 3) {
            return "Thursday";
        } else if (index === 4) {
            return "Friday";
        } else if (index === 5) {
            return "Saturday";
        } else if (index === 6) {
            return "Sunday";
        }
    }
    const handleAssignSubject = (index,minutesToAdd) => {
        const classTime = getCurrentClassTime(index,minutesToAdd).replace(" am","").replace(" pm","");
        console.log(classTime);
        navigate(`/admin-dashboard/courses/${courseId}/${index+1}/${selectedDay}/${classTime}`);
    }
    const setSelectedDayAndDate = (index) => {
        setSelectedDate(getDate(index));
        setSelectedDay(getSelectedDay(index));
    }
    useEffect(() => {
        handleGetCourse();
        handleGetSubjects();
    },[]);
    return(
        <>
            <h1 className="text-center text-blue-950 m-5 text-3xl font-semibold">Course Details</h1>
            <div className="flex flex-col justify-center items-center gap-5">
                <div className="flex flex-col justify-center bg-blue-400 text-white shadow-xl rounded p-8 sm:text-3xl md:text-4xl md:p-10">
                    <h1 className="m-2 p-2">Course name : {course.courseName}</h1>
                    <h1 className="m-2 p-2">Course code : {course.courseCode}</h1>
                    <h1 className="m-2 p-2">Course Duration : {course.duration} years</h1>
                    <h1 className="m-2 p-2">Total Semesters : {course.semesters}</h1>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={handleDeleteCourse} className="bg-red-600 text-white rounded mt-2 py-2 px-5 cursor-pointer hover:bg-red-500 transition-all duration-400 ease-in-out sm:mt-5 sm:text-2xl">Delete course</button>
                </div>
            </div>
            <div className="mt-5">
                {
                    Array(course.semesters).fill("").map((_,semester) => (
                        <React.Fragment key={semester}>
                            <h1 className="text-white bg-blue-400 font-semibold text-3xl text-center p-3 my-3">{course.courseName} - Semester {semester+1}</h1>
                            <div className="flex justify-center items-center gap-250">
                                { subjects.length > 0 && <h1 className="text-blue-950 text-2xl font-semibold p-2 mx-5">Subjects List</h1>}
                                <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${course.courseCode}/${semester+1}/create-subject`)} className="flex justify-center items-center gap-1 bg-blue-600 text-white rounded cursor-pointer p-2 mx-5 hover:bg-blue-500 transition-all duration-400 ease-in-out">
                                    Add Subject
                                    <img src={plusIcon} alt="plusIcon" className="w-5 h-5"/>
                                </button>
                            </div>
                            <div className="mt-5 mx-10 bg-blue-50 text-blue-950 rounded shadow-lg">
                                <div className="grid grid-cols-5 font-semibold p-2">
                                    <h1 className="mx-18">S.NO.</h1>
                                    <h1 className="mx-18">SUBJECT NAME</h1>
                                    <h1 className="mx-18">SUBJECT CODE</h1>
                                    <h1 className="mx-18">TEACHER ID</h1>
                                    <h1 className="mx-18">ACTION</h1>
                                </div>
                                { subjects.length > 0 &&
                                    subjects.filter(subject => subject.semester === semester+1).map((subject,index) => (
                                        <React.Fragment key={index}>
                                            <hr/>
                                            <div className="grid grid-cols-5 p-2">
                                                <h1 className="mx-18">{index+1}.</h1>
                                                <h1 className="mx-18">{subject.subjectName}</h1>
                                                <h1 className="mx-18">{subject.subjectCode}</h1>
                                                <div className="flex gap-2">
                                                    { isEditing && subject.subjectCode===subjectCode ? <input onChange={(event) => setNewTeacherId(event.target.value)} value={newTeacherId} type="text" placeholder="enter teacher id" className="border rounded px-1" /> : <h1 className="mx-18">{subject.teacherId.teacherId}</h1> }
                                                    { (isEditing && subject.subjectCode===subjectCode) && <img onClick={() => handleEditTeacherId(subject.subjectCode,subject.teacherId.teacherId)} src={checkIcon} alt="checkIcon" className="w-5 h-5 cursor-pointer" /> }
                                                </div>
                                                <div className="flex gap-3 mx-18">
                                                    <img onClick={() => {
                                                        setIsEditing(true);
                                                        setSubjectCode(subject.subjectCode);
                                                    }} src={editIcon} alt="editIcon" className="w-5 h-5 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out" />
                                                    <img onClick={() => handleDeleteSubject(subject._id)} src={removeIcon} alt="removeIcon" className="w-5 h-5 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out" />
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                            <h1 className="text-center mt-15 text-4xl font-semibold text-blue-950">Timetable</h1>
                            <div className="flex justify-between items-center bg-blue-400 mt-5 text-white">
                                <img src={leftArrow} alt="leftArrow" className="w-10 h-10 mx-10 cursor-pointer"/>
                                <h1 className="my-5 text-2xl font-semibold">{new Date().toLocaleString("en-US", { month: "long" })} ({new Date().getFullYear()})</h1>
                                <img src={rightArrow} alt="rightArrow" className="w-10 h-10 mx-10 cursor-pointer"/>
                            </div>
                            <div className="bg-blue-300 grid grid-cols-7 mt-1 mx-15 py-3 text-blue-950">
                                <h1 className="flex justify-center items-center">Monday</h1>
                                <h1 className="flex justify-center items-center">Tuesday</h1>
                                <h1 className="flex justify-center items-center">Webnesday</h1>
                                <h1 className="flex justify-center items-center">Thursday</h1>
                                <h1 className="flex justify-center items-center">Friday</h1>
                                <h1 className="flex justify-center items-center">Saturday</h1>
                                <h1 className="flex justify-center items-center">Sunday</h1>
                            </div>
                            <div className="grid grid-cols-7 mx-15 py-3 shadow-lg">
                                {
                                    Array(7).fill("").map((_,index) => (
                                        <h1 onClick={() => setSelectedDayAndDate(index)} key={index} className={`flex justify-center items-center font-semibold cursor-pointer ${selectedDate === getDate(index) && "bg-amber-500 shadow-md text-white"}`}>{getDate(index)}</h1>
                                    ))
                                }
                            </div>
                            <div className="my-2 mx-10 py-5 px-10 rounded-2xl shadow-lg">
                                {
                                    Array(6).fill("").map((_,classIndex) => (
                                        <div key={classIndex} className="flex justify-evenly border rounded my-2 mx-5 py-5">
                                            <div className="flex justify-center items-center gap-2">
                                                <img src={clockIcon} alt="clockIcon" className="w-5 h-5"/>
                                                <h1>{getCurrentClassTime(classIndex,55).replace(" am", "").replace(" pm","")} to {getCurrentClassTime(classIndex,55,true).replace(" am","").replace(" pm","")}</h1>
                                            </div>
                                            { subjects.length > 0 &&
                                                subjects.filter((subject) => subject.semester === semester+1).map((subject,index) => (
                                                    subject.schedule && subject.schedule[0] === selectedDay && subject.schedule[1] === getCurrentClassTime(classIndex,55) ?
                                                    <div key={index}>
                                                        <h1>{subject.name} - ({subject.subjectCode})</h1>
                                                        <h1>{subject.teacherId.teacherId}</h1>
                                                    </div> :
                                                    <button onClick={() => handleAssignSubject(classIndex,55)} className="flex justify-center items-center gap-1 px-5 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-all duration-400 ease-in-out">
                                                        Assign Subject to this lecture
                                                        <img src={plusIcon} alt="plusIcon" className="w-5 h-5"/>
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    )
}

export default CourseDetails;