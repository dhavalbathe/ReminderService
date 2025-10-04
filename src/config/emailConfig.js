const nodemailer = require('nodemailer');

const {EMAIL_ID, EMAIL_PASSWORD} = require('./serverConfig');

const sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // <--- ignore self-signed certificate
    }
});

module.exports = sender;