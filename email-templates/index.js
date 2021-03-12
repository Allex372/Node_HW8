const { emailActions } = require('../constant');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [emailActions.USER_DELETED]: {
        templateName: 'delete',
        subject: 'Your Account was deleted'
    }
};
