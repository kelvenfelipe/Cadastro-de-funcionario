const formEmployee = document.getElementById('formEmployee')
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', (e) => {
        validate(e.target);
    });
});

function validate(input) {
    const inputType = input.dataset.type;

    if(input.validity.valid) {
        input.parentElement.classList.remove('modal__label__invalid');
        input.parentElement.querySelector('.message__error ').innerHTML = '';
    } else {
        input.parentElement.classList.add('modal__label__invalid');
        input.parentElement.querySelector('.message__error').innerHTML = showErrorMessage(inputType, input);
    };
};

const errorType = [
    'valueMissing'
];

const errorMessage = {
    typeName: {
        valueMissing : 'O campo nome não pode estar vazio'
    },
    typeFunction : {
        valueMissing : 'O campo profissão não pode estar vazio'
    },
    typeSalary : {
        valueMissing : 'O campo salário não pode estar vazio'
    }
};

function showErrorMessage(inputType, input) {
    let message = '';
    errorType.forEach(error => {
        if(input.validity[error]) {
            message = errorMessage[inputType][error]
        };
    });
    return message;
}

// Crud

