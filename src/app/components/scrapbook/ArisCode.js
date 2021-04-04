// const router = require('express').Router()
// let nodemailer = require('nodemailer')
// module.exports = router
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   auth: {
//     user: 'egreetr@gmail.com',
//     pass: process.env.emailSecret
//   }
// })
// //POST /api/emails/
// router.post('/', (req, res, next) => {
//   const recipient = req.body.recipientName
//   const recipientEmail = req.body.recipientEmail
//   const yourEmail = req.body.yourEmail
//   const yourName = req.body.name
//   const id = req.body.id
//   let mail = {
//     from: 'egreetr@gmail.com',
//     to: recipientEmail,
//     bcc: yourEmail,
//     subject: `You've received an eCard from ${yourName}!`,
//     html: `<h3>Dear ${recipient},</h3><h4>You have received an eCard from ${yourName}!</h4><p>See your card at http://egreetr.herokuapp.com/cards/${id} </p><p>Click <a href="http://egreetr.herokuapp.com">here</a> to create your own card!</p><h4>Yours,</h4><h4>The eGreetr Team</h4>`
//   }
//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         status: 'fail'
//       })
//     } else {
//       res.json({
//         status: 'success'
//       })
//     }
//   })
// })
