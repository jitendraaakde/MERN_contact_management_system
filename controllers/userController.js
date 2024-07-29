let errorMsg = "Hello Everyone"
const User = require('../models/userModel')

const homepage = (req, res) => {
    res.render('index');
};

const loginControl = (req, res) => {
    res.render('login', { errorMsg: 'Write your username and password' });
};


const contactControl = (req, res) => {
    res.render('contacts',{errorMsg:"Welcome to conatacts"});
};

const registerControl = (req, res) => {
    res.render('register', { errorMsg: "Fill your details" });
};


const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.render('register', { errorMsg: 'All fields are mandatory' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.render('register', { errorMsg: "User already registered. Please login." });
        }
        await User.create({ name, email, password });
        res.status(201).render('register', { errorMsg: 'User created, Please sign in' });

    } catch (error) {
        res.render('register', { errorMsg: 'Try Again' });
    }
};

const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({email});        
        if (!user) {
            return res.render('login', { errorMsg: "User not found,please signup" });
        }

        res.render('contacts',{errorMsg:`Hi ${user.name}`})
    } catch (error) {
        res.render('login', { errorMsg:"login is not renderd" });
    }
};

const showContactForUser = (req, res) => {
};

module.exports = {
    homepage,
    loginControl,
    contactControl,
    registerControl,
    createUser,
    loginUser,
};
