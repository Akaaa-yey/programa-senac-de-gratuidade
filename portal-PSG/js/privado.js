/* ===== PRIVATE AREA FUNCTIONALITY ===== */

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    if (!protectPage('candidato')) {
        return;
    }

    const user = AUTH.getUser();
    
    // Update user name in header
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = user.name;
    }

    const profileName = document.getElementById('profile-name');
    if (profileName) {
        profileName.textContent = user.name;
    }

    // Pre-fill email
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.value = user.email;
    }

    // Setup page-specific functionality
    setupAcompanhePage();
    setupInscricaoPage();
    setupPerfilPage();
    setupModalHandlers();
    setupTabHandlers();
    setupFileUploadHandlers();
});

/* ===== ACOMPANHE PAGE ===== */

function setupAcompanhePage() {
    if (!document.getElementById('applications-list')) return;

    // Mock data - replace with API call
    const mockApplications = [
        {
            id: 1,
            edital: 'PSG 2025.1',
            curso: 'Análise de Dados',
            status: 'aprovada',
            dataInscracao: '2025-08-01',
            dataAtualizacao: '2025-08-10'
        },
        {
            id: 2,
            edital: 'PSG 2025.2',
            curso: 'Desenvolvimento Web',
            status: 'pendente',
            dataInscracao: '2025-08-05',
            dataAtualizacao: '2025-08-14'
        },
        {
            id: 3,
            edital: 'PSG 2025.1',
            curso: 'Gestão de Projetos',
            status: 'recusada',
            dataInscracao: '2025-07-15',
            dataAtualizacao: '2025-08-08'
        }
    ];

    loadApplications(mockApplications);
    
    // Setup filter
    const filterSelect = document.getElementById('status-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            filterApplications(mockApplications);
        });
    }

    // Update status cards
    updateStatusCards(mockApplications);
}

function updateStatusCards(applications) {
    const totalEl = document.getElementById('total-candidaturas');
    const aprovadasEl = document.getElementById('aprovadas');
    const pendentesEl = document.getElementById('pendentes');
    const recusadasEl = document.getElementById('recusadas');

    if (totalEl) totalEl.textContent = applications.length;
    if (aprovadasEl) aprovadasEl.textContent = applications.filter(a => a.status === 'aprovada').length;
    if (pendentesEl) pendentesEl.textContent = applications.filter(a => a.status === 'pendente').length;
    if (recusadasEl) recusadasEl.textContent = applications.filter(a => a.status === 'recusada').length;
}

function loadApplications(applications) {
    const listDiv = document.getElementById('applications-list');
    if (!listDiv) return;

    listDiv.innerHTML = '';

    applications.forEach(app => {
        const statusClass = `status-${app.status}`;
        const statusLabel = {
            'aprovada': 'Aprovada',
            'pendente': 'Pendente',
            'recusada': 'Recusada'
        }[app.status];

        const item = document.createElement('div');
        item.className = 'application-item';
        item.innerHTML = `
            <div class="application-details">
                <h3>${app.edital}</h3>
                <p><strong>Curso:</strong> ${app.curso}</p>
                <p><strong>Inscrição em:</strong> ${new Date(app.dataInscracao).toLocaleDateString('pt-BR')}</p>
            </div>
            <div class="application-status ${statusClass}">
                ${statusLabel}
            </div>
        `;
        listDiv.appendChild(item);
    });
}

function filterApplications(applications) {
    const filterValue = document.getElementById('status-filter')?.value || '';
    const filtered = filterValue ? applications.filter(a => a.status === filterValue) : applications;
    loadApplications(filtered);
}

/* ===== INSCRICAO PAGE ===== */

function setupInscricaoPage() {
    if (!document.getElementById('editais-grid')) return;

    // Mock editais - replace with API call
    const mockEditais = [
        {
            id: 1,
            numero: 'PSG 2025.1',
            titulo: 'Programa de Gratuidade 2025.1',
            cursos: ['Análise de Dados', 'Desenvolvimento Web', 'Gestão de Projetos'],
            vagas: 60,
            encerramento: '2025-09-30'
        },
        {
            id: 2,
            numero: 'PSG 2025.2',
            titulo: 'Programa de Gratuidade 2025.2',
            cursos: ['Marketing Digital', 'Segurança da Informação'],
            vagas: 40,
            encerramento: '2025-10-31'
        }
    ];

    loadEditais(mockEditais);

    // Setup registration form
    const form = document.getElementById('registration-form');
    if (form) {
        form.addEventListener('submit', handleRegistration);
    }
}

