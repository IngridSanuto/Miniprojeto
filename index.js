// importação do modulo readline para interação com o terminal //
const readline = require('readline')

// array principal //
let estudantes = [];

// configuração da interface de leitura do terminal  //
const rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
});


// VALIDAÇÂO DE ENTRADA DE DADOS //
function validarNome(nome) {
     return nome && nome.trim().length >= 2;
}

function validarIdade(idade) {
    const idadeNum = Number(idade);
    return !isNaN(idadeNum) && idadeNum >= 10 && idadeNum <= 100;
}

function validarNotas(notas) {
    if (!Array.isArray(notas) || notas.length ===  0) return false;

    return notas.every(nota => {
        const notaNum = Number(nota);
        return !isNaN(notaNum) && notaNum >= 0 && notaNum <=10;
    });
}

// CADASTRO DE ESTUDANTES //

function cadastrarEstudantes(nome, idade, notas) {
    const notasNumeros = notas.map(nota => Number(nota)); // map converte cada notas para numero //
    const media = notasNumeros.reduce((soma, nota) => soma + nota, 0) / notasNumeros.length; // usei reduce para somar todas as notas //
    const estudante = {
        nome: nome.trim(),
        idade: Number(idade),
        notas: notasNumeros,
        media: Number(media.toFixed(2))
    };

    // ADICIONAR OS ESTUDANTES A ARRAY //
     estudantes.push(estudante);
     console.log (`Estudante "${nome}" Cadastrado com sucesso!`);
}

// LISTA DE ESTUDANTES CADASTRADOS //

function listarEstudantes() {
    console.log('lista de estudantes');
console.log('='.repeat(50))
    console.table(estudantes)
    iniciarSistema();
}

// BUSCAR ESTUDANTES POR NOME //
function buscarEstudante(termoBusca) {
    const termoLower = termoBusca.toLowerCase();  // torna a busca case-insensitive //
    const resultados = estudantes.filter(estudante => // filtra apenas os que contém nome buscado //
    estudante.nome.toLowerCase().includes(termoLower));
    
    console.log(`resultados da buscar por ${termoBusca}`);
    console.log('='.repeat(50));

    if (resultados.length === 0) {
        console.log(`Nenhum estudante encontrado. `);
        return;
    }
    resultados.forEach(estudante => {
        console.log(`${estudante.nome} - Média: ${estudante.media}`);
    });
}

//  CALCULOS ESTATISTICOS //

function calcularMediaGeral () {
    if (estudantes.length === 0) {
        console.log(`Nenhum estudante cadastrado`);
        return;
    }
    const total = estudantes.reduce((soma, estudantes) => soma + estudantes.media, 0);
    const media = total / estudantes.length;
    console.log(`Média Geral da turma: ${media.toFixed(2)}`);
    iniciarSistema()
}

function mostrarMelhorEstudante() {
    if (estudantes.length === 0) return;
    const melhor = estudantes.reduce((maior, atual) => atual.media > maior.media ? atual : maior);
    console.log(`Melhor Estudante: ${melhor.nome} - Média: ${melhor.media}`);
    iniciarSistema()
}

// RELATORIOS DE SITUAÇAO //

function gerarRelatorios() {
    const aprovados = estudantes.filter(e => e.media >= 7);
    const recuperacao = estudantes.filter(e => e.media >= 5 && e.media < 6.9);
    const reprovados = estudantes.filter(e => e.media < 5);

    console.log('APROVADOS:');
    aprovados.forEach(e => console.log(`  ${e.nome} - ${e.media}`));
    
    console.log('RECUPERAÇÂO:');
    recuperacao.forEach(e => console.log(`  ${e.nome} - ${e.media}`));
    
    console.log('REPROVADOS:');
    reprovados.forEach(e => console.log(`  ${e.nome} - ${e.media}`));
    iniciarSistema()
}

// MENU INTERATIVO //

function mostrarMenu() {
    console.log(`SISTEMA DE ESTUDANTES
         1. Cadastrar estudantes 
         2. Listar estudantes
         3. Buscar por nome
         4. Calcular média geral
         5. Melhor estudante
         6. Gerar relatórios
         7. Sair`);
}

function iniciarSistema() {
    mostrarMenu();
    rl.question('Escolha uma opção: ', (opcao) => {
        switch(opcao) {
            case '1': cadastrarViaMenu(); break;
            case '2': listarEstudantes(); break;
            case '3': buscarViaMenu(); break;
            case '4': calcularMediaGeral(); break;
            case '5': mostrarMelhorEstudante(); break;
            case '6': gerarRelatorios(); break;
            case '7': console.log('Volte Sempre!'); rl.close(); return;
            default: console.log('Opção inválida!'); 
            iniciarSistema()
        }
    })
}

// FUNÇÔES PARA O MENU //

function cadastrarViaMenu() {
    // Pergunta Nome //
    rl.question('Nome: ', (nome) => {
        if (!validarNome(nome)) {
            console.log('Nome Inválido!');
            return cadastrarViaMenu(); // volta a perguntar tudo de novo //
        }

        // Pergunta Idade //
        rl.question('Idade: ', (idade) => {
            if (!validarIdade(idade)) {
                console.log('Idade Inválida!');
                return cadastrarViaMenu(); // volta a perguntar tudo de novo
            }

            // Pergunta Notas
            rl.question('Notas (separadas por vírgula): ', (notasInput) => {
                const notas = notasInput.split(',').map(n => n.trim());
                if (!validarNotas(notas)) {
                    console.log('Notas Inválidas!');
                    return cadastrarViaMenu(); // volta a perguntar tudo de novo
                }

                // Cadastro final
                cadastrarEstudantes(nome, idade, notas);
                 iniciarSistema();
            });
        });
    });
}


function buscarViaMenu() {
    rl.question('Digite o nome:', (nome) => {
        buscarEstudante(nome);
        iniciarSistema();
    });
}

iniciarSistema();