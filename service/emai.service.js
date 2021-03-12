const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');
const { errorMessages, ErrorHendler } = require('../error');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config/config');
const templatesInfo = require('../email-templates');

const templatesParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templatesInfoElement = templatesInfo[action];

        if (!templatesInfoElement) {
            throw new ErrorHendler(errorMessages.WRONG_EMAIL_TEMPLATE.status, errorMessages.WRONG_EMAIL_TEMPLATE.customCode);
        }

        const html = await templatesParser.render(templatesInfoElement.templateName, context);

        return transporter.sendMail({
            from: 'Dance Education Team',
            to: userMail,
            subject: templatesInfoElement.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
