let errorMsg = "Hello Everyone"
const User = require('../models/userModel')
const Contact=require('../models/contactModel')
const mongoose=require('mongoose')

const homepage = (req, res) => {
    res.render('index');
};
const loginControl = (req, res) => {
    res.render('login', { errorMsg: 'Write your Email and Password' });
};

const contactControl =async (req, res) => {
    if(req.session.user_id){
        const allContacts = await Contact.find({user_id:req.session.user_id})
        res.render('contacts',{allContacts:allContacts});

    }else{
        res.redirect('login')
    }
    
};

const registerControl = (req, res) => {
    res.render('register', { errorMsg: "Please fill your details for register " });
};


const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.render('register', { errorMsg: "User already registered. Please login." });
        }
        await User.create({ name, email, password });
        res.status(201).render('register', { errorMsg: 'User created, Please Login' });

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


const addContacts = async (req,res)=>{
    const user_id=req.session.user_id;
    const {name,email,phone }=req.body;
    try {
        await Contact.create({ user_id, name, email, phone });
        res.status(201).redirect('contacts');

    } catch (error) {
        res.render('add', { errorMsg: 'Try Again to add contact' });
    }
}
const addDisplay=(req,res)=>{
    res.render('add',{errorMsg:'Please add your contact'})
}
const editController = async (req, res) => {
    const { id } = req.body; // Actual ID of the document
    const user_id = req.session.user_id; // User ID from the session
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
    }
    const { name, email, phone } = req.body;
    try {
        const updatedContact = await Contact.findByIdAndUpdate( id, 
            { user_id, name, email, phone }, 
            { new: true, runValidators: true } 
        );

        if (!updatedContact) {
            return res.status(404).send('Contact not found or no changes made');
        }

        const allContacts = await Contact.find({user_id:req.session.user_id})
        res.render('contacts',{username:req.session.username,allContacts:allContacts});
    
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).send('Server error');
    }
};

const deleteContacts = async (req, res) => {
    const { id }=req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid contact ID format');
        }

        const result = await Contact.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            const allContacts = await Contact.find({ user_id: req.session.user_id });
            return res.render('contacts', {
                username: req.session.username,
                allContacts: allContacts
            });
        } else {
            const allContacts = await Contact.find({ user_id: req.session.user_id });
            return res.render('contacts', {
                username: req.session.username,
                allContacts: allContacts
            });
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).send('Internal Server Error');
    }
}

const editPage=async (req,res)=>{
    const id = req.query.id;
    const editContact= await Contact.findOne({_id:id})
    res.render('edit',{editContact:editContact});
}

module.exports = {
    homepage,
    loginControl,
    contactControl,
    registerControl,
    createUser,
    loginUser,addContacts,addDisplay,editPage,editController,deleteContacts
};
