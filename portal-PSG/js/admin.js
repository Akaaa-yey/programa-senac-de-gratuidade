/* ===== ADMIN AREA FUNCTIONALITY ===== */

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    if (!protectPage('admin')) {
        return;
    }

    const user = AUTH.getUser();
    
    // Update admin name
    const adminNameEl = document.getElementById('admin-name');
    if (adminNameEl) {
        adminNameEl.textContent = user.name;
    }

    // Setup page-specific functionality
    setupDashboard();
    setupEditaisPage();
    setupTriagemPage();
    setupModalHandlers();
    setupSidebar();
});

/* ===== DASHBOARD ===== */

function setupDashboard() {
    if (!document.getElementById('editais-ativos')) return;

    // Mock data - replace with API calls
    const stats = {
        editaisAtivos: 3,
        totalCandidaturas: 287,
        aprovadas: 156,
        pendentes: 89,
        recusadas: 42
    };

    document.getElementById('editais-ativos').textContent = stats.editaisAtivos;
    document.getElementById('total-candidaturas').textContent = stats.totalCandidaturas;
    document.getElementById('aprovadas').textContent = stats.aprovadas;
    document.getElementById('pendentes').textContent = stats.pendentes;

    // Mock activity
    loadRecentActivity();

    // Setup charts (placeholder for Chart.js)
    setupCharts();
}

function loadRecentActivity() {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;

    const activities = [
        {
            type: 'candidato_registrado',
            message: 'João da Silva registrou-se',
            time: '2 minutos atrás',
            icon: 'fas fa-user-plus'
        },
        {
            type: 'edital_lancado',
            message: 'Edital PSG 2025.2 foi lançado',
            time: '1 hora atrás',
            icon: 'fas fa-file-alt'
        },
        {
            type: 'candidatura_aprovada',
            message: 'Candidatura de Maria Silva foi aprovada',
            time: '3 horas atrás',
            icon: 'fas fa-check-circle'
        },
        {
            type: 'documento_enviado',
            message: 'Pedro Costa enviou documentos',
            time: '5 horas atrás',
            icon: 'fas fa-cloud-upload-alt'
        }
    ];

    activityList.innerHTML = '';

    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p><strong>${activity.message}</strong></p>
                <small>${activity.time}</small>
            </div>
        `;
        activityList.appendChild(item);
    });
}

function setupCharts() {
    // Placeholder for Chart.js integration
    // In production, use Chart.js library:
    // const ctx = document.getElementById('chart-editais').getContext('2d');
    // new Chart(ctx, { ... });
    
    console.log('Charts placeholder - integrate Chart.js for visualization');
}

/* ===== EDITAIS PAGE ===== */

function setupEditaisPage() {
    if (!document.getElementById('editais-list')) return;

    loadEditaisList();

    // Setup novo edital form
    const form = document.getElementById('novo-edital-form');
    if (form) {
        form.addEventListener('submit', handleNovoEdital);
    }

    // Setup modal close
    setupModalHandlers();
}

function loadEditaisList() {
    const listDiv = document.getElementById('editais-list');
    if (!listDiv) return;

    // Mock editais - replace with API call
    const editais = [
        {
            id: 1,
            numero: 'PSG 2025.1',
            titulo: 'Programa de Gratuidade 2025.1',
            status: 'ativo',
            candidaturas: 156,
            aprovadas: 89,
            dataAbertura: '2025-08-01',
            dataEncerramento: '2025-09-30'
        },
        {
            id: 2,
            numero: 'PSG 2025.2',
            titulo: 'Programa de Gratuidade 2025.2',
            status: 'ativo',
            candidaturas: 89,
            aprovadas: 45,
            dataAbertura: '2025-08-15',
            dataEncerramento: '2025-10-31'
        },
        {
            id: 3,
            numero: 'PSG 2024.2',
            titulo: 'Programa de Gratuidade 2024.2',
            status: 'encerrado',
            candidaturas: 200,
            aprovadas: 150,
            dataAbertura: '2024-08-01',
            dataEncerramento: '2024-09-30'
        }
    ];

    listDiv.innerHTML = '';

    editais.forEach(edital => {
        const statusClass = edital.status === 'ativo' ? 'status-approved' : 'status-rejected';
        const statusLabel = edital.status === 'ativo' ? 'Ativo' : 'Encerrado';

        const item = document.createElement('div');
        item.className = 'edital-item';
        item.innerHTML = `
            <div class="edital-item-info">
                <h3>${edital.numero} - ${edital.titulo}</h3>
                <p><strong>Status:</strong> <span class="${statusClass}">${statusLabel}</span></p>
                <p><strong>Candidaturas:</strong> ${edital.candidaturas} | <strong>Aprovadas:</strong> ${edital.aprovadas}</p>
                <p><strong>Período:</strong> ${new Date(edital.dataAbertura).toLocaleDateString('pt-BR')} até ${new Date(edital.dataEncerramento).toLocaleDateString('pt-BR')}</p>
            </div>
            <div class="edital-item-actions">
                <button class="btn btn-secondary btn-sm" onclick="editarEdital(${edital.id})">Editar</button>
                <button class="btn btn-outline btn-sm" onclick="verTriagem(${edital.id})">Triagem</button>
            </div>
        `;
        listDiv.appendChild(item);
    });
}

function openNovoEditalModal() {
    const modal = document.getElementById('novo-edital-modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function handleNovoEdital(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Mock submission - replace with API call
    console.log('Novo edital:', data);
    showSuccess('Edital lançado com sucesso!');
    event.target.reset();
    closeModal('novo-edital-modal');
    
    // Reload editais list
    setTimeout(() => {
        loadEditaisList();
    }, 1000);
}

function editarEdital(editalId) {
    console.log('Editar edital:', editalId);
    showSuccess('Funcionalidade de edição será implementada em breve');
}

function verTriagem(editalId) {
    window.location.href = `triagem.html?edital=${editalId}`;
}

/* ===== TRIAGEM PAGE ===== */

function setupTriagemPage() {
    if (!document.getElementById('triagem-list')) return;

    // Get edital ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const editalId = urlParams.get('edital');

    if (editalId) {
        const filterSelect = document.getElementById('filter-edital');
        if (filterSelect) {
            filterSelect.value = editalId;
        }
    }

    loadCandidaturasParaTriagem();

    // Setup filter handlers
    const filters = ['filter-edital', 'filter-status', 'filter-documento'];
    filters.forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) {
            element.addEventListener('change', loadCandidaturasParaTriagem);
        }
    });

    // Setup review form
    const saveBtn = document.getElementById('save-triagem');
    if (saveBtn) {
        saveBtn.addEventListener('click', handleSaveTriagem);
    }

    const nextBtn = document.getElementById('next-candidato');
    if (nextBtn) {
        nextBtn.addEventListener('click', loadProximoCandidato);
    }
}

function loadCandidaturasParaTriagem() {
    const listDiv = document.getElementById('triagem-list');
    if (!listDiv) return;

    // Mock data - replace with API call
    const candidaturas = [
        {
            id: 1,
            nome: 'João da Silva',
            email: 'joao.silva@email.com',
            edital: 'PSG 2025.1',
            curso: 'Análise de Dados',
            status: 'pendente',
            dataInscracao: '2025-08-10'
        },
        {
            id: 2,
            nome: 'Maria Santos',
            email: 'maria.santos@email.com',
            edital: 'PSG 2025.1',
            curso: 'Desenvolvimento Web',
            status: 'pendente',
            dataInscracao: '2025-08-12'
        },
        {
            id: 3,
            nome: 'Pedro Oliveira',
            email: 'pedro.oliveira@email.com',
            edital: 'PSG 2025.2',
            curso: 'Gestão de Projetos',
            status: 'em_analise',
            dataInscracao: '2025-08-14'
        }
    ];

    listDiv.innerHTML = '';

    candidaturas.forEach(cand => {
        const item = document.createElement('div');
        item.className = 'triagem-item';
        item.onclick = () => openReviewModal(cand);
        item.innerHTML = `
            <div class="triagem-candidate">
                <div class="candidate-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="candidate-info">
                    <h4>${cand.nome}</h4>
                    <p>${cand.email}</p>
                    <p><strong>${cand.curso}</strong> - ${cand.edital}</p>
                </div>
            </div>
            <div class="application-status status-${cand.status}">
                ${cand.status.replace('_', ' ').toUpperCase()}
            </div>
        `;
        listDiv.appendChild(item);
    });
}

function openReviewModal(candidatura) {
    const modal = document.getElementById('review-modal');
    
    // Fill candidato info
    document.getElementById('review-candidato-nome').textContent = candidatura.nome;
    document.getElementById('review-candidato-email').textContent = candidatura.email;
    document.getElementById('review-candidato-edital').textContent = candidatura.edital;
    document.getElementById('review-candidato-curso').textContent = candidatura.curso;

    // Mock document preview URLs
    document.getElementById('doc-rg-preview').src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23f0f0f0" width="200" height="300"/%3E%3Ctext x="50" y="150" font-size="16" fill="%23999"%3ERG Document%3C/text%3E%3C/svg%3E';

    if (modal) {
        modal.classList.add('show');
    }
}

function handleSaveTriagem() {
    const status = document.getElementById('final-status').value;
    const observacoes = document.getElementById('observacoes').value;

    if (!status) {
        showError('Por favor, selecione um status final');
        return;
    }

    // Mock API call
    console.log('Triagem salva:', { status, observacoes });
    showSuccess('Decisão de triagem salva com sucesso!');
    closeModal('review-modal');
    loadCandidaturasParaTriagem();
}

function loadProximoCandidato() {
    // Load next candidato in the list
    loadCandidaturasParaTriagem();
}

function resetFilters() {
    document.getElementById('filter-edital').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-documento').value = '';
    loadCandidaturasParaTriagem();
}

/* ===== MODAL HANDLERS ===== */

function setupModalHandlers() {
    // Close modal on X click
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

/* ===== SIDEBAR HANDLERS ===== */

function setupSidebar() {
    // Update active menu item
    const currentPath = window.location.pathname;
    
    document.querySelectorAll('.menu-section a').forEach(link => {
        link.classList.remove('active');
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // Mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const sidebar = document.querySelector('.admin-sidebar');
            if (sidebar) {
                sidebar.classList.toggle('show');
            }
        });
    }
}

// Utility: Small button style
const style = document.createElement('style');
style.textContent = `
    .btn-sm {
        padding: 6px 12px;
        font-size: 12px;
    }

    .status-rejected {
        background: #fee2e2;
        color: #991b1b;
    }

    .status-approved {
        background: #e6f9f0;
        color: #065f46;
    }
`;
document.head.appendChild(style);
