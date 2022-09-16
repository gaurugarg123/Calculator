const screen = document.querySelector('.screen');
const btns = document.querySelectorAll('.btn[operater=false]');
const clear = document.querySelector('.btn-clear');
const equal = document.querySelector('.btn-equal');
const operater_btns = document.querySelectorAll('.btn[operater=true]');
let enter = false;

const num_regex = /\d/
const arithmetic_regex = /[+-/*]/
const brackets_regex = /[()]/
const char_regex = /[a-zA-Z]/

const dot_operator = (value) => {
    if (enter) {
        screen.value = '0' + value
        enter = true
    }
    else if (screen.value === "") {
        screen.value += '0' + value;
    }
    else if (num_regex.test(screen.value.slice(-1))) {
        screen.value += value
        try {
            inp.innerText = eval(screen.value)
        }
        catch (err) {
            console.log(err)
            }
    }
    else if (arithmetic_regex.test(screen.value.slice(-2))) {
        screen.value += '0' + value
    }

}

const operators = (value) => {
    if (value === '.') {
        dot_operator(value)
    }
    else {
        if (screen.value === "") {
            screen.value += '0 ' + value;
        }
        else if (screen.value !== "" && num_regex.test(screen.value.slice(-1))) {
            screen.value += ' ' + value + ' '
        }
        else if (screen.value !== "" && value === arithmetic_regex.test(screen.value.slice(-1))) {
            screen.value += '0' + value
        }
        if (enter) { enter = false }
    }
}

const clearr = () => {
    if (enter) {
        screen.value = "";
        if(screen.value !== "" && eval(screen.value !== undefined || screen.value !== null)){
            inp.innerText = eval(screen.value);
        }
        else {
            inp.innerText = ""
        }
    }
    else {
        if (num_regex.test(screen.value.slice(-1))) {
            screen.value = screen.value.slice(0, screen.value.length - 1);
            if(screen.value !== "" && eval(screen.value !== undefined || screen.value !== null)){
                inp.innerText = eval(screen.value);
            }
            else {
                inp.innerText = ""
            }
        }
        else if (screen.value.slice(-1) === ' ') {
            screen.value = screen.value.slice(0, screen.value.length - 3);
            if(screen.value !== "" && eval(screen.value !== undefined || screen.value !== null)){
                inp.innerText = eval(screen.value);
            }
            else {
                inp.innerText = ""
            }
        }
        else {
            screen.value = screen.value.slice(0, screen.value.length - 1);
            if(screen.value !== "" && eval(screen.value !== undefined || screen.value !== null)){
                inp.innerText = eval(screen.value);
            }
            else {
                inp.innerText = ""
            }
        }
    }
}

const sum = () => {
    if (screen.value !== "") {
        try {
            inp.innerText = screen.value + ' = ';
            let answer = eval(screen.value);
            screen.value = answer;
            enter = true
        }
        catch (ex) {
            console.log(ex)
        }
    }
}

const input_num = (value) => {
    if(arithmetic_regex.test(screen.value)){
        screen.value += value
        try {
            inp.innerText = eval(screen.value)
        }
        catch (err) {
            console.log(err)
        }
        if(enter){enter = false}
        return
    }
    if (enter || screen.value === '0') {
        screen.value = value
        enter = false
    }
    else {
        screen.value += value
        try {
            inp.innerText = eval(screen.value)
        }
        catch (err) {
            console.log(err)
        }
    }
}

btns.forEach((button) => {
    button.addEventListener('click', function (e) {
        let value = e.target.dataset.num;
        input_num(value)
    })
})

operater_btns.forEach(function (button) {
    button.addEventListener('click', function (e) {
        let value = e.target.dataset.num;
        if (value === '.') {
            dot_operator(value)
        }
        else {
            operators(value)
        }
    })
})


equal.addEventListener('click', function (e) {
    if (screen.value !== "") {
        try {
            let answer = eval(screen.value);
            inp.innerText = screen.value + " = " + answer ;
            screen.value = answer;
            enter = true

        }
        catch (ex) {
            console.log(ex)
        }
    }
})

clear.addEventListener('click', function (e) {
    screen.value = "";
    inp.innerText = "";
})

window.addEventListener('keydown', (e) => {
    console.log(e)
    if (e.key === 'Enter' || e.key === '=') {
        sum(e.key)
    }

    else if (e.key === 'Backspace' && e.ctrlKey && screen.value !== "") {
        screen.value = "";
        inp.innerText = "";
    }

    else if (e.key === 'Backspace') {
        clearr()
    }

    else if (num_regex.test(e.key) && !char_regex.test(e.key))  {
        input_num(e.key)
    }

    else if (arithmetic_regex.test(e.key)) {
        operators(e.key)

    }

    // NOT COMPLETE
    else if (brackets_regex.test(e.key)) {
        // if (enter) { enter = false }
        // if (e.key === '(' && screen.value !== "") {
        //     screen.value += ' * ' + e.key
        // }
        // else if (e.key === ')' && screen.value !== "") {
        //     screen.value += e.key
        // }
        // else {
        //     screen.value += e.key
        // }
    }
})