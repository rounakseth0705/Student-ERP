
export const markAttendence = async (req,res) => {
    try {
        const { teacherId, subjectId, studentIds } = req.body;
        if (!teacherId || !subjectId || !studentIds) {
            return res.json({ success: false, message: "Details missing" });
        }
        
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}