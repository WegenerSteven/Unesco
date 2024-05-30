//const express = require('express')
//const bodyparser = require('bodyparser')
const mysql = require('mysql');


//create a mysql connection
const db = mysql.createConnection({
    host:'local host',
    user:'Wegenersteven',
    password:'40300912',
    database:'Unesco'
}); 

//connect to mysql Database

db.connect((err)=>{
    if(err){
        console.error('Error connecting to the Mysql', err);
        return;
        }
    console.log('Connected to MySql!');
});
