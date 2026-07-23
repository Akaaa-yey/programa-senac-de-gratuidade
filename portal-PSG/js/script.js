/* ================= BANCO DE DADOS SIMULADO ================= */
const cursosPSG = [
    {
        id: 1,
        titulo: "Técnico em Enfermagem",
        cidade: "Recife",
        categoria: "Saúde",
        unidade: "Senac Paulista / Recife",
        modalidade: "Presencial - Manhã",
        cargaHoraria: "1200h",
        vagas: 15,
        requisito: "Ensino Médio Completo"
    },
    {
        id: 2,
        titulo: "Desenvolvedor Web Full Stack",
        cidade: "Recife",
        categoria: "Tecnologia",
        unidade: "Porto Digital / Recife",
        modalidade: "Remoto (Ao Vivo) - Noite",
        cargaHoraria: "400h",
        vagas: 25,
        requisito: "Ensino Médio Cursando ou Completo"
    },
    {
        id: 3,
        titulo: "Cozinheiro Profissional",
        cidade: "Caruaru",
        categoria: "Gastronomia",
        unidade: "Senac Caruaru",
        modalidade: "Presencial - Tarde",
        cargaHoraria: "800h",
        vagas: 10,
        requisito: "Ensino Fundamental Completo"
    },
    {
        id: 4,
        titulo: "Cabeleireiro e Estética",
        cidade: "Petrolina",
        categoria: "Beleza",
        unidade: "Senac Petrolina",
        modalidade: "Presencial - Tarde",
        cargaHoraria: "400h",
        vagas: 12,
        requisito: "Ensino Fundamental Completo"
    },
    {
        id: 5,
        titulo: "Assistente Administrativo",
        cidade: "Garanhuns",
        categoria: "Gestão",
        unidade: "Senac Garanhuns",
        modalidade: "Presencial - Noite",
        cargaHoraria: "160h",
        vagas: 30,
        requisito: "Ensino Médio Incompleto"
    },
    {
        id: 6,
        titulo: "Análise de Dados com Python",
        cidade: "Recife",
        categoria: "Tecnologia",
        unidade: "Senac Recife - Central",
        modalidade: "EAD / Online",
        cargaHoraria: "200h",
        vagas: 40,
        requisito: "Ensino Médio Completo"
    },
    {
        id: 7,
        titulo: "Confeiteiro Avançado",
        cidade: "Paulista",
        categoria: "Gastronomia",
        unidade: "Senac Paulista",
        modalidade: "Presencial - Manhã",
        cargaHoraria: "300h",
        vagas: 8,
        requisito: "Maior de 18 anos"
    }
];

/* ================= ESTADO DO SISTEMA ================= */
let usuarioLogado = null;
let inscricoesUsuario = [];
let cursoSelecionadoParaInscricao = null;

/* ================= INICIALIZAÇÃO ================= */
document.addEventListener('DOMContentLoaded', () => {
    renderizarCursos(cursosPSG);
    atualizarNavbar();
});

