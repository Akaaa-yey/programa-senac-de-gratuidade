/* ===== AUTHENTICATION SYSTEM ===== */

// Mock authentication system (compatível para testes no front-end)
const AUTH = {
    // Check if user is authenticated
    isAuthenticated() {
        const token = localStorage.getItem('auth_token');
        const user = localStorage.getItem('user_data');
        return !!(token && user);
    },

    // Check if user is admin
    isAdmin() {
        const user = this.getUser();
        return user && user.role === 'admin';
    },

    // Get current user
    getUser() {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    },

    // Get auth token
    getToken() {
        return localStorage.getItem('auth_token');
    },

    // Login candidato
    async loginCandidato(email, password) {
        try {
            const user = {
                id: 'user_' + Math.random().toString(36).substr(2, 9),
                email: email,
                name: 'Candidato Demo',
                role: 'candidato',
                phone: '(81) 98888-8888'
            };

            const token = 'token_' + Math.random().toString(36).substr(2, 20);

            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(user));

            return { success: true, user, token };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    },

    // Login admin
    async loginAdmin(email, password, otp) {
        try {
            if (!email.toLowerCase().endsWith('@pe.senac.br')) {
                return { 
                    success: false, 
                    error: 'Use seu email institucional SENAC (@pe.senac.br)' 
                };
            }

            if (otp.length === 6 && /^\d+$/.test(otp)) {
                const user = {
                    id: 'admin_' + Math.random().toString(36).substr(2, 9),
                    email: email,
                    name: 'Administrador SENAC',
                    role: 'admin',
                    department: 'Programa de Gratuidade'
                };

                const token = 'admin_token_' + Math.random().toString(36).substr(2, 20);

                localStorage.setItem('auth_token', token);
                localStorage.setItem('user_data', JSON.stringify(user));

                return { success: true, user, token };
            } else {
                return { success: false, error: 'Código 2FA inválido (deve conter 6 números)' };
            }
        } catch (error) {
            console.error('Admin login error:', error);
            return { success: false, error: error.message };
        }
    },

    // Logout
    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        window.location.href = '../home.html';
    },

    // Register candidato
    async register(formData) {
        try {
            const user = {
                id: 'user_' + Math.random().toString(36).substr(2, 9),
                email: formData.email,
                name: formData.nome,
                cpf: formData.cpf,
                phone: formData.telefone,
                role: 'candidato'
            };

            const token = 'token_' + Math.random().toString(36).substr(2, 20);

            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(user));

            return { success: true, user, token };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }
};

// Protect pages - redirect if not authenticated
function protectPage(requiredRole = 'candidato') {
    const isAuth = AUTH.isAuthenticated();
    const user = AUTH.getUser();
    
    if (!isAuth) {
        // Se estiver em uma subpasta (admin/ ou privado/), sobe um nível para ir ao login.html
        window.location.href = '../login.html';
        return false;
    }

    if (requiredRole === 'admin' && user.role !== 'admin') {
        window.location.href = '../home.html';
        return false;
    }

    return true;
}

// Logout functions
function logout() {
    if (confirm('Deseja realmente sair?')) {
        AUTH.logout();
    }
}

function adminLogout() {
    if (confirm('Deseja realmente sair do painel administrativo?')) {
        AUTH.logout();
    }
}

// Login form handler - Candidato
function handleCandidatoLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
        showError('Por favor, preencha todos os campos');
        return;
    }

    AUTH.loginCandidato(email, password).then(result => {
        if (result.success) {
            // Estando em /html/login.html, entra diretamente na pasta privado/
            window.location.href = 'privado/acompanhe.html';
        } else {
            showError(result.error || 'Erro ao fazer login');
        }
    });
}

// Login form handler - Admin
function handleAdminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;
    const otp = document.getElementById('otp')?.value.trim();

    if (!email || !password || !otp) {
        showError('Por favor, preencha todos os campos');
        return;
    }

    AUTH.loginAdmin(email, password, otp).then(result => {
        if (result.success) {
            // Estando em /html/admin/login.html, acessa o dashboard na mesma pasta
            window.location.href = 'dashboard.html';
        } else {
            showError(result.error || 'Erro ao fazer login');
        }
    });
}

// Show error message
function showError(message) {
    const existingError = document.querySelector('.alert-error');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert-success';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.insertBefore(successDiv, document.body.firstChild);
    setTimeout(() => successDiv.remove(), 5000);
}

// Toggle password visibility & form listeners
document.addEventListener('DOMContentLoaded', () => {
    const togglePasswords = document.querySelectorAll('.toggle-password');
    
    togglePasswords.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.currentTarget;
            const input = button.parentElement.querySelector('input');
            const icon = button.querySelector('i') || button;

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    const candidatoLoginForm = document.getElementById('login-form');
    if (candidatoLoginForm) {
        candidatoLoginForm.addEventListener('submit', handleCandidatoLogin);
    }

    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
});

// Estilos dinâmicos dos alertas
const style = document.createElement('style');
style.textContent = `
    .alert-error {
        background: #fee2e2;
        border: 1px solid #fca5a5;
        border-radius: 6px;
        color: #991b1b;
        padding: 12px 16px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
    }

    .alert-success {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e6f9f0;
        border: 1px solid #86efac;
        border-radius: 6px;
        color: #065f46;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        z-index: 2000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);