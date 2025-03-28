const isAdminAuth = (req,res,next) => {
    const token = "xyzz";
    const isAuthenticated = token === "xyz";
    if (!isAuthenticated) {
        res.status(401).send("Unauthorized")
    }
    else {
        next()
    }
}

module.exports = {isAdminAuth}