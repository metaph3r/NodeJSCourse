require('dotenv').config()

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: true
    }
})

// transporter.verify((error, success) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// })

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        to: email,
        from: process.env.SMTP_FROM,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    transporter.sendMail({
        to: email,
        from: process.env.SMTP_FROM,
        subject: 'We are sorry you leave!',
        text: `Good bye, ${name}. Is there anything we could have done to prevent you leaving?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}