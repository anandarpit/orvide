const firstname = document.getElementById('first_name')
const lastname = document.getElementById('last_name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const cnfpass = document.getElementById('cnfpass')


function RedirectToRegister() {
    location.href = "/register.html";
}

function RedirectToLogin() {
    location.href = "/login.html";
}
          
function RegisterUser() {
    console.log("first name"+firstname.value);
    if (firstname.value || lastname.value || email.value || password.value || cnfpass.value) {
        axios({
            method: 'post',
            url: '/register',
            data: {
              firstName: firstname.value,
                lastName: lastname.value,
                password: password.value,
                cnfpass: cnfpass.value,
                email:email.value
            }
          });   
    }
   
}

function LoginUser() {
    
}