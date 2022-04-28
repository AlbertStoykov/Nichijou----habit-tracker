 var num = Math.ceil(Math.random() * totalCount);
  document.getElementById("bgRandom").style.backgroundImage= `static/img/${num}.jpg`;
 document.getElementById("bgRandom").style.backgroundSize = "cover";// Background repeat
 document.getElementById("bgRandom").backgroundColor= "red";