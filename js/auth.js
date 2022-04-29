async function requestLogin(e){
    e.preventDefault(); //prevents a event from happening ,prevents submitting the login form 
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target))) //convert form data to json
        }
       const r = await fetch(`http://localhost:3000/auth/login`, options) //wait for fetched request from local host and form data
        const data = await r.json()//wait for a response in json 
        if (data.err){ throw Error(data.err); } //if the login data is erronous throw error message
        login(data);// if login info is correction pass in data to the login function 
    } catch (err) { // catch any error 
       // console.warn(`Error: ${err}`);            //show a warning message
    }
}

async function requestRegistration(e) { 
    e.preventDefault();// prevents submitting the registration form
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target))) //converts form data to json
        }
        const r = await fetch(`http://localhost:3000/auth/register`, options) //fetch request from local host and form data
        const data = await r.json() // wait for the response in json 
        if (data.err){ throw Error(data.err) } // if erronous throw an error message
        requestLogin(e); //once register request login 
    } catch (err) { // catch error
        console.warn(err);
    }
}

function login(data){
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.user);
    location.hash = '#feed';
}

function logout(){
    localStorage.clear();
    location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}