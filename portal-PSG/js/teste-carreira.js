// 1. Array de dados com todas as 10 perguntas
const perguntas = [
    {
        numero: "QUESTÃO 1",
        pergunta: "Em um projeto em grupo, qual papel você naturally assume?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "O porta-voz, responsável por apresentar as ideias do grupo", valor: "design" },
            { texto: "O líder, que organiza as tarefas e garante que todos cumpram os prazos", valor: "corporativo" },
            { texto: "O especialista, que pesquisa a fundo e traz os dados para o projeto", valor: "tech" },
            { texto: "O mediador, que ajuda a resolver conflitos e mantém o time unido", valor: "social" },
            { texto: "O criativo, que pensa em soluções diferentes e fora da caixa", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 2",
        pergunta: "Qual destes ambientes de trabalho te parece mais atraente?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "Uma agência de publicidade ou um estúdio de design", valor: "design" },
            { texto: "A sede de uma grande empresa ou um escritório de advocacia", valor: "corporativo" },
            { texto: "Um hospital, uma escola ou uma ONG", valor: "social" },
            { texto: "Um laboratório de tecnologia ou uma empresa de software", valor: "tech" },
            { texto: "Um canteiro de obras, uma fábrica ou uma startup de produto", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 3",
        pergunta: "No seu tempo livre, o que você mais gosta de fazer?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "Ler, escrever, assistir a filmes ou ir a exposições de arte", valor: "design" },
            { texto: "Organizar suas finanças, planejar uma viagem ou ler sobre negócios", valor: "corporativo" },
            { texto: "Conversar com amigos, fazer trabalho voluntário ou cuidar de plantas/animais", valor: "social" },
            { texto: "Resolver problemas teóricos, pesquisar e analisar dados", valor: "tech" },
            { texto: "Criar, inovar e usar a imaginação em ambientes livres", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 4",
        pergunta: "Que tipo de conteúdo você mais consome na internet?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "Canais de entretenimento, cultura pop, literatura e artes", valor: "design" },
            { texto: "Notícias sobre economia, política, mercado financeiro e gestão", valor: "corporativo" },
            { texto: "Conteúdo sobre psicologia, bem-estar, saúde e desenvolvimento humano", valor: "social" },
            { texto: "Tutoriais de tecnologia, reviews de gadgets e canais de ciência", valor: "tech" },
            { texto: "Vídeos de faça você mesmo (DIY), arquitetura e inovação", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 5",
        pergunta: "Se você tivesse um superpoder, qual seria?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "O poder de se comunicar em qualquer idioma", valor: "design" },
            { texto: "O poder de influenciar e persuadir pessoas.", valor: "corporativo" },
            { texto: "O poder de curar ou de entender os sentimentos dos outros", valor: "social" },
            { texto: "O poder de entender e controlar qualquer tecnologia", valor: "tech" },
            { texto: "O poder de construir qualquer coisa com a mente", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 6",
        pergunta: "Qual problema mundial você gostaria de resolver primeiro?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "A falta de acesso à cultura e à informação de qualidade", valor: "design" },
            { texto: "A corrupção e a má gestão dos recursos públicos", valor: "corporativo" },
            { texto: "A desigualdade social e a falta de acesso à saúde e educação", valor: "social" },
            { texto: "A lentidão do avanço tecnológico em áreas essenciais", valor: "tech" },
            { texto: "A falta de infraestrutura e moradia de qualidade para todos", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 7",
        pergunta: "Como você prefere aprender algo novo?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "Lendo, ouvindo podcasts ou participando de debates", valor: "design" },
            { texto: "Através de estudos de caso, analisando exemplos de sucesso", valor: "corporativo" },
            { texto: "Em grupo, trocando experiências e ajudando os outros", valor: "social" },
            { texto: "Sozinho, pesquisando a fundo e seguindo um método lógico", valor: "tech" },
            { texto: "Colocando a mão na massa, testando e experimentando", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 8",
        pergunta: "O que mais te frustra no dia a dia?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "Pessoas que não sabem se expressar ou se comunicar direito", valor: "design" },
            { texto: "Desorganização, falta de planejamento e desperdício de tempo", valor: "corporativo" },
            { texto: "Egoísmo, falta de empatia e injustiça social", valor: "social" },
            { texto: "Sistemas lentos, tecnologia que não funciona e informações incorretas", valor: "tech" },
            { texto: "Projetos mal executados, falta de soluções práticas e coisas que poderiam ser melhor construídas.", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 9",
        pergunta: "Qual das seguintes frases mais combina com você?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "Uma imagem vale mais que mil palavras", valor: "design" },
            { texto: "Tempo é dinheiro", valor: "corporativo" },
            { texto: "Ajudar o próximo é a minha maior motivação", valor: "social" },
            { texto: "Existe uma solução lógica para todo problema", valor: "tech" },
            { texto: "Se dá para imaginar, dá para criar.", valor: "operacional" }
        ]
    },
    {
        numero: "QUESTÃO 10",
        pergunta: "Ao escolher um filme, qual gênero te atrai mais?",
        imagem: "/portal-PSG/img/pessoas-trabalhando.png",
        opcoes: [
            { texto: "Drama ou documentário", valor: "design" },
            { texto: "Suspense ou filmes sobre o mercado financeiro", valor: "corporativo" },
            { texto: "Histórias de superação ou com forte mensagem social", valor: "social" },
            { texto: "Ficção científica ou filmes com reviravoltas inteligentes", valor: "tech" },
            { texto: "Ação, aventura ou filmes sobre grandes construções.", valor: "operacional" }
        ]
    }
];

// Dados das áreas sugeridas para a tela final
const detalhesAreas = {
    social: {
        titulo: "Saúde",
        descricao: "A área da saúde é o conjunto de conhecimentos e práticas voltados à prevenção, promoção e recuperação da saúde, visando o bem-estar físico, mental e social das pessoas."
    },
    design: {
        titulo: "Beleza e Design",
        descricao: "A área da beleza e comunicação é voltada ao cuidado estético, à expressão criativa e ao bem-estar, promovendo autoestima e qualidade de vida."
    },
    corporativo: {
        titulo: "Gestão e Negócio",
        descricao: "A área de gestão e negócios envolve a organização, o planejamento e a tomada de decisões para o sucesso de empresas e empreendimentos."
    },
    tech: {
        titulo: "Tecnologia da Informação",
        descricao: "A área de TI envolve desenvolvimento de software, análise de dados e infraestrutura tecnológica para solucionar problemas complexos."
    },
    operacional: {
        titulo: "Indústria e Operações",
        descricao: "Focada na criação prática, infraestrutura e inovação em processos produtivos e construções."
    }
};

// 2. Variáveis de controle de estado
let indiceAtual = 0;
let respostasUsuario = {};

// 3. Elementos do DOM
const elNumero = document.getElementById('questionNumber');
const elPergunta = document.getElementById('questionText');
const elImagem = document.getElementById('questionImage');
const elRespostas = document.getElementById('answersContainer');
const elProgressBar = document.getElementById('progressBar');
const elProgressBarContainer = document.getElementById('progressBarContainer');
const elQuestionArea = document.getElementById('questionArea');
const elResultArea = document.getElementById('resultArea');
const elResultsList = document.getElementById('resultsList');

const btnProximo = document.getElementById('nextButton');
const btnAnterior = document.getElementById('prevButton');
const btnRecomecar = document.getElementById('restartButton');

// 4. Função para carregar a questão na tela
function carregarQuestao() {
    const q = perguntas[indiceAtual];

    // Atualiza textos e imagens
    elNumero.textContent = q.numero;
    elPergunta.textContent = q.pergunta;
    elImagem.src = q.imagem;

    // Atualiza Barra de Progresso
    const porcentagem = ((indiceAtual + 1) / perguntas.length) * 100;
    elProgressBar.style.width = `${porcentagem}%`;

    // Exibe ou esconde o botão "Anterior"
    if (indiceAtual > 0) {
        btnAnterior.style.display = 'flex';
    } else {
        btnAnterior.style.display = 'none';
    }

    // Limpa alternativas anteriores e insere as novas
    elRespostas.innerHTML = '';
    q.opcoes.forEach((opcao) => {
        const label = document.createElement('label');
        label.className = 'answer';
        label.innerHTML = `
            <input type="radio" name="answer" value="${opcao.valor}" ${respostasUsuario[indiceAtual] === opcao.valor ? 'checked' : ''}>
            <span>${opcao.texto}</span>
        `;
        elRespostas.appendChild(label);
    });
}

// 5. Clique no botão Próximo
btnProximo.addEventListener('click', () => {
    const opcaoSelecionada = document.querySelector('input[name="answer"]:checked');
    
    if (!opcaoSelecionada) {
        alert("Por favor, selecione uma resposta!");
        return;
    }

    // Salva a resposta do usuário
    respostasUsuario[indiceAtual] = opcaoSelecionada.value;

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        carregarQuestao();
    } else {
        exibirResultados();
    }
});

// 6. Clique no botão Anterior
btnAnterior.addEventListener('click', () => {
    if (indiceAtual > 0) {
        indiceAtual--;
        carregarQuestao();
    }
});

// 7. Função para calcular e exibir os resultados na tela final
function exibirResultados() {
    // Esconde o quiz e a barra de progresso
    elQuestionArea.style.display = 'none';
    elProgressBarContainer.style.display = 'none';

    // Mostra a tela final
    elResultArea.style.display = 'block';

    // Mapeia e conta a pontuação por perfil
    const pontuacao = {};
    Object.values(respostasUsuario).forEach(valor => {
        pontuacao[valor] = (pontuacao[valor] || 0) + 1;
    });

    // Ordena os perfis mais votados
    const perfisOrdenados = Object.keys(pontuacao).sort((a, b) => pontuacao[b] - pontuacao[a]);

    // Garante que pelo menos 3 áreas apareçam (mesmo se o usuário não votou em todas)
    const todasAreas = ['social', 'design', 'corporativo', 'tech', 'operacional'];
    const top3 = [...new Set([...perfisOrdenados, ...todasAreas])].slice(0, 3);

    // Renderiza os cards das 3 áreas
    elResultsList.innerHTML = '';
    top3.forEach(chave => {
        const area = detalhesAreas[chave];
        const cardHtml = `
        <div class="result-card">
        <h3>${area.titulo}</h3>
        <p>${area.descricao}</p>
        <a href="/portal-PSG/html/index.html">
            <button class="search-course-btn">Pesquisar cursos da área</button>
        </a>
    </div>
`;
        elResultsList.innerHTML += cardHtml;
    });
}

// 8. Clique no botão Recomeçar
btnRecomecar.addEventListener('click', () => {
    indiceAtual = 0;
    respostasUsuario = {};
    elResultArea.style.display = 'none';
    elQuestionArea.style.display = 'grid';
    elProgressBarContainer.style.display = 'block';
    carregarQuestao();
});

// Inicializa a primeira questão
carregarQuestao();