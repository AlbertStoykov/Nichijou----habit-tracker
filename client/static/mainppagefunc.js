const calenderBttn = document.querySelector('#calenderB');
const todayBttn = document.querySelector('#todayB');
const calDiv = document.querySelector('#calender-content')
const toDiv = document.querySelector('#today-content')

todayBttn.addEventListener('click',() =>{
    toDiv.style.display = 'block';
    calDiv.style.display = 'none';
   
});

calenderBttn.addEventListener('click',() =>{
    calDiv.style.display = 'block';
    toDiv.style.display = 'none';
   
});





