import { useContext, useState } from "react";
import userIcon from "../assets/userIcon.svg";
import passwordIcon from "../assets/passwordIcon.svg";
import { UserContext } from "../context/AuthContext.jsx";
import CreateFirstAdmin from "../components/createFirstAdmin.jsx";

const Login = () => {
    const { login, isAdminExists } = useContext(UserContext);
    const [role, setRole] = useState("student");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const getRole = (event) => {
        setRole(event.target.value);
    }
    const handleLogin = async (event) => {
        event.preventDefault();
        await login(userId,password,role);
    }
    return isAdminExists ? (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#5C6FA3]">
            <h1 className="text-white text-3xl font-semibold mb-5 sm:text-5xl sm:font-extrabold sm:mb-10">{role.toUpperCase()} LOGIN</h1>
            <form className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center gap-1 m-2 sm:gap-5 sm:m-5">
                    <img src={userIcon} alt="userIcon" className="h-15 w-15 sm:h-20 sm:w-20" />
                    <input onChange={(event) => setUserId(event.target.value)} value={userId} type="text" placeholder={ role==="student" ? "Student Id" : role==="teacher" ? "Teacher Id" : "Email or Mobile no." } className="bg-gray-400 text-blue-950 outline-0 w-60 p-3 rounded-4xl sm:w-100 sm:p-5 md:w-120" />
                </div>
                <div className="flex justify-center items-center gap-1 m-2 sm:gap-5 sm:m-5">
                    <img src={passwordIcon} alt="passwordIcon" className="h-15 w-15 sm:h-20 sm:w-20" />
                    <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="Password" className="bg-gray-400 text-blue-950 outline-0 w-60 p-3 rounded-4xl sm:w-100 sm:p-5 md:w-120" />
                </div>
                <button onClick={(event) => handleLogin(event)} className="bg-white text-blue-950 font-semibold mt-5 py-2 px-10 rounded-full sm:text-3xl sm:py-5 sm:px-20">LOGIN</button>
            </form>
            <select onChange={getRole} className="mt-5 p-2 outline-0 text-white bg-blue-950 rounded">
                <option value="student">student</option>
                <option value="teacher">teacher</option>
                <option value="admin">admin</option>
            </select>
        </div>
    ) : (
        <CreateFirstAdmin/>
    )
}

export default Login;