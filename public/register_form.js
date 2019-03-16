
console.log( "Hello World" )

const form = document.getElementById("registration")

form.addEventListener( 'submit', (evt) => {
    evt.preventDefault()
    const newUser = { username: evt.target.username.value, email: evt.target.email.value, password: evt.target.password.value}
    jsonUser = JSON.stringify(newUser)
    console.log(jsonUser)

    let xhr = new XMLHttpRequest();
    xhr.open("POST", __dirname + '/pedel_server', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
})