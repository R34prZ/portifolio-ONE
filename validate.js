const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

const mensagensDeErro = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio!"
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio!',
        typeMismatch: 'O email digitado não é válido.',
        patternMismatch: "O email deve seguir o formato email@dominio.com!"
    },
    assunto: {
        valueMissing: "O campo de assunto não pode estar vazio!"
    },
    mensagem: {
        valueMissing: "O campo de mensagem não pode estar vazio!"
    }
}

const inputs = document.querySelectorAll("input");
const formBtn = document.querySelector(".formcontato__botao")

let tudoValido = []

inputs.forEach(input => {
    input.addEventListener("blur", (event) => {
        valida(event.target);
        input.validity.valid? tudoValido.push(true) : null;
        validaBotao(formBtn);
        console.log(tudoValido);
    })
}
);

function validaBotao(botao) {
    if (tudoValido.length === inputs.length) {
        if (tudoValido.every(validity => validity === true)) {
            tudoValido = [];
            botao.disabled = false;
            console.log("formulário válido")
        }
    }
    else {
        // tudoValido = [];
        botao.disabled = true;
        console.log("fomrulário inválido");
    }
}


function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if (input.validity.valid) {
        input.classList.remove('formcontato__input--invalido')
        input.parentElement.querySelector('.form__label__erro').innerHTML = ''
    } else {
        input.classList.add('formcontato__input--invalido')
        input.parentElement.querySelector('.form__label__erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem
}