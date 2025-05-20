import multer from "multer";


const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads')
  },
  filename:(req,file,cb)=>{
    const uniquename = Date.now()+'-'+file.originalname;
    cb(null,uniquename)
  }
})

const fileFilter = (req,file,cb)=>{
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValidtype = allowedTypes.test(file.mimetype)
  if(isValidtype){
    cb(null,true)
  }else{
    cb(new Error('only image files are allowed'),false)
  }
}
export const upload = multer({storage,fileFilter,limits:{
  fileSize:3*1024*1024
}})