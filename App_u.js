//Navbar toggle
let menu = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
  menu.classList.toggle('active');   
}

window.onscroll = () =>{
  menu.classList.remove('active');
}


//home couriesel
let slideIndex=0;
showSlides();

function showSlides(){
  const slides=document.querySelectorAll('.slider-slide');

  slides.forEach((slide)=>(slide.style.opacity=0));
  slideIndex=(slideIndex+1)%slides.length;
  slides[slideIndex].style.opacity=1;
  setTimeout(showSlides,5000);
}



//about buttons navigation
const btns=document.querySelectorAll('.tab-btn')
const about=document.querySelector('.about')
const articles=document.querySelectorAll('.content')

about.addEventListener("click", function(e){
    const id=e.target.dataset.id;
    if(id){
        //remove active from other buttons
        btns.forEach(function(btn){
            btn.classList.remove("active");
            e.target.classList.add("active");
        });
    //hide other aeticle
    articles.forEach(function(article){
        article.classList.remove('active')
    })
    const element=document.getElementById(id);
    element.classList.add("active")
    }
});
/*

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
*/