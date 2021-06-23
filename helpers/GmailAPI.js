const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require(`dotenv`).config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail(receiverEmail, subject, body) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: `initiatetenet@gmail.com`,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: { rejectUnauthorized: false }
        })

        const mailOptions = {
            from: 'orvide.com ✉ <initiatetenet@gmail.com>',
            to: receiverEmail,
            subject: subject,
            text: "Your OTP is: " + body
        };

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        return error
    }
}


module.exports = sendMail;