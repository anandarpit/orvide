
function RedirectToRegister() {
    console.log("click on register");
  

    axios.get(`/auth/register`).then(response => {
        const data = response.data;
        console.log('data', data);

    })
}

// function RedirectToLogin() {
//     axios.get('/auth/login').then()
// }
          
function RegisterUser() {
    
          }

function LoginUser() {
    
}