/* ================= NAVEGAÇÃO ENTRE SEÇÕES ================= */
function mostrarSecao(secaoId) {
    document.querySelectorAll('.section-view').forEach(sec => sec.classList.remove('active'));
    
    const secaoAlvo = document.getElementById(`sec-${secaoId}`);
    if (secaoAlvo) {
        secaoAlvo.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ================= RENDERIZAÇÃO DE CURSOS ================= */
function renderizarCursos(listaCursos) {
    const grid = document.getElementById('grid-cursos');
    grid.innerHTML = '';

    if (listaCursos.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">
            Nenhum curso encontrado para os filtros selecionados.
        </p>`;
        return;
    }

    listaCursos.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-header">
                <span><i class="fa-solid fa-location-dot"></i> ${curso.cidade}</span>
                <span class="course-tag">${curso.categoria}</span>
            </div>
            <div class="course-body">
                <h3 class="course-title">${curso.titulo}</h3>
                <div class="course-info">
                    <span><i class="fa-solid fa-building"></i> ${curso.unidade}</span>
                    <span><i class="fa-solid fa-clock"></i> ${curso.modalidade} (${curso.cargaHoraria})</span>
                    <span><i class="fa-solid fa-check-double"></i> Requisito: ${curso.requisito}</span>
                </div>
            </div>
            <div class="course-footer">
                <span class="vagas-tag"><i class="fa-solid fa-user-check"></i> ${curso.vagas} vagas</span>
                <button class="btn-primary" onclick="iniciarInscricao(${curso.id})">Inscrever-se</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ================= FILTRAGEM ================= */
function filtrarCursos() {
    const termoBusca = document.getElementById('inputBusca').value.toLowerCase();
    const cidade = document.getElementById('filtroCidade').value;
    const categoria = document.getElementById('filtroCategoria').value;

    const filtrados = cursosPSG.filter(curso => {
        const bateBusca = curso.titulo.toLowerCase().includes(termoBusca);
        const bateCidade = cidade === 'todos' || curso.cidade === cidade;
        const bateCategoria = categoria === 'todos' || curso.categoria === categoria;

        return bateBusca && bateCidade && bateCategoria;
    });

    renderizarCursos(filtrados);
}

/* ================= CONTROLE DE MODAIS ================= */
function abrirModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function fecharModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function trocarModal(fecharId, abrirId) {
    fecharModal(fecharId);
    abrirModal(abrirId);
}

/* ================= AUTENTICAÇÃO E CADASTRO ================= */
function realizarCadastro(event) {
    event.preventDefault();
    
    const nome = document.getElementById('cad-nome').value;
    const cpf = document.getElementById('cad-cpf').value;
    const email = document.getElementById('cad-email').value;
    const renda = parseFloat(document.getElementById('cad-renda').value);

    // Validação de Renda PSG (Até 2 salários mínimos = R$ 2.824,00 em 2026)
    if (renda > 2824) {
        alert("Atenção: A renda per capita informada ultrapassa o limite de 2 salários mínimos exigido pelo edital de gratuidade do PSG.");
        return;
    }

    usuarioLogado = { nome, cpf, email, renda };
    fecharModal('modalCadastro');
    atualizarNavbar();
    alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}.`);
}

function realizarLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    
    // Simulação de login bem-sucedido
    usuarioLogado = {
        nome: email.split('@')[0].toUpperCase(),
        email: email,
        cpf: "000.000.000-00",
        renda: 1412
    };

    fecharModal('modalLogin');
    atualizarNavbar();
    alert("Login realizado com sucesso!");
}

function fazerLogout() {
    usuarioLogado = null;
    inscricoesUsuario = [];
    atualizarNavbar();
    mostrarSecao('inicio');
}

function atualizarNavbar() {
    const authSection = document.getElementById('auth-section');
    const linkMeusCursos = document.getElementById('link-meus-cursos');

    if (usuarioLogado) {
        authSection.innerHTML = `
            <span style="font-size: 0.9rem; font-weight: 600;"><i class="fa-solid fa-user"></i> ${usuarioLogado.nome}</span>
            <button class="btn-secondary" onclick="fazerLogout()" style="padding: 5px 12px;">Sair</button>
        `;
        linkMeusCursos.classList.remove('hidden');
        document.getElementById('dash-user-info').innerText = `Candidato(a): ${usuarioLogado.nome} | E-mail: ${usuarioLogado.email}`;
    } else {
        authSection.innerHTML = `
            <button class="btn-secondary" onclick="abrirModal('modalLogin')">Entrar</button>
            <button class="btn-primary" onclick="abrirModal('modalCadastro')">Cadastre-se</button>
        `;
        linkMeusCursos.classList.add('hidden');
    }
}

/* ================= FLUXO DE INSCRIÇÃO ================= */
function iniciarInscricao(cursoId) {
    if (!usuarioLogado) {
        alert("Para se inscrever, você precisa entrar na sua conta ou criar um cadastro gratuito.");
        abrirModal('modalLogin');
        return;
    }

    const curso = cursosPSG.find(c => c.id === cursoId);
    
    // Verificar se já está inscrito
    const jaInscrito = inscricoesUsuario.some(c => c.id === cursoId);
    if (jaInscrito) {
        alert("Você já realizou a inscrição para este curso. Acompanhe no painel 'Meus Cursos'.");
        return;
    }

    cursoSelecionadoParaInscricao = curso;

    // Preencher modal de confirmação
    document.getElementById('conf-curso-titulo').innerText = curso.titulo;
    document.getElementById('conf-unidade').innerText = curso.unidade;
    document.getElementById('conf-modalidade').innerText = `${curso.modalidade} (${curso.cargaHoraria})`;
    document.getElementById('conf-nome').innerText = usuarioLogado.nome;

    abrirModal('modalInscricao');
}

function confirmarMatricula() {
    if (cursoSelecionadoParaInscricao) {
        // Reduzir vaga no mock
        cursoSelecionadoParaInscricao.vagas -= 1;
        
        // Adicionar à lista de inscrições do usuário
        inscricoesUsuario.push(cursoSelecionadoParaInscricao);
        
        fecharModal('modalInscricao');
        renderizarCursos(cursosPSG); // Atualiza vagas na tela
        renderizarMeusCursos();
        
        alert("Inscrição realizada com sucesso! Fique atento ao seu e-mail para a convocação da matrícula presencial.");
        mostrarSecao('meus-cursos');
    }
}

function renderizarMeusCursos() {
    const lista = document.getElementById('lista-meus-cursos');
    lista.innerHTML = '';

    if (inscricoesUsuario.length === 0) {
        lista.innerHTML = `<p style="text-align: center; color: var(--text-light); padding: 30px;">
            Você ainda não se inscreveu em nenhum curso do PSG.
        </p>`;
        return;
    }

    inscricoesUsuario.forEach(curso => {
        const item = document.createElement('div');
        item.className = 'enrolled-card';
        item.innerHTML = `
            <div>
                <h3 style="color: var(--senac-blue); margin-bottom: 5px;">${curso.titulo}</h3>
                <p style="font-size: 0.9rem; color: var(--text-light);">
                    <i class="fa-solid fa-building"></i> ${curso.unidade} &nbsp;|&nbsp; 
                    <i class="fa-solid fa-clock"></i> ${curso.modalidade}
                </p>
            </div>
            <div>
                <span class="status-badge"><i class="fa-solid fa-check"></i> Inscrição Confirmada</span>
            </div>
        `;
        lista.appendChild(item);
    });
}