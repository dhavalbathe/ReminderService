const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');

const ticketRepository = new TicketRepository();

const sendBasicEmail = (mailTo, mailSubject, mailBody) => {
    sender.sendMail({
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    });
}

const fetchPendingEmails = async() => {
    try {
        const response = await ticketRepository.get({ status: "PENDING" });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async(ticketId, data) => {
    try {
        const tickets = await ticketRepository.update(ticketId, data);
        return tickets;
    } catch (error) {
        console.log(error);
    }
}

const subscribeEvent = async(payload) => {
    try {
        const service = payload.service;
        const data = payload.data;
        console.log('in the subscribe event service');
        switch(service) {
            case 'CREATE_TICKET' : 
                await createNotification(data);
                break;
            case 'SEND_BASIC_MAIL' :
                await sendBasicEmail(data);
                break;
            default: 
                console.log('No valid event received');
                break;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvent
}