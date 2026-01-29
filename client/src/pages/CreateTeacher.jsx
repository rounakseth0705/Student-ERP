import { useContext, useState } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext";

const CreateTeacher = () => {
    const { createTeacher } = useContext(AdminDashboardContext);
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const handleCreateTeacher = async (event) => {
        event.preventDefault();
        await createTeacher(name,mobileNumber,email,password,courseCode,employeeId);
    }
    return(
        <div className="h-screen w-screen flex flex-col items-center">
            <h1 className="text-blue-900 text-3xl mt-5 font-semibold">Create Teacher</h1>
            <form className="m-5 bg-blue-300 py-4 px-5 rounded-2xl sm:px-20 md:px-30">
                <div>
                    <h1 className="p-1">Name</h1>
                    <input onChange={(event) => setName(event.target.value)} value={name} type="text" placeholder="enter name" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <div className="m-2">
                    <h1 className="p-1">Mobile no.</h1>
                    <input type="text" onChange={(event) => setMobileNumber(event.target.value)} value={mobileNumber} placeholder="enter mobile no." className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <div className="m-2">
                    <h1 className="p-1">Email</h1>
                    <input onChange={(event) => setEmail(event.target.value)} value={email} type="text" placeholder="enter email" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <div className="m-2">
                    <h1 className="p-1">Password</h1>
                    <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="enter password" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <div className="m-2">
                    <h1 className="p-1">Course code</h1>
                    <input onChange={(event) => setCourseCode(event.target.value)} value={courseCode} type="text" placeholder="enter course code" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <div className="m-2">
                    <h1 className="p-1">Employee Id</h1>
                    <input onChange={(event) => setEmployeeId(event.target.value)} value={employeeId} type="text" placeholder="enter employee id" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <button onClick={(event) => handleCreateTeacher(event)} className="py-2 px-5 my-3 rounded-full bg-white text-blue-950 cursor-pointer">Create teacher</button>
            </form>
        </div>
    )
}

export default CreateTeacher;