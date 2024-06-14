
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


//subcribe button
document.getElementById('subscribeBtn').addEventListener('click', function(event){
    event.preventDefault();
  
    var email = document.getElementById('email').value;
    var responseMessage = document.getElementById('responseMessage');
  
    if(validateEmail(email)){
        //simulate an API request
        fetch('http://localhost:3001/subscribe',{
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email: email})
        })
        .then(response => response.json())
        .then(data =>{
            responseMessage.textContent = data.message;
            responseMessage.style.color = 'green';
            document.getElementById('subscribeForm').reset();
        })
        .catch(error =>{
            responseMessage.textContent = 'An error occured. Please try again later.';
            responseMessage.style.color = 'red';
        });
        }else{
            responseMessage.textContent = 'Please Enter a valid email address';
            responseMessage.style.color = 'red';
    }   
  });
  
  //function to validate email
  function validateEmail(email){
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(email);
  }

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxXi_jPHTtAbTRf7LiV4ZrEY0Nc0x2mxkerfoLQ57Yog58SXwaJlEPQCykSYUm5WmJo/exec'
  const form = document.forms['submit-to-google-sheet']

  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message sent successfully!"
        setTimeout(function(){
          msg.innerHTML = ""
        }, 5000)   
        form.reset();
      })
      .catch(error => console.error('Error!', error.message))
  })
