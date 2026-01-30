import { useState } from "react";

const CreateTeacherAndStudent = ({role,createUser}) => {
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [uniqueId, setUniqueId] = useState("");
    const handleCreateStudent = async (event) => {
        event.preventDefault();
        await createUser(name,mobileNumber,email,password,courseCode,uniqueId,role);
    }
    return(
        <div className="h-screen w-screen flex flex-col items-center">
            <h1 className="text-blue-900 text-3xl mt-5 font-semibold">Create {role}</h1>
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
                    <h1 className="p-1">{role==="student" ? "Roll no." : "Employee Id"}</h1>
                    <input onChange={(event) => setUniqueId(event.target.value)} value={uniqueId} type="text" placeholder={role==="student" ? "enter roll no." : "enter employee id"} className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <button onClick={(event) => handleCreateStudent(event)} className="py-2 px-5 my-3 rounded-full bg-white text-blue-950 cursor-pointer">Create {role}</button>
            </form>
        </div>
    )
}

export default CreateTeacherAndStudent;