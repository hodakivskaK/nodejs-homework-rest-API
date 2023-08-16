const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendEmail = async (data) => {
    const email  = { ...data, from: "hodakivskachris@gmail.com" }
    // await sgMail.send(email);

await  sgMail.send(email)
  .then(() => {
    console.log('Email sent!!!')
  })
  .catch((error) => {
    console.error(error)
  })
    return true
}

module.exports = sendEmail;