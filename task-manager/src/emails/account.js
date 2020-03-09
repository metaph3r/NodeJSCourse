require('dotenv').config()

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'mail.silvio-gloeckner.de',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: true
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
})

transporter.sendMail({
    from: 'silvio@silvio-gloeckner.de',
    to: 'silvio.gloeckner@outlook.de',
    subject: 'Email from NodeJS',
    text: 'This is a test message from NodeJS using nodemailer.'
})