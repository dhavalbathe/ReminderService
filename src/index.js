const express = require('express');

const {PORT} = require('./config/serverConfig');
const {sendBasicEmail} = require('./services/email-service');

const setUpAndStartServer = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);

        sendBasicEmail(
            'tpassdhaval@gmail.com',
            'dhavalbathe01@gmail.com',
            'This is a test mail',
            'This is the mail body, for testing purpose. Thank You !'
        );
    });
}

setUpAndStartServer();