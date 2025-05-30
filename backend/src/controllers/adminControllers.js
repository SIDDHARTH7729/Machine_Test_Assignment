
const { User } = require('../models');
const { hashPassword, checkPassword, generateToken } = require('../utils');
const serialize = require('cookie').serialize;

const register = async (req, res) => {
    try {
        // taking input of and password from user
        const { email, password } = req.body;

        // checking if all the fields are there or not
        console.log("Registering user req received ");
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        // check if the user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(409).json({ success: false, message: "email already used, please try with another email" });
        }

        // encrypt the password
        const hashedPassword = hashPassword(password);

        // create a new user
        const newUser = await User.create({
            email,
            password: hashedPassword
        });

        // check if the user is created or not
        if (!newUser) {
            return res.status(500).json({ success: false, message: "User could not be created, please try again later" });
        }

        console.log("Sending response that user has been registered successfully");
        //return the resposne that  new user has been saved 
        return res.status(201).json({success:true, message: "User registered successfully", user: newUser });
    } catch (error) {
        console.log("Some error occurred while registering user: ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const login = async (req, res) => {
    // taking input of email and password from user
    const { email, password } = req.body;
    // checking if all the fields are there or not
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        // find the user by email
        const existingUser = await User.findOne({ email }).select('+password');

        // check if the user exists or not
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // compare the password with the hashed password
        // for checking console.log("Comparing password for users with password which came as body ", password, " and comparing with, ", existingUser.password);
        const isPasswordValid = await checkPassword(password, existingUser.password);

        // check if the password is valid or not
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "password Invalid" });
        }

        // generate a JWT token
        const token = generateToken(existingUser._id, existingUser.role, existingUser.email);

        const serialized = serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60, // 1 day in seconds
            path: '/'
        })
        res.setHeader('Set-Cookie', serialized);
        // return the response with user details
        console.log("Sending response that user has been logged in successfully");
        return res.status(200).json({
            success: true,
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
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        const serialized = serialize('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            expires: new Date(0),
            path: '/',
        });

        res.setHeader('Set-Cookie', serialized);

        return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("Logout failed:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    register,
    login,
    logout
}