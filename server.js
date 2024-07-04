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

//middleware to parse incoming request bodies/ JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



//create a mysql connection
const db = mysql.createConnection({
    host:'localhost',
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

//Define a test route
app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/Home_u.html');
});

//signup route
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, regno, password } = req.body;

    //hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const member = {firstName, lastName, email, regno, password: hashedPassword};
    const query = 'INSERT INTO members SET ?';
        db.query(query, member, (err, result) => {
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
    const { regno, password } = req.body;
    const query = 'SELECT * FROM members WHERE Reg_No = ?';

    db.query(query, [regno], async (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error logging in' });
        }
        if (results.length === 0) {
            res.status(400).json({ message: 'User not found' });
        }  
            const member = results[0];
            //compare passwords
            const match = await bcrypt.compare(password, member.password);
            if (match) {
                res.status(200).json({ message: 'Login successful' });
            } 
                res.status(400).json({ message: 'Incorrect password' });
        
    });
});

// Password reset route
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const sql = 'UPDATE members SET password = ? WHERE email = ?';

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
//const PORT = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});

/*process.on('SIGINT', () =>{
    const server = server.close(()=>{
        console.log('process terminated');
        process.exit(0);
    });
});*/

//shutdown the server

//server.close();