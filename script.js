
// CAPTURANDO ELEMENTOS DO HTML

const campoSenha = document.getElementById("senha");
const botaoGerar = document.getElementById("gerar");
const botaoCopiar = document.getElementById("copiar");

const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valorTamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const nivel = document.getElementById("nivel");
const progresso = document.getElementById("progresso");
const mensagem = document.getElementById("mensagem");


// TIPOS DE CARACTERES

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const conjuntoNumeros = "0123456789";
const conjuntoSimbolos = "!@#$%&*?";


// FUNÇÃO PARA GERAR A SENHA

function gerarSenha() {

    let caracteres = "";
    let senha = "";
    let obrigatorios = [];

    const quantidade = Number(tamanho.value);

    // VERIFICANDO AS OPÇÕES SELECIONADAS

    if (maiusculas.checked) {
        caracteres += letrasMaiusculas;
        obrigatorios.push(letrasMaiusculas);
    }

    if (minusculas.checked) {
        caracteres += letrasMinusculas;
        obrigatorios.push(letrasMinusculas);
    }

    if (numeros.checked) {
        caracteres += conjuntoNumeros;
        obrigatorios.push(conjuntoNumeros);
    }

    if (simbolos.checked) {
        caracteres += conjuntoSimbolos;
        obrigatorios.push(conjuntoSimbolos);
    }

    // VALIDANDO AS OPÇÕES

    if (caracteres === "") {
        mensagem.textContent =
            "Selecione pelo menos um tipo de caractere!";
        campoSenha.value = "";
        atualizarForca("");
        return;
    }

    if (obrigatorios.length > quantidade) {
        mensagem.textContent =
            "Aumente o tamanho para incluir todos os tipos selecionados!";
        campoSenha.value = "";
        atualizarForca("");
        return;
    }

    // GARANTINDO UM CARACTERE DE CADA TIPO SELECIONADO

    for (let i = 0; i < obrigatorios.length; i++) {

        const grupo = obrigatorios[i];

        const indice = Math.floor(
            Math.random() * grupo.length
        );

        senha += grupo[indice];
    }

    // COMPLETANDO O RESTANTE DA SENHA

    for (let i = senha.length; i < quantidade; i++) {

        const indice = Math.floor(
            Math.random() * caracteres.length
        );

        senha += caracteres[indice];
    }

    // EMBARALHANDO OS CARACTERES

    let senhaArray = senha.split("");

    for (let i = senhaArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [senhaArray[i], senhaArray[j]] =
            [senhaArray[j], senhaArray[i]];
    }

    senha = senhaArray.join("");

    // ALTERANDO O HTML PELO DOM

    campoSenha.value = senha;

    mensagem.textContent = "Senha gerada com sucesso!";

    // ATUALIZANDO A FORÇA

    atualizarForca(senha);
}


// FUNÇÃO PARA VERIFICAR A FORÇA DA SENHA

function atualizarForca(senha) {

    let pontos = 0;

    if (senha.length === 0) {
        nivel.textContent = "Nenhuma";
        progresso.style.width = "0%";
        progresso.style.backgroundColor = "#39304f";
        return;
    }

    if (senha.length >= 8) pontos++;
    if (senha.length >= 12) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/[a-z]/.test(senha)) pontos++;
    if (/[0-9]/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;

    if (pontos <= 2) {

        nivel.textContent = "Fraca";
        progresso.style.width = "30%";
        progresso.style.backgroundColor = "#ef4444";

    } else if (pontos <= 4) {

        nivel.textContent = "Média";
        progresso.style.width = "65%";
        progresso.style.backgroundColor = "#f59e0b";

    } else {

        nivel.textContent = "Forte";
        progresso.style.width = "100%";
        progresso.style.backgroundColor = "#22c55e";
    }
}


// FUNÇÃO PARA COPIAR A SENHA

async function copiarSenha() {

    if (campoSenha.value === "") {
        mensagem.textContent = "Gere uma senha primeiro!";
        return;
    }

    try {

        await navigator.clipboard.writeText(campoSenha.value);

        mensagem.textContent = "Senha copiada com sucesso!";

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível copiar. Verifique as permissões do navegador.";
    }
}


// EVENTOS DE ESCUTA

botaoGerar.addEventListener("click", gerarSenha);

botaoCopiar.addEventListener("click", copiarSenha);


// ATUALIZANDO O TAMANHO EM TEMPO REAL

tamanho.addEventListener("input", function() {

    valorTamanho.textContent = tamanho.value;

});


// ATUALIZANDO A SENHA QUANDO AS OPÇÕES MUDAM

maiusculas.addEventListener("change", gerarSenha);
minusculas.addEventListener("change", gerarSenha);
numeros.addEventListener("change", gerarSenha);
simbolos.addEventListener("change", gerarSenha);


// GERANDO UMA SENHA INICIAL

gerarSenha();
