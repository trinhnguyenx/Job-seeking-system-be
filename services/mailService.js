const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

    const  sendEmail = async ({ emailFrom, emailTo, subject, text }) => {
        console.log("here"+ process.env.SMTP_HOST,process.env.SMTP_USER,process.env.SMTP_PASS, process.env.SMTP_PORT);

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
        console.log(process.env.SMTP_HOST);
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