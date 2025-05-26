const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log("MONGO DB CONNECTION ERROR : ",error);
        process.exit(1); // Exit process with failure
    }
}

// exporting the database connection function
module.exports = connectToDB;