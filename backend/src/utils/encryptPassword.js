const bcrypt = require('bcryptjs');
const encryptPassword = (password) => {
    if(!password){
        throw new Error("Password is required");
    }
    // generating a salt with 10 rounds
    const salt = bcrypt.genSaltSync(10);
    
    // Hash the password using the generated salt
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    return hashedPassword;
}

module.exports = encryptPassword