/* ===== AUTHENTICATION SYSTEM ===== */

// Mock authentication system (replace with Supabase auth)
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
            // Mock login - replace with Supabase auth
            // In production: use supabase.auth.signInWithPassword()
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, type: 'candidato' })
            }).catch(() => null);

            // Mock response for demo
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
            // Validate email is SENAC institutional
            if (!email.endsWith('@pe.senac.br')) {
                return { 
                    success: false, 
                    error: 'Use seu email institucional SENAC (@pe.senac.br)' 
                };
            }

            // Mock login - replace with Supabase auth + 2FA
            const response = await fetch('/api/auth/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, otp })
            }).catch(() => null);

            // Mock response for demo
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
                return { success: false, error: 'Código 2FA inválido' };
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
            // Mock registration - replace with Supabase auth
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
        // Redirect to login
        if (window.location.pathname.includes('/admin/')) {
            window.location.href = '../../admin/login.html';
        } else {
            window.location.href = '../../login.html';
        }
        return false;
    }

    if (requiredRole === 'admin' && user.role !== 'admin') {
        window.location.href = '../../home.html';
        return false;
    }

    return true;
}

// Logout function
function logout() {
    if (confirm('Deseja realmente sair?')) {
        AUTH.logout();
    }
}

// Admin logout
function adminLogout() {
    if (confirm('Deseja realmente sair do painel administrativo?')) {
        AUTH.logout();
    }
}

// Login form handler - Candidato
function handleCandidatoLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
        showError('Por favor, preencha todos os campos');
        return;
    }

    AUTH.loginCandidato(email, password).then(result => {
        if (result.success) {
            window.location.href = '/html/privado/acompanhe.html';
        } else {
            showError(result.error || 'Erro ao fazer login');
        }
    });
}

// Login form handler - Admin
function handleAdminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const otp = document.getElementById('otp')?.value;

    if (!email || !password || !otp) {
        showError('Por favor, preencha todos os campos');
        return;
    }

    AUTH.loginAdmin(email, password, otp).then(result => {
        if (result.success) {
            window.location.href = '/html/admin/dashboard.html';
        } else {
            showError(result.error || 'Erro ao fazer login');
        }
    });
}

// Show error message
function showError(message) {
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

// Toggle password visibility
document.addEventListener('DOMContentLoaded', () => {
    const togglePasswords = document.querySelectorAll('.toggle-password');
    
    togglePasswords.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                e.target.classList.remove('fa-eye');
                e.target.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                e.target.classList.remove('fa-eye-slash');
                e.target.classList.add('fa-eye');
            }
        });
    });

    // Attach login forms
    const candidatoLoginForm = document.getElementById('login-form');
    if (candidatoLoginForm) {
        candidatoLoginForm.addEventListener('submit', handleCandidatoLogin);
    }

    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
});

// Add alert styles
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
        top: 100px;
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
