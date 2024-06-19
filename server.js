const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mysql = require('mysql2');
const {check} = require('express-validator');

//create an express app
const app = express();
const port = 3001;



//create a mysql connection
const db = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'40300912',
    database:'Unesco'
}); 

//connect to mysql Database

db.connect((err)=>{
    if(err){
        console.error('Error connecting to the Mysql',err);
        return;
        }
    console.log('Connected to MySql!',err);
});

//Serve static files from the default directory
app.use(express.static(__dirname));


//middleware to parse incoming request bodies/ JSON data
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));


//Define a test route
app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/Home_u.html');
});

//Define a User representation for clarity
const member = {
    tableName: 'members',
    createMember: function(newMember, callback){
        connection.query('INSERT INTO' +this.tableName + 'SET ?', newMember, callback);
    },
    getMemberByFirstname: function(firstName, callback){
        connection.query('SELECT * FROM' + this.tableName + 'WHERE firstName = ?', firstName, callback);
    },
    getMemberByLastname: function(lastName, callback){
        connection.query('SELECT * FROM' + this.tableName + 'WHERE lastName = ?', lastName, callback);
    },
    getMemberByEmail: function(email, callback){
        connection.query('SELECT * FROM' + this.tableName + 'WHERE email = ?', email, callback);
    },
    getMemberByRegno: function(regno, callback){
        connection.query('SELECT * FROM' + this.tableName + 'WHERE regno = ?', regno, callback);
    },
}

//Registration route
/*app.post('/register', [
    //validate fields
    check('firstName').isLength({min: 3}).withMessage('Please enter a valid first name'),
    check('lastName').isLength({min: 3}).withMessage('Please enter a valid last name'),
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('regno').isLength({min: 3}).withMessage('Please enter a valid registration number'),
    check('password').isLength({min: 6}).withMessage('Please enter a valid password'),

    //custom validation to check if regno are unique
    check('regno').custom(async (value)=>{
        const member = await member.getMemberByRegno(value);
        if(member){
            throw new Error('Registration number already exists');
        }
    }),
], async (req, res) =>{
    //check for validation errors
    const validationResult = (req) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        return [];
    }
   /* const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, regno, password} = req.body;
    const member =(firstName, lastName, email, regno, password);
    res.send(member);

    //hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    //create a new user object
    const newMember = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        regno: req.body.regno,
        password: hashedPassword
    };

    // Insert member into MySQL

    member.createMember(newMember,(error, results, fields) =>{
        if(error){
            console.error('Error inserting member:' + error.message);
            return res.status(500).json({error: error.message});
        }
        console.log('Inserted a new member with id ' + results.insertId);
        res.status(201).json(newMember);
    });
}); */

//signup route
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, regno, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO members (First_Name, Second_Name, email, Reg_No, Password) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [firstName, lastName, email, regno, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error registering user' });
        } else {
            res.status(200).json({ message: 'User registered successfully' });
        }
    });
});


//login route
app.post('/login', (req, res) => {
    const { Reg_No, Password } = req.body;
    const sql = 'SELECT * FROM members WHERE Reg_No = ? AND Password = ?';

    db.query(sql, [Reg_No], async (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error logging in' });
        } else if (results.length === 0) {
            res.status(400).json({ message: 'User not found' });
        }
        else {
            const member = results[0];
            const match = await bcrypt.compare(Password, member.Password);
            if (match) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(400).json({ message: 'Incorrect password' });
            }
        }
    });
});

// Password reset route
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const sql = 'UPDATE members SET Password = ? WHERE email = ?';

    db.query(sql, [hashedPassword, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error resetting password' });
        } else if (result.affectedRows === 0) {
            res.status(400).json({ message: 'Email not found' });
        } else {
            res.status(200).json({ message: 'Password reset successful' });
        }
    });
});


app.post('/subscribe', (req, res) =>{
       const {email} = req.body;

       if (!validateEmail(email)){
              return res.status(400).json({message: 'Please enter a valid email address'});
           }
        //send a confirmation email
        sendconfirmationEmail(email);
        sendconfirmationEmail(email);

        res.status(200).json({message: 'subscription successful'});
});

//function to validate email
function validateEmail(email){
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

//function to send a confirmation email
function sendconfirmationEmail(email){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'kirinyagauniversityunesco@gmail.com',
            pass:'kyunescoleaders'
        }
    });

    const mailOptions ={
        from: 'kirinyagauniversityunesco@gmail.com',
        to: email,
        subject: 'Subscription Confirmation',
        text: 'Thank you for subscribing to our newsletter!'
    };

    transporter.sendMail(mailOptions,(error, info) =>{
        if(error){
            return console.log(error);
        }
        console.log('Email sent:' + info.response);
    });
}

//function to send Notification email
function sendNotificationEmail(subscriberEmail){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'kirinyagauniversityunesco@gmail.com',
            pass: 'kyunescoleaders'
        }
    });
    const mailOptions = {
        from: 'kirinyagauniversityunesco@gmail.com',
        to: subscriberEmail,
        subject: 'New Subscription',
        text: `A new user has subscribed to the newsletter: ${subscriberEmail}`
    };

    transporter.sendMail(mailOptions,(error, info) =>{
        if(error){
            return console.log(error);
        }
        console.log('Email sent:' + info.response);
    });
}
//start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

/*process.on('SIGINT', () =>{
    const server = server.close(()=>{
        console.log('process terminated');
        process.exit(0);
    });
});*/

//shutdown the server

//server.close();