function loadEditais(editais) {
    const gridDiv = document.getElementById('editais-grid');
    if (!gridDiv) return;

    gridDiv.innerHTML = '';

    editais.forEach(edital => {
        const diasRestantes = Math.ceil((new Date(edital.encerramento) - new Date()) / (1000 * 60 * 60 * 24));
        
        const card = document.createElement('div');
        card.className = 'edital-card';
        card.innerHTML = `
            <div class="edital-card-header">
                <h3>${edital.numero}</h3>
                <p>${edital.titulo}</p>
            </div>
            <div class="edital-card-body">
                <p><strong>Cursos:</strong></p>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    ${edital.cursos.map(c => `<li>${c}</li>`).join('')}
                </ul>
                <p><strong>Vagas totais:</strong> ${edital.vagas}</p>
                <p><strong>Encerramento:</strong> ${new Date(edital.encerramento).toLocaleDateString('pt-BR')}</p>
                <p style="color: #f59e0b; font-weight: 600;">⏰ ${diasRestantes} dias restantes</p>
            </div>
            <div class="edital-card-footer">
                <button class="btn btn-primary" onclick="openInscricaoModal(${edital.id}, '${edital.numero}')">
                    Inscrever-se
                </button>
            </div>
        `;
        gridDiv.appendChild(card);
    });
}

function openInscricaoModal(editalId, editalNumber) {
    const modal = document.getElementById('registration-modal');
    const title = document.getElementById('modal-title');
    if (title) {
        title.textContent = `Inscrição - ${editalNumber}`;
    }
    if (modal) {
        modal.classList.add('show');
    }
}

function handleRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Validate files
    const rgFile = document.getElementById('rg').files[0];
    const comprovanteFile = document.getElementById('comprovante').files[0];
    const diplomaFile = document.getElementById('diploma').files[0];

    if (!rgFile || !comprovanteFile || !diplomaFile) {
        showError('Por favor, envie todos os documentos obrigatórios');
        return;
    }

    // Mock submission - replace with API call
    AUTH.register(data).then(result => {
        if (result.success) {
            showSuccess('Inscrição enviada com sucesso!');
            event.target.reset();
            closeModal('registration-modal');
            setTimeout(() => {
                window.location.href = 'acompanhe.html';
            }, 1500);
        }
    });
}

/* ===== PERFIL PAGE ===== */

function setupPerfilPage() {
    if (!document.getElementById('profile-form')) return;

    const user = AUTH.getUser();

    // Pre-fill form
    document.getElementById('nome').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('cpf').value = user.cpf || '';
    document.getElementById('telefone').value = user.phone || '';

    // Setup save button
    const saveBtn = document.getElementById('save-profile');
    if (saveBtn) {
        saveBtn.addEventListener('click', handleProfileSave);
    }
}

function handleProfileSave() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const dataNascimento = document.getElementById('data_nascimento').value;

    if (!nome || !email || !telefone) {
        showError('Por favor, preencha todos os campos obrigatórios');
        return;
    }

    // Mock API call - replace with Supabase
    const user = AUTH.getUser();
    user.name = nome;
    user.email = email;
    user.phone = telefone;

    localStorage.setItem('user_data', JSON.stringify(user));
    showSuccess('Perfil atualizado com sucesso!');
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

/* ===== TAB HANDLERS ===== */

function setupTabHandlers() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

/* ===== FILE UPLOAD HANDLERS ===== */

function setupFileUploadHandlers() {
    const fileInputs = document.querySelectorAll('.file-upload input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const label = input.nextElementSibling;
                if (label) {
                    label.innerHTML = `
                        <i class="fas fa-check-circle" style="color: #10b981;"></i>
                        ${file.name}
                    `;
                }
            }
        });
    });
}
