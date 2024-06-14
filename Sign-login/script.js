document.addEventListener('DOMContentLoaded', () =>{
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUp = document.getElementById('sign-up-form');
const logIn = document.getElementById('login-form');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



  signUp.addEventListener('submit', async (e) =>{
    e.preventDefault();

    //Getting the form data
    const formData = new FormData(signUp);
    const data = Object.fromEntries(formData.entries());

    //Sending a POST Request
    /*The code sends a POST request to the server using the `fetch` API. The request
    is sent to the `/register` endpoint, which is assumed to be a server-side endpoint that handles user registration. */
    try{
      const response = await fetch('http://localhost:3001/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
  });
  if(response.ok){
    alert('User signed up succesfuly');
  } else{
    alert('Signing up Failed');
  }
}
catch(error){
  console.error('Error:', error);
}
});

logIn.addEventListener('submit', async (e) =>{
  e.preventDefault();
  const formData = new FormData(logIn);
  const data = Object.fromEntries(formData.entries());

  try{
    const response = await fetch('http://localhost:3001/Sign-login/sign.css',{
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      //body: JSON.stringify({regno, password})
    });
    if(response.ok){
      alert('Signin successful');
    } else{
      alert('Invalid regno or password');
    }
  } catch(error){
    console.error('Error:', error);
  }
});

});


//function to match passwords
function matchPass() {
var Newpassword = document.RESET.Newpassword.value;
var Confirmpassword = document.RESET.Confirmpassword.value;

//CHECK if passwords match
if(Newpassword === Confirmpassword){
alert("Password Reset succesful")
  return true;
}
else{
  alert("Passwords do not match");
  return false;
}};
