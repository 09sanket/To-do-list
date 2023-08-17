const inputbox = document.querySelector(".inputbox input");
const add = document.querySelector("#addbutton");
const todolist = document.querySelector(".itemlist");
const pendingTasks = document.querySelector(".pendingTasks");
const clearall = document.querySelector(".clearall");
const deletedTasksContainer = document.querySelector(".deleted-tasks-container");
const deletedTasksList = document.querySelector(".deleted-tasks-list");



//@Sanket_rahangdale 
// #SHARPNERS PROJECT 
// Here I m adding comments for better understanding...

// Here, we'll check if there is any data in local storage and retrieve it if it exists
document.addEventListener("DOMContentLoaded", () => {
    const storedData = localStorage.getItem("todoListData");
    if (storedData) {
        item = JSON.parse(storedData);
        showresult();
    }
});

// Here we are using onkeyup event for hide and unhide Add button 
inputbox.onkeyup = () => {
    let UserEnterValue = inputbox.value;//Store user entered value
    if (UserEnterValue.trim() != 0) {//if the user value isn't only spaces
        add.style.display = "block"; //add button show
    }
    else {
        add.style.display = "none";//add button hide
    }
}

var item = [];

// here we added  Onclick  Event on plus icon to add info 
add.onclick = () => {
    item.push(inputbox.value)//Item Add In Array
    showresult(); // showresult call for add li tag in html etc.
    updateLocalStorage();
}

//  here we make Showresult function display all the added task in input form
function showresult() {
    let ListTag = "";
    item.forEach((element, index) => {
        ListTag += `<li>
                         <label class="box">
                            <input class="checkinput" type="checkbox">
                                <span class="checkmark"></span>${element}
                        </label>
                        <span class="icon">
                            <i class=" del uil uil-plus-circle" onclick="deleteTask(${index})"></i>
                        <span>
                    </li>`;
                });
    todolist.innerHTML = ListTag; // after adding infor in input we are adding new li tag inside ul tag
    inputbox.value = ""; // Here once task added the input field blank
    add.style.display = "none";// Here Add button will hide
    pendingTasks.textContent = item.length;//For toal left task counting the nums of tasks left 
    updateLocalStorage();
}


// Delete task function is used to remove the task from the list
function deleteTask(index) {
    item.splice(index, 1);//remove element from array
    showresult();
}
// delete all tasks function is used for delete all task from your list
clearall.onclick = () => {
    item = []; //empty the array
    // deletedTasksContainer.style.display = "none"; // Hide the deleted tasks container
    deletedTasksList.innerHTML = ""; // Clear the deleted tasks list
    showresult();
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem("todoListData", JSON.stringify(item));
}
// Clear Completed is used for which task complete delete from list.
document.querySelector('.clearcomtask').onclick = () => {
    var inputElems = document.querySelectorAll(".checkinput"); // Select selected task in list
    var temp = [] // create new arr to store completed tasks
    for (var i = 0; i < item.length; i++) {
        if (inputElems[i].checked === true) {
            temp.push(item[i]);
        }
    }
    var j = 0;
    for (i = 0; i < item.length; i++) {
        if (item[i] === temp[j]) {
            // If task is stored in temp array, remove from item array
            const deletedTask = item.splice(i, 1)[0];
            const deletedTaskTag = `
                <li>
                    
                    <label class="box">
                            <input class="checkinput" type="checkbox">
                                <span class="checkmark"></span>${deletedTask}
                        </label>
                </li>
            `;
            deletedTasksList.insertAdjacentHTML("beforeend", deletedTaskTag);

            j++;
            i--;
        }
       
    }
    showresult();
}

// Complete all task is used for completer all task
document.querySelector('.complete').onclick = () => {
    checked(true);
}
//Uncomplete all task is used for uncompleter all task
document.querySelector('.uncomplete').onclick = () => {
    checked(false);
}
//Checked funtion is used to checked and unchecked task
function checked(params) {
    var inputElems = document.querySelectorAll(".checkinput"); // Select selected task in list
    for (var i = 0; i < item.length; i++) {
        if (params == true) {
            inputElems[i].checked = true;
        }
        else {
            inputElems[i].checked = false;
        }
    }
}