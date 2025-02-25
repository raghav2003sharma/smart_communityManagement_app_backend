import jwt from "jsonwebtoken";

export const authUser = async (req,res,next)=>{
    try{
    const token = req.cookie.token || req.headers["authorization"]
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