// This function makes a jwt token using the user id, role, and email and JWT_SECRET_KEY from the environment variables
const jwt = require('jsonwebtoken')
const generateToken = (id,role,email) => {
    return jwt.sign({ id,role,email}, process.env.JWT_SECRET_KEY, { expiresIn: '24h' }); 
}

module.exports = generateToken