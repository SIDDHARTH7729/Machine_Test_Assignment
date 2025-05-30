// This funcion authenticates the user by verifying the JWT token present in the request headers.
// This middleware checks if the request has a valid JWT token in the Authorization header.
// This token is used to authenticate the user and grant access to protected routes.
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
   console.log("Verifying token...");
   let token;
   let authHeader = req.headers.authorization||req.headers.Authorization;
   if(authHeader && authHeader.startsWith('Bearer ')){
       token = authHeader.split(' ')[1];
       if(!token){
           return res.status(401).json({success:false,message:"No token, Authorizaton denied"});
       }
       try {
         const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
         req.user = decode;
         next();
       } catch (error) {
        return res.status(401).json({success:false,message:"Token is not valid"});
       }
   }else{
         console.log("No token found in the request headers");
       return res.status(401).json({success:false,message:"No token, Authorizaton denied"});
   }
}

module.exports = verifyToken