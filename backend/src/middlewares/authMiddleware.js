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