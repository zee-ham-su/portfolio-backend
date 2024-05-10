const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
    console.error(err.message, err.code);
    let message = { email: '', password: '' };
    // validation errors
    if (err.message.includes('user validation failed')) {
        console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            message[properties.path] = properties.message;
        });
    }

};


module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email: email, password: password});
        res.status(201).json(user);

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ error: "user is not created" });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body); 
    res.send('user login');
};

