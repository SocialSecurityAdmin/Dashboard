const questions = [
    {question : 'email', name : 'email', type : 'email', pattern : /^\S+@\S+\.\S+$/, placeholder : 'email address*', answer: ''},
    {question : 'password', name : 'password', type : "password", placeholder : 'password', answer : ''}
]



const shakeTime = 100
const switchTime = 200
let position = 0


const inputField = document.querySelector('#input-field')
const btn = document.querySelector('#btn')
const input = document.querySelector('#input')
const done = document.querySelector('#done')



document.addEventListener('DOMContentLoaded', getQuestion)

btn.addEventListener('click', validate)

inputField.addEventListener('keyup', e => {
    if(e.keyCode == 13){
        validate()
    }
})



function getQuestion(){
    inputField.placeholder = questions[position].placeholder
    inputField.type = questions[position].type
    inputField.value = questions[position].answer || ''
    inputField.focus()
}

function transform(x, y){
    input.style.transform = `translate(${x}px, ${y}px)`
}

function validate(){
    if(!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail()
    } else {
        inputPass()
    }
}

function inputFail(){
    input.className = 'error'
    for(let i = 0; i < 6; i++){
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

function inputPass(){
    input.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    questions[position].answer = inputField.value;

    position++

    if(questions[position]){
        getQuestion()
    } else {
        input.className = 'close'
        done.className = 'close'

        formComplete()
    }
}

function formComplete(){
    let postData = {}
    questions.forEach((question) => {
        const allowedFields = ['email', 'password'];
    
        if (allowedFields.includes(question.name)) {
            postData[question.name] = question.answer;
        }
    });
    console.log(postData, JSON.stringify(postData))
    postInfo(postData)
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Enrollment Succesful, you'll be prompt to complete your request by your employer`));
    setTimeout(() => {
        input.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);

}

const baseURL = '/formPost'

async function postInfo(postData){
    
    const res = await fetch(baseURL, {
        method : 'POST', 
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(postData)
    }).then((res) =>{
        console.log("response", res)
    }).catch((err) =>{
        console.log("err", err)
    })
}