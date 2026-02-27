import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { useState } from "react";

const UserProfileFooter = () => {
    const { user, userIdentity } = useContext(UserContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const handleUpdatePassword = async () => {
        setIsUpdating(prev => !prev);
    }
    return(
        <div className="mt-5 text-blue-950 text-center">
            <span className="my-3 font-semibold">
                <h1>Email - {user.email}</h1>
                <h1>Mobile No. - {user.mobileNo}</h1>
            </span>
            { userIdentity &&
                <span className="font-semibold">
                    <h1 className="mt-3">{user.role === "student" ? `Student ID - ${userIdentity.studentId}` : `Teacher ID - ${userIdentity.teacherId}`}</h1>
                    <h1>{user.role === "student" ? `Roll No. - ${userIdentity.rollNo}` : `Employee ID - ${userIdentity.employeeId}`}</h1>
                </span>
            }
            <button onClick={handleUpdatePassword} className="bg-red-500 text-white mt-10 rounded px-3 py-1 cursor-pointer hover:bg-red-400 transition-all duration-300 ease-in-out">Update Password</button>
            { isUpdating &&
                <div className="flex flex-col items-center mt-8">
                    <div className="flex justify-center items-center gap-5">
                        <input type="text" placeholder="enter email or mobile" className="bg-gray-200 my-1 px-2 py-1 outline-0 rounded"/>
                        <input type="password" placeholder="enter old password" className="bg-gray-200 my-1 px-2 py-1 outline-0 rounded"/>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        <input type="password" placeholder="enter new password" className="bg-gray-200 my-1 px-2 py-1 outline-0 rounded"/>
                        <input type="text" placeholder="conform new password" className="bg-gray-200 my-1 px-2 py-1 outline-0 rounded"/>
                    </div>
                    <button className="bg-green-500 text-white mt-3 px-3 py-1 cursor-pointer rounded hover:bg-green-400 transition-all duration-300 ease-in-out">Set new password</button>
                </div>
            }
        </div>
    )
}

export default UserProfileFooter;