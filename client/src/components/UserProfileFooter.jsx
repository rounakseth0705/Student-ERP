import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { useState } from "react";
import toast from "react-hot-toast";
import eyeIcon from "../assets/eyeIcon.svg";

const UserProfileFooter = () => {
    const { user, userIdentity, updatePassword, updatePasswordWithIdentifier } = useContext(UserContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isEyeing, setIsEyeing] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conformNewPassword, setConformNewPassword] = useState("");
    const handleUpdatePassword = async () => {
        if (newPassword !== conformNewPassword) {
            toast.error("Check new password!");
            return;
        }
        if (isForgotPassword) {
            await updatePasswordWithIdentifier(identifier,conformNewPassword);
        } else {
            await updatePassword(oldPassword,conformNewPassword);
        }
        setIsUpdating(prev => !prev);
        setIdentifier("");
        setOldPassword("");
        setNewPassword("");
        setConformNewPassword("");
        setIsEyeing(false);
    }
    const handleForgotPassword = () => {
        setIsForgotPassword(prev => !prev);
    }
    return(
        <div className="mt-5 text-blue-950 text-center">
            <span className="my-3 font-semibold">
                <h1>Email :- {user.email}</h1>
                <h1>Mobile No. :- {user.mobileNo}</h1>
            </span>
            { userIdentity &&
                <span className="font-semibold">
                    <h1 className="mt-3">{user.role === "student" ? `Student ID :- ${userIdentity.studentId}` : `Teacher ID :- ${userIdentity.teacherId}`}</h1>
                    <h1>{user.role === "student" ? `Roll No. :- ${userIdentity.rollNo}` : `Employee ID :- ${userIdentity.employeeId}`}</h1>
                </span>
            }
            <button onClick={() => setIsUpdating(prev => !prev)} className="bg-red-500 text-white mt-10 rounded px-3 py-1 cursor-pointer hover:bg-red-400 transition-all duration-300 ease-in-out">Update Password</button>
            { isUpdating &&
                <div className="flex flex-col items-center mt-8">
                    { isForgotPassword &&
                        <input onChange={(event) => setIdentifier(event.target.value)} value={identifier} type="text" placeholder="enter email or mobile" className="bg-gray-200 my-1 px-2 py-1 outline-0 rounded"/>
                    }
                    { !isForgotPassword &&
                        <div className="flex justify-center items-center gap-1">
                            <input onChange={(event) => setOldPassword(event.target.value)} value={oldPassword} type={isEyeing ? "text" : "password"} placeholder="enter old password" className="bg-gray-200 my-1 px-2 py-1 outline-0 rounded"/>
                            <span onClick={() => setIsEyeing(prev => !prev)}>
                                <img src={eyeIcon} alt="eyeIcon" className="w-4 h-4 cursor-pointer"/>
                            </span>
                        </div>
                    }
                    <div className="flex justify-center items-center gap-1">
                        <input onChange={(event) => setNewPassword(event.target.value)} value={newPassword} type={isEyeing ? "text" : "password"} placeholder="enter new password" className="bg-gray-200 my-1 px-2 py-1 outline-0 rounded"/>
                        <span onClick={() => setIsEyeing(prev => !prev)}>
                            <img src={eyeIcon} alt="eyeIcon" className="w-4 h-4 cursor-pointer"/>
                        </span>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        <input onChange={(event) => setConformNewPassword(event.target.value)} value={conformNewPassword} type={isEyeing ? "text" : "password"} placeholder="conform new password" className="bg-gray-200 my-1 px-2 py-1 outline-0 rounded"/>
                        <span onClick={() => setIsEyeing(prev => !prev)}>
                            <img src={eyeIcon} alt="eyeIcon" className="w-4 h-4 cursor-pointer"/>
                        </span>
                    </div>
                    <button onClick={handleUpdatePassword} className="bg-green-500 text-white mt-3 px-3 py-1 cursor-pointer rounded hover:bg-green-400 transition-all duration-300 ease-in-out">Set new password</button>
                    <h1 onClick={handleForgotPassword} className="mt-2 underline cursor-pointer">{isForgotPassword ? "Try another way?" : "Forgot password?"}</h1>
                </div>
            }
        </div>
    )
}

export default UserProfileFooter;