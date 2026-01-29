import crossIcon from "../assets/crossIcon.svg";

const ProfileSidebar = ({isMenuClicked,setIsMenuClicked}) => {
    return isMenuClicked && (
        <div className="fixed top-0 w-40 h-screen bg-yellow-500 flex flex-col justify-between items-center sm:w-60">
            <span onClick={() => setIsMenuClicked((prev) => !prev)} className="p-5">
                <img src={crossIcon} alt="crossIcon" className="h-10 w-10 cursor-pointer" />
            </span>
        </div>
    )
}

export default ProfileSidebar;