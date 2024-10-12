const url = "https://script.google.com/macros/s/AKfycbwfaUveRz6Vu5RR6WLPP5mfIIjpBbmP0-Sy7YT3CSFcif16JaaPMciTD0Te568Lz1hu/exec";

const myForm = document.querySelector('#myForm');
const myName = document.querySelector('#name');
const myEmail = document.querySelector('#email');
const myMessage = document.querySelector('#message');
const subBtn = document.querySelector('input[type="submit"]');
const main = document.querySelector('.myForm');
// myName.value = 'testimony adeoye';
// myEmail.value = 'adeoyetestimony2+100@gmail.com';
// myMessage.value = 'hello';
myForm.addEventListener('submit', submitter);

function submitter (e){
    console.log('submitted');
    e.preventDefault();
    subBtn.disabled = true;
    let message = '';   
    if (myName.value.length < 5) {
        myName.style.borderColor ='red';
        message += `<br>Name needs to be 5 character`;
    }
    if (myEmail.value.length < 5) {
        myEmail.style.borderColor ='red';
        message += `<br>Email is missing`; 
    }
    if (message) {
        const div = document.createElement('div');
        div.innerHTML = message;
        div.style.color = 'red';
        myForm.append(div);
        setTimeout(()=>{
            div.remove();
            myName.style.borderColor ='';
            myEmail.style.borderColor ='';
        },5000)
        subBtn.disabled = false;
    }else{
        const myObj = {
            name: myName.value,
            email:myEmail.value,
            message:myMessage.value
        };
        myForm.style.display = 'none';
        addSendMail(myObj);
    }
}

function  addSendMail(data){
    console.log(data);
    const repDiv = document.createElement('div');
    repDiv.textContent = 'Waiting.....';
    main.append(repDiv);
     fetch(url,{
         method:'POST',
         body:JSON.stringify(data)
     })
     .then(res => res.json())
     .then(json =>{
         console.log(json);
         if(json.rowval){
            repDiv.textContent = `Message Sent Your ID is ${json.rowval}`;
         }else{
            repDiv.remove();
            subBtn.disabled = false;
            myForm.style.display = 'block';
         }
       
     })
 }
 
function  addSendMailGET(data){
   const url1 =url + '?id=100';
    fetch(url1)
    .then(res => res.json())
    .then(json =>{
        console.log(json);
    })
}

// function  addSendMailGET(data){
//     const url1 = url + '?id=100'
//     fetch (url1)
//     .then(res => res.json())
//     .then(json =>{
//         console.log(json);
//     })
// }