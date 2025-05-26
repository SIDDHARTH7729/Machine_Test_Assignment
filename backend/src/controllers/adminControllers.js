const { User } = require('../models');
const { hashPassword, checkPassword, generateToken } = require('../utils');

const register = async (req,res) =>{
    try {
        // taking input of and password from user
        const {email, password} = req.body;

        // checking if all the fields are there or not
        if(!email||!password){
           return res.status(400).json({message:"All fields are required"}) 
        }

        // encrypt the password
        const hashedPassword = hashPassword(password);

        // create a new user
        const newUser = await User.create({
            email,
            password: hashedPassword
        });

        // check if the user is created or not
        if(!newUser){
            return res.status(500).json({message:"User registration failed"});
        }

        //return the resposne that  new user has been saved 
        return res.status(201).json({message:"User registered successfully", user: newUser});
    } catch (error) {
        console.log("Some error occurred while registering user: ", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

const login = async (req, res) => {
    try {
        // taking input of email and password from user
        const { email, password } = req.body;

        // checking if all the fields are there or not
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // find the user by email
        const existingUser = await User.findOne({ email }).select('+password');

        // check if the user exists or not
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // compare the password with the hashed password
        const isPasswordValid = checkPassword(password, existingUser.password);

        // check if the password is valid or not
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // generate a JWT token
        const token = generateToken(existingUser._id, existingUser.role, existingUser.email);

        // return the response with token and user details
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            }
        });
    } catch (error) {
        console.log("Some error occurred while logging in user: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    register,
    login
}