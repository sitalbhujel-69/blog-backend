import nodemailer from 'nodemailer';

const sendEmail = async(to,subject,text)=>{

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service:"gmail",
    secure:true,
    port:465,
    auth:{
      user:"ffooggoo6@gmail.com",
      pass:"fzju idoi jttt rudb"
    }
  })
  const mailOptions = {
    from:`kalpanatmg101@gmail.com`,
    to,
    subject,
    text
  }
  await transporter.sendMail(mailOptions)
}

export {sendEmail};