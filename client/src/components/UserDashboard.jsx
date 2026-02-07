import { useNavigate } from "react-router-dom";

const UserDashboard = ({ option1, option2, option3, option4, option5, option6, dashboard, navigate1, navigate2, navigate3, navigate4, navigate5, navigate6 }) => {
    const navigate = useNavigate();
    return(
        <div className="grid gird-rows-6 grid-cols-1 gap-5 text-white font-semibold mt-5 mx-20 sm:mt-10 sm:mx-20 md:mx-30 lg:mx-40 h-[75vh] sm:grid-rows-3 sm:grid-cols-2">
                <div onClick={() => navigate(`/${dashboard}/${navigate1}`)} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>{option1}</h1>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate2}`)} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>{option2}</h1>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate3}`)} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>{option3}</h1>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate4}`)} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>{option4}</h1>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate5}`)} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>{option5}</h1>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate6}`)} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-400 ease-in-out cursor-pointer sm:flex-col">
                    <h1>{option6}</h1>
                </div>
        </div>
    )
}

export default UserDashboard;