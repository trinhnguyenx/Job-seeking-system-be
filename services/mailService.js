const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

    const  sendEmail = async ({ emailFrom, emailTo, subject, text }) => {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            
        }
        );
        console.log(emailFrom,emailTo,subject,text);
        await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: subject,
            text: text
        });
    }
module.exports = {
    sendEmail 
};  