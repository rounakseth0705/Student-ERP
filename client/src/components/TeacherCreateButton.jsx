const TeacherCreateButton = ({ create, isUploading }) => {
    return(
        <button className="bg-red-500 rounded py-3 px-5 mt-5 text-white cursor-pointer hover:opacity-80 transition-all duration-400 ease-in-out">{ isUploading ? "Upload" : "Create" } {create}</button>
    )
}

export default TeacherCreateButton;