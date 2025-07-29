import jwt from "jsonwebtoken";

 const authUser = async (req,res,next)=>{
    try{
      if(!req.cookies){
        return res.status(404).send({error:"no token found"});
      }
      const token = req.cookies?.jwtToken || req.headers["authorization"]?.replace("Bearer ","");
      if(!token){
        return res.status(403).send({error:"unauthorized user"});
      }
      const decoded = jwt.verify(token,process.env.JWT_SECRET);                                    
      req.user = decoded;
      next();
    }catch(err){
      console.log(err);
    }
}
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.userRole;
      
      // Check if user has any of the required roles
      const hasRequiredRole = requiredRole === userRole;
      
      if (!hasRequiredRole) {
        return res.status(403).send('Access denied');
      }
      next();
    };
  };
  export {authUser,authorizeRole};