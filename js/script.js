const container = document.querySelector('.container');
const screen = document.querySelector('.screen');
const paragraph = document.querySelector('.ans');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const clearScreen = document.querySelector('.clear');
const equals = document.querySelector('.equals')
const comma = document.querySelector('.comma')
const backspace = document.querySelector('.backspace');

let values = ['', '', ''];

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    let ans = 0;
    console.log(operator);
    switch(operator) {
        case '+':
            ans = add(num1, num2);
            break;
        case '-':
            ans = subtract(num1, num2);
            break;
        case '*':
            ans = multiply(num1, num2);
            break;
        case '/':
            ans = divide(num1, num2);
            break;
    }   
    return ans;
}

function display(vals) {
    let disply = vals.join('');
    disply = disply.toString();
    if(disply.length > 17){
        disply = disply.slice(0, 16);
    }
    paragraph.textContent = disply;
    screen.appendChild(paragraph);
}

clearScreen.addEventListener('click', function(e){
    paragraph.innerHTML = ''
    values = ['', '', ''];
})
for(let number of numbers) {
    number.addEventListener('click', function(e){
    if(values[1] == '') {
        values[0] = values[0] + number.id;
        values[0] = parseFloat(values[0]);
    }
    else {
        values[2] = values[2] + number.id;
        values[2] = parseFloat(values[2]);
    }
    display(values);    
    console.log(number.id);
    })
}

for(let operator of operators) {
    operator.addEventListener('click', function(e){
    if(values[1] == '' && values[0] !== '') {
        values[1] = operator.id;
    }
    else if(values[2] !== ''){
        values[0] = operate(values[1], values[0], values[2]);
        values[1] = operator.id;
        values[2] = '';
        
    }
    display(values);    
    console.log(operator.id);
    })
}

equals.addEventListener('click', function(e){
    if(values[0] !== '' && values[1] !== '' && values[2] !== ''){
        if(values[1] == '/' && values[2] == '0'){
            alert('Are you seriously trying to divide by zero');
        }
        else {
            paragraph.textContent = operate(values[1], values[0], values[2]);
            screen.appendChild(paragraph);
            console.log(values);
            values = ['', '', ''];
        }
    }
    else {
        alert('enter all the values');
    }
})

comma.addEventListener('click', function(e) {
    if(values[1] == '' && !(String(values[0]).includes('.'))){   
        values[0] = String(values[0]) + '.';
        display(values);
    }
})

backspace.addEventListener('click', function(e) {
    if(String(values[2]).length > 0){
        values[2] = String(values[2]).slice(0, String(values[2]).length - 1) + '';
    }
    else if(String(values[1]).length > 0){
        values[1] = String(values[1]).slice(0, String(values[1]).length - 1) + '';
    }
    else if(String(values[0]).length > 0){
        values[0] = String(values[0]).slice(0, String(values[0]).length - 1) + '';
        
    }
    display(values);
})