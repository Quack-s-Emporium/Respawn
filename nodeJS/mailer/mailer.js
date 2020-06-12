const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.etheral.email',
    port: 587,
    auth: {
        user: 'lawrence16@ethereal.email',
        pass: 'Kb2h18KqRGwsw6VjDF'
    }
}

module.exports = nodemailer.createTransport(mailConfig)