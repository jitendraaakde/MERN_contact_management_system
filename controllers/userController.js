let errorMsg = "Hello Everyone"
const User = require('../models/userModel')
const Contact=require('../models/contactModel')
const mongoose=require('mongoose')

const homepage = (req, res) => {
    res.render('index');
};
const addControl = (req, res) => {
    res.render('add', { errorMsg: 'Add your contacts in contactBook' });
};

const loginControl = (req, res) => {
    res.render('login', { errorMsg: 'Write your username and password' });
};


const contactControl =async (req, res) => {

    if(req.session.user_id){
        const allContacts = await Contact.find({user_id:req.session.user_id})
        res.render('contacts',{username:req.session.username,allContacts:allContacts});

    }else{
        res.redirect('login')
    }
    
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
        const user = await User.findOne({email,password});   
        if (!user) {
            return res.render('login', { errorMsg: "User not found,please signup" });
        }else{
            req.session.username=user.name;
            req.session.user_id=user._id.toString();
            res.redirect('contacts')
        }
        
    } catch (error) {
        res.render('login', { errorMsg:"login is not renderd" });
    }
};

const showContactForUser = (req, res) => {
};

const addContacts = async (req,res)=>{
    const user_id=req.session.user_id;
    const {name,email,phone }=req.body;
    if (!name || !email || !phone) {
        return res.render('add', { errorMsg: 'All fields are mandatory' });
    }

    try {
        // const userExists = await User.findOne({ email, userId});
        // if (userExists) {
        //     return res.render('add', { errorMsg: "User already present in your contactBook" });
        // }
        await Contact.create({ user_id, name, email, phone });
        res.status(201).redirect('contacts');

    } catch (error) {
        res.render('add', { errorMsg: 'Try Again to add contact' });
    }
}
const addDisplay=(req,res)=>{
    res.render('add',{errorMsg:'add is displaying'})
}
const editController = async (req, res) => {
    const { id } = req.params; // Actual ID of the document
    const user_id = req.session.user_id; // User ID from the session
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
    }
    const { name, email, phone } = req.body;
    try {
        // Find and update the contact
        const updatedContact = await Contact.findByIdAndUpdate( id, // Document ID
            { user_id, name, email, phone }, // Update fields
            { new: true, runValidators: true } // Options: `new` returns updated document, `runValidators` applies validation
        );

        if (!updatedContact) {
            console.log('Data not modified');
            return res.status(404).send('Contact not found or no changes made');
        }

        // Send the updated contact as a response
        res.render('contacts')
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).send('Server error');
    }
};



const editPage=async (req,res)=>{
    const {id}=req.params;
    const editContact= await Contact.findOne({_id:id})
    // req.session.editContact=editContact;
    res.render('edit',{editContact:editContact});
}

module.exports = {
    homepage,
    loginControl,
    contactControl,
    registerControl,
    createUser,
    loginUser,addControl,addContacts,addDisplay,editPage,editController
};
