//get login page
function getUser(req,res,next){
    res.render("users");
}

module.exports = {
    getUser
};