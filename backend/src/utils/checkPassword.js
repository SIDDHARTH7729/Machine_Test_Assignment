// This func checks the entered password against a hashed password using bcrypt
const bcrypt = require('bcryptjs');

const checkPassword = async (enteredPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(enteredPassword, hashedPassword);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false; 
    }
};

module.exports = checkPassword;
