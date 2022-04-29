// Start of side bar buttons 

const calenderBttn = document.querySelector('#calenderB');
const todayBttn = document.querySelector('#todayB');
const reminderBttn = document.querySelector('#reminderB');
const calDiv = document.querySelector('#calender-content')
const toDiv = document.querySelector('#today-content')
const remDiv = document.querySelector('#reminder-content')

toDiv.style.display = 'none';
calDiv.style.display = 'none';
remDiv.style.display = 'block';

todayBttn.addEventListener('click', () => {
    toDiv.style.display = 'block';
    calDiv.style.display = 'none';
    remDiv.style.display = 'none';

});

calenderBttn.addEventListener('click', () => {
    calDiv.style.display = 'block';
    toDiv.style.display = 'none';
    remDiv.style.display = 'none';

});

reminderBttn.addEventListener('click', () => {
    remDiv.style.display = 'block';
    toDiv.style.display = 'none';
    calDiv.style.display = 'none';

});
// End of side bar buttons ^

//Start of reminder page functions

window.addEventListener('load', () => {
    const form = document.querySelector("#new-reminder-form")
    const input = document.querySelector("#new-reminder-input")
    const description = document.querySelector("#new-reminder-description")
    const frequency = document.querySelector("#new-reminder-frequency")
    const list_el = document.querySelector("#reminders")

    form.addEventListener('submit',(e) => {
        e.preventDefault();

        const reminder =input.value;
        const desc =description.value;
        const freq =frequency.value;

        if(!reminder){
            alert("Please fill out reminder")
            return
        }

        const reminder_el = document.createElement("div");
        reminder_el.classList.add("reminder");

        const reminder_content_el = document.createElement("div");
        reminder_content_el.classList.add("rem-content");

        reminder_el.appendChild(reminder_content_el);

        const reminder_input_el1 =document.createElement("input");
        reminder_input_el1.classList.add("habit");
        reminder_input_el1.type = "text";
        reminder_input_el1.value = ("Habit:"+ " " + reminder);
        reminder_input_el1.setAttribute("readonly","readonly");

        const reminder_input_el2 =document.createElement("input");
        reminder_input_el2.classList.add("description");
        reminder_input_el2.type = "text";
        reminder_input_el2.value = ("Description:"+ " " + desc);
        reminder_input_el2.setAttribute("readonly","readonly");

        const reminder_input_el3 =document.createElement("input");
        reminder_input_el3.classList.add("description");
        reminder_input_el3.type = "text";
        reminder_input_el3.value = ("Frequency:"+ " " + freq);
        reminder_input_el3.setAttribute("readonly","readonly");


        reminder_content_el.appendChild(reminder_input_el1);
        reminder_content_el.appendChild(reminder_input_el2);
        reminder_content_el.appendChild(reminder_input_el3);

        const reminder_actions_el = document.createElement("div");
        reminder_actions_el.classList.add("rem-actions");

        const reminder_edit_el = document.createElement("button");
        reminder_actions_el.classList.add("edit");
        reminder_edit_el.innerText = "Edit"

        const reminder_delete_el = document.createElement("button");
        reminder_actions_el.classList.add("delete");
        reminder_delete_el.innerText = "Delete";

        reminder_actions_el.appendChild(reminder_edit_el);
        reminder_actions_el.appendChild(reminder_delete_el);

        reminder_el.appendChild(reminder_actions_el);

        list_el.appendChild(reminder_el);

        input.value = " ";
        desc.value = " ";
        freq.value = " ";

        reminder_edit_el.addEventListener('click', () => {
          if(reminder_edit_el.innerText.toLowerCase() == "edit"){  
            reminder_input_el1.removeAttribute("readonly");
            reminder_input_el2.removeAttribute("readonly");
            reminder_input_el3.removeAttribute("readonly");
            reminder_input_el1.focus();
            reminder_input_el2.focus();
            reminder_input_el3.focus();
            reminder_edit_el.innerText = "Save";
          }else{
              reminder_input_el1.setAttribute("readonly","readonly");
              reminder_input_el2.setAttribute("readonly","readonly");
              reminder_input_el3.setAttribute("readonly","readonly");
              reminder_edit_el.innerText = "Edit";
          };
        });

        reminder_delete_el.addEventListener('click', () => {
            list_el.removeChild(reminder_el);
        });


    })
})




