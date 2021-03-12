const { O_Auth } = require('../dataBase/models');
const { tokenizer } = require('../helper');
const { refresh_tokenService } = require('../service');
const { errorMessages } = require('../error');

module.exports = {
    findUser: async (req, res) => {
        try {
            const { language = 'en' } = req.body;

            const userId = req.params.id;

            const user = await refresh_tokenService.findUser(userId);

            if (!user) {
                res.json(errorMessages.USER_NOT_ENTER_YET[language]);
            }

            const tokens = tokenizer();

            await O_Auth.create({ ...tokens, _user_id: user._id });

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }
};
