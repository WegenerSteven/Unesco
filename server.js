const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const {check} = require('express-validator');
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
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));

/*app.post('/register', (req, res) =>{
    const{firstName, lastName, email, regno, password} =req.body();

    const sql = 'INSERT INTO members(firstName, lastName, email, password) VALUES (?,?,?,?)';
});*/

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
app.post('/register', [
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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {firstName, lastName, email, regno, password} = req.body;
    const member = newMember(firstName, lastName, email, regno, password);
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
});

//start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () =>{
    server.close(()=>{
        console.log('process terminated');
        process.exit(0);
    });
});

//shutdown the server

//server.close();