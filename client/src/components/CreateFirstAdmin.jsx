import userIcon from "../assets/userIcon.svg";
import telephoneIcon from "../assets/telephoneIcon.svg";
import mailIcon from "../assets/mailIcon.svg";
import passwordIcon from "../assets/passwordIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import keyIcon from "../assets/keyIcon.svg";
import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const CreateFirstAdmin = () => {
    const { createAdmin } = useContext(UserContext);
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [adminSecret, setAdminSecret] = useState("");
    const handleAdminCreation = async (event) => {
        try {
            event.preventDefault();
            await createAdmin(name,mobileNumber,email,password,role,adminSecret);
        } catch(error) {
            toast.error(error.message);
        }
    }
    return(
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#5C6FA3]">
            <h1 className="text-white text-3xl font-semibold mb-3 sm:text-4xl">Create First Admin</h1>
            <form className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center m-2 gap-1 sm:m-4 sm:gap-3">
                    <img src={userIcon} alt="mailIcon" className="w-10 h-10" />
                    <input onChange={(event) => setName(event.target.value)} value={name} type="text" placeholder="Name" className="bg-gray-400 text-blue-950 outline-0 p-3 rounded w-60 sm:w-90 sm:rounded-full" />
                </div>
                <div className="flex justify-center items-center m-2 gap-1 sm:m-4 sm:gap-3">
                    <img src={telephoneIcon} alt="telephoneIcon" className="w-10 h-10" />
                    <input onChange={(event) => setMobileNumber(event.target.value)} value={mobileNumber} type="text" placeholder="Mobile no." className="bg-gray-400 text-blue-950 outline-0 p-3 rounded w-60 sm:w-90 sm:rounded-full" />
                </div>
                <div className="flex justify-center items-center m-2 gap-1 sm:m-4 sm:gap-3">
                    <img src={mailIcon} alt="mailIcon" className="w-10 h-10" />
                    <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" placeholder="Email" className="bg-gray-400 text-blue-950 outline-0 p-3 rounded w-60 sm:w-90 sm:rounded-full" />
                </div>
                <div className="flex justify-center items-center m-2 gap-1 sm:m-4 sm:gap-3">
                    <img src={passwordIcon} alt="passwordIcon" className="w-10 h-10" />
                    <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="Password" className="bg-gray-400 text-blue-950 outline-0 p-3 rounded w-60 sm:w-90 sm:rounded-full" />
                </div>
                <div className="flex justify-center items-center m-2 gap-1 sm:m-4 sm:gap-3">
                    <img src={settingsIcon} alt="settingsIcon" className="w-10 h-10" />
                    <input onChange={(event) => setRole(event.target.value)} value={role} type="text" placeholder="Role" className="bg-gray-400 text-blue-950 outline-0 p-3 rounded w-60 sm:w-90 sm:rounded-full" />
                </div>
                <div className="flex justify-center items-center m-2 gap-1 sm:m-4 sm:gap-3">
                    <img src={keyIcon} alt="keyIcon" className="w-10 h-10" />
                    <input onChange={(event) => setAdminSecret(event.target.value)} value={adminSecret} type="password" placeholder="Admin secret" className="bg-gray-400 text-blue-950 outline-0 p-3 rounded w-60 sm:w-90 sm:rounded-full" />
                </div>
                <button onClick={handleAdminCreation} className="bg-white text-blue-950 font-semibold mt-2 px-5 py-2 rounded-full sm:px-10">Create Admin</button>
            </form>
        </div>
    )
}

export default CreateFirstAdmin;