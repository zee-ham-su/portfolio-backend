const User = require('../models/User');


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
        console.log(err);
        res.status(400).json({ error: "user is not created" });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body); 
    res.send('user login');
};

