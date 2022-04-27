//document.getElementById("createModal").innerHTML = `<div id="overlay"></div><div class="modalWhole" id="modalWhole"><div class="modalBox" id="modalBox"><div class="modalHeader"><button class="close-button">&times;</button></div><div class="modalCenterLogo"><img src="static/img/nichijou-logo-white.png" alt="logo" class="logomodal"></div><div class="modalForm"><form id=""><div class="row"><div class="col-4"><label class="labelForm" for="fname">First Name </label></div><div class="col-8"><input type="text" name="fname" id="fname" class="modalFormBox"></div></div><div class="row"><div class="col-4"><label class="labelForm" for="fname">Last Name </label></div><div class="col-8"><input type="text" name="lname" id="lname" class="modalFormBox"></div></div><div class="row"><div class="col-4"><label class="labelForm" for="fname">Username </label></div><div class="col-8"><input type="text" name="username" id="username" class="modalFormBox"></div></div><div class="row"><div class="col-4"><label class="labelForm" for="fname">Email </label></div><div class="col-8"><input type="email" name="email" id="email" class="modalFormBox"></div></div><div class="row"><div class="col-4"><label class="labelForm" for="fname">Password </label></div><div class="col-8"><input type="password" name="password" id="password" class="modalFormBox"></div></div><div class="register-btn"><input type="submit" value="Register" class="modal-btn"><button id="openLogIn" class="alternativeSign">Already registred? Log in!</button></div></form></div></div></div>`;

//everytime shows a random picture
var totalCount = 5;

var num = Math.ceil(Math.random() * totalCount);
document.getElementById("bgRandom").style.backgroundImage= `static/img/${num}.jpg`;
document.getElementById("bgRandom").style.backgroundSize = "cover";// Background repeat
document.getElementById("bgRandom").backgroundColor= "red";

console.log(`the backgrond number ${num} is selected`)