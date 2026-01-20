export const verifyAccess = (...allowedRoles) => {
    return (req,res,next) => {
        try {
            if (!allowedRoles.includes(req.user.role)) {
                return res.json({ success: false, message: "Access denied" });
            }
            next();
        } catch(error) {
            console.log(error.message);
            return res.json({ success: false, message: error.message });
        }
    }
}