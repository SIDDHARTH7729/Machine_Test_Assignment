const jwt = require('jsonwebtoken')
const generateToken = (id,role,email) => {
    return jwt.sign({ id,role,email}, process.env.JWT_SECRET_KEY, { expiresIn: '2h' }); 
}

module.exports = generateToken