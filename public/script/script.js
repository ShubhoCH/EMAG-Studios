const labels = document.querySelectorAll('.form-control label');
const form = document.getElementById('formSubmit');
let name = document.getElementById('userName');
let email = document.getElementById('userEmail');
let number = document.getElementById('userNumber');
let message = document.getElementById('userMessage');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        subject: name.value,
        number: number.value,
        message: message.value
    }
   
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if(xhr.responseText == 'success') {
            alert('Email Sent');
            name.value = '';
            email.value = '';
            number.value='';
            subject.value = '';
            message.value = '';
        } else {
            alert('something went wrong, please email us at emagstudiosofficial@gmail.com');
            name.value = '';
            email.value = '';
            number.value='';
            subject.value = '';
            message.value = '';
        }
    }

    xhr.send(JSON.stringify(formData))
})





  

// STYLING
labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')    
})

window.onscroll = () => {
    const nav = document.querySelector('.navbar-section');
    if(this.scrollY <= 10) {
        nav.className = 'navbar-section';
    }  else {
        nav.className = 'navbar-section scroll';
    } 
  };


const open_btn = document.querySelector('.open-btn')
const close_btn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')
const options = document.getElementsByClassName("nav-option");

open_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.add('visible'))
 
})

close_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.remove('visible'))
   
})

for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", () =>{
        nav.forEach(nav_el => nav_el.classList.remove('visible'))
    });
  }