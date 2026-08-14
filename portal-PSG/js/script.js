/* ================= MENU HAMBÚRGUER RESPONSIVO ================= */

document.addEventListener('DOMContentLoaded', () => {
    // Setup menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Se estiver na página de editais, renderiza o grid
    const gridCursos = document.getElementById('gridCursos');
    if (gridCursos) {
        renderizarCursos(cursosPSG);
        configurarFiltros();
    }
});

/* ================= BANCO DE DADOS DE EDITAIS ================= */
const cursosPSG = [
    {
        id: 1,
        edital: "Edital Nº 01/2026",
        titulo: "Técnico em Desenvolvimento de Sistemas",
        area: "tecnologia",
        tag: "Tecnologia",
        inscricoes: "Inscrições até 15/03/2026",
        cargaHoraria: "1200h",
        modalidade: "Presencial",
        unidade: "Unidade Centro",
        vagas: 40
    },
    {
        id: 2,
        edital: "Edital Nº 02/2026",
        titulo: "Assistente de Recursos Humanos",
        area: "gestao",
        tag: "Gestão",
        inscricoes: "Inscrições até 20/03/2026",
        cargaHoraria: "160h",
        modalidade: "Modalidade EAD",
        unidade: "Unidade Norte",
        vagas: 25
    },
    {
        id: 3,
        edital: "Edital Nº 03/2026",
        titulo: "Cozinheiro Profissional",
        area: "gastronomia",
        tag: "Gastronomia",
        inscricoes: "Inscrições até 25/03/2026",
        cargaHoraria: "500h",
        modalidade: "Presencial",
        unidade: "Unidade Gourmet",
        vagas: 30
    }
];

/* ================= INICIALIZAÇÃO DE PÁGINAS ================= */
document.addEventListener('DOMContentLoaded', () => {
    // Se estiver na página de editais, renderiza o grid
    const gridCursos = document.getElementById('gridCursos');
    if (gridCursos) {
        renderizarCursos(cursosPSG);
        configurarFiltros();
    }
});

/* ================= RENDERIZAÇÃO E FILTRO DE CURSOS ================= */
function renderizarCursos(lista) {
    const grid = document.getElementById('gridCursos');
    if (!grid) return;
    
    grid.innerHTML = '';

    if (lista.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 40px;">Nenhum edital encontrado para os filtros selecionados.</p>`;
        return;
    }

    lista.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-header">
                <span>${curso.edital}</span>
                <span class="course-tag">${curso.tag}</span>
            </div>
            <div class="course-body">
                <h3 class="course-title">${curso.titulo}</h3>
                <div class="course-info">
                    <span><i class="fas fa-calendar-alt"></i> ${curso.inscricoes}</span>
                    <span><i class="fas fa-clock"></i> Carga Horária: ${curso.cargaHoraria}</span>
                    <span><i class="fas fa-laptop"></i> ${curso.modalidade}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${curso.unidade}</span>
                </div>
            </div>
            <div class="course-footer">
                <span class="vagas-tag"><i class="fas fa-chair"></i> ${curso.vagas} Vagas</span>
                <a href="inscricao.html" class="btn-primary">Inscrever-se</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function configurarFiltros() {
    const searchInput = document.getElementById('searchEdital');
    const filterArea = document.getElementById('filterArea');

    const aplicarFiltros = () => {
        const termo = searchInput.value.toLowerCase();
        const area = filterArea.value;

        const filtrados = cursosPSG.filter(curso => {
            const bateTermo = curso.titulo.toLowerCase().includes(termo) || curso.edital.toLowerCase().includes(termo);
            const bateArea = area === '' || curso.area === area;
            return bateTermo && bateArea;
        });

        renderizarCursos(filtrados);
    };

    if (searchInput) searchInput.addEventListener('input', aplicarFiltros);
    if (filterArea) filterArea.addEventListener('change', aplicarFiltros);
}

/* ================= CÁLCULO DE TESTE DE CARREIRA ================= */
function calcularTesteCarreira() {
    const form = document.getElementById('formCarreira');
    if (!form) return;

    const formData = new FormData(form);
    let counts = { tec: 0, gestao: 0, gastronomia: 0 };
    
    for (let value of formData.values()) {
        if (counts[value] !== undefined) {
            counts[value]++;
        }
    }

    let maxArea = 'tec';
    let maxVal = counts.tec;
    if (counts.gestao > maxVal) { maxArea = 'gestao'; maxVal = counts.gestao; }
    if (counts.gastronomia > maxVal) { maxArea = 'gastronomia'; maxVal = counts.gastronomia; }

    const resBox = document.getElementById('resultadoTeste');
    const resText = document.getElementById('textoResultado');
    
    let areaNome = "";
    if (maxArea === 'tec') areaNome = "Tecnologia da Informação (ex: Técnico em Desenvolvimento de Sistemas)";
    else if (maxArea === 'gestao') areaNome = "Gestão e Negócios (ex: Assistente de Recursos Humanos)";
    else areaNome = "Gastronomia (ex: Cozinheiro Profissional)";

    resText.innerHTML = `Com base nas suas respostas, seu perfil é altamente compatível com a área de <strong>${areaNome}</strong>!`;
    resBox.style.display = 'block';
    resBox.scrollIntoView({ behavior: 'smooth' });
}

/* ================= CÁLCULO DE RENDA PER CAPITA ================= */
function calcularRenda() {
    const rendaInput = document.getElementById('rendaTotal');
    const pessoasInput = document.getElementById('numPessoas');
    const resDiv = document.getElementById('resultadoRenda');

    if (!rendaInput || !pessoasInput || !resDiv) return;

    const renda = parseFloat(rendaInput.value);
    const pessoas = parseInt(pessoasInput.value);

    if (!renda || !pessoas || pessoas <= 0) {
        resDiv.innerHTML = "<span style='color: var(--danger-color);'>Por favor, preencha a renda e o número de pessoas corretamente.</span>";
        return;
    }

    const perCapita = renda / pessoas;
    const limiteDoisSalarios = 3004.00; 

    if (perCapita <= (limiteDoisSalarios / 2)) {
        resDiv.innerHTML = `<span style='color: var(--success-color);'>Renda per capita: R$ ${perCapita.toFixed(2)}. Parabéns! Você atende ao critério de renda do PSG.</span>`;
    } else {
        resDiv.innerHTML = `<span style='color: var(--danger-color);'>Renda per capita: R$ ${perCapita.toFixed(2)}. Atenção: A renda excede o limite estipulado pelo edital.</span>`;
    }
}