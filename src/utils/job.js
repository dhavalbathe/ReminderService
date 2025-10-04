const cron = require('node-cron');
const sender = require('../config/emailConfig');

const { fetchPendingEmails, updateTicket } = require('../services/email-service');

const setUpJob = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await fetchPendingEmails();
        console.log("Response: ", response);
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if(err) {
                    console.log('error was occured while sending the email');
                    console.log(err);
                } else {
                    console.log('successfully send the reminder email');
                    console.log(data);
                    updateTicket(email.id, { status : 'SUCCESS' });
                }
            })
        })
    });
}

module.exports = setUpJob;