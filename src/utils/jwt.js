import jwt from 'jsonwebtoken';

const generateToken = (user)=>{
  const {_id,email,username} = user
  return jwt.sign({
    _id,email,username
  },
  process.env.SECRET_TOKEN_KEY,
  {
    expiresIn:process.env.SECRET_TOKEN_EXPIRY
  }
)
}

const verifyToken = (token)=>{
  return jwt.verify(token,process.env.SECRET_TOKEN_KEY)
}

export {generateToken,verifyToken}