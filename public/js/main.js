
var modal = document.getElementById("login-modal");

window.addEventListener("click", clickOutside);

function openLoginModal(){
        modal.style.display = "block";
}

function closeLoginModal(){
        modal.style.display = "none";
}

function clickOutside(even){
        if(even.target == modal){
        modal.style.display = "none";
        }
}

var modal2 = document.getElementById("create-account-modal");

function openAccountModal(){
        modal2.style.display = "block";
}

function closeAccountModal(){
        modal2.style.display = "none";
}

function clickOutside2(even){
        if(even.target == modal2){
        modal2.style.display = "none";
        }
}


var modal3 = document.getElementById("simpleModal3");

function openModal3(){
        modal3.style.display = "block";
}

function closeModal3(){
        modal3.style.display = "none";
}

function clickOutside3(even){
        if(even.target == modal){
        modal3.style.display = "none";
        }
}

window.userArray = new Array();

function pushArray(){
        var thing = document.getElementById('username').value;
        userArray.push(thing);
}
function loadUserName(){
        var node = document.createElement("h2");
        var usernm = userArray[0];
        console.log(userArray[0])
        var thing = document.createTextNode(usernm);
        var welcome = document.createTextNode("Welcome ");
        node.appendChild(welcome);
        node.appendChild(thing);
        document.getElementById("welcomeID").appendChild(node);
}
function getUserName(array){
        var node = document.createElement("h2");
        var welcome = document.createTextNode("Welcome ");
        var usernm = array[0];
        var thing = document.createTextNode(usernm);
        console.log(usernm);
        console.log(thing);
        console.log(welcome);
        node.appendChild(welcome);
        node.appendChild(thing);
        console.log(node);
        document.getElementById("welcomeID").appendChild(node);
}
function fillUserArray(){
        userArray.push(document.getElementById('username').value);
        getUserName(userArray);
}

function twofunctions(){
        openLoginModal();
        getUserName();
}
