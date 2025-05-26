const bcrypt = require('bcryptjs');
const checkPassword = async (checkPassword,userPassword) =>{
    try {
        return await bcrypt.compare(checkPassword,userPassword);
    } catch (error) {
        console.log("Some error occured while comparing the password during login ",error);
        return res.json({message:"Internal server error"});
    }
}

module.exports = checkPassword