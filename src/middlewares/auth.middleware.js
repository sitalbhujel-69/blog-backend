import jwt from 'jsonwebtoken';

const requireAuth = async (req,res,next)=>{
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({message:"Unauthorized user"})

  }
  try {
    const decoded = jwt.verify(token,process.env.SECRET_TOKEN_KEY)
    req.user = decoded;
    next()
  } catch (error) {
    return res.status(500).json(`invalid token`);
  }
}

export {requireAuth}