const express = require('express');

const {PORT, REMINDER_BINDING_KEY} = require('./config/serverConfig');
const EmailService = require('./services/email-service');
const setUpJob = require('./utils/job');

const {createChannel, subscribeMessage} = require('./utils/messageQueue');

const ticketController = require('./controllers/email-controller');

const setUpAndStartServer = async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post('/api/v1/ticket', ticketController.create);

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvent, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
        setUpJob();
    });
}

setUpAndStartServer();