import nodemailer from 'nodemailer';

const sendEmail = async(to,subject,text)=>{

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service:"gmail",
    secure:true,
    port:465,
    auth:{
      user:process.env.EMAIL,
      pass:process.env.PASS
    }
  })
  const mailOptions = {
    from:process.env.EMAIL,
    to,
    subject,
    text
  }
  await transporter.sendMail(mailOptions)
}

export {sendEmail};