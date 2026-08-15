# Portal PSG Pernambuco - Documentação Completa

## 🎯 Visão Geral do Projeto

Portal de candidaturas online para o Programa de Gratuidade SENAC Pernambuco com:
- Área pública (home, editais, FAQ, teste de carreira)
- Área privada para candidatos (acompanhamento, inscrição, perfil)
- Painel administrativo com triagem de documentos e validação por IA

---

## 📁 Estrutura do Projeto

```
portal-PSG/
├── html/
│   ├── home.html                 # Página inicial
│   ├── editais.html              # Listagem de editais públicos
│   ├── faq.html                  # Perguntas frequentes
│   ├── teste-carreira.html       # Teste vocacional
│   ├── login.html                # Login de candidatos
│   ├── inscricao.html            # Cadastro de candidatos
│   ├── privado/                  # Área privada (requer autenticação)
│   │   ├── acompanhe.html        # Dashboard com status das candidaturas
│   │   ├── inscreva-se.html      # Inscrição em editais
│   │   └── perfil.html           # Gerenciamento de perfil
│   └── admin/                    # Painel administrativo
│       ├── login.html            # Login admin com 2FA
│       ├── dashboard.html        # Dashboard com métricas
│       ├── editais.html          # Lançar e gerenciar editais
│       ├── triagem.html          # Validação de documentos
│       └── usuarios.html         # Gerenciar usuários
├── css/
│   ├── global.css                # Estilos compartilhados
│   ├── home.css                  # Estilos da página inicial
│   ├── editais.css               # Estilos da listagem de editais
│   ├── login.css                 # Estilos do formulário de login
│   ├── incricao.css              # Estilos do formulário de cadastro
│   ├── teste-carreira.css        # Estilos do teste
│   ├── faq.css                   # Estilos do FAQ
│   ├── privado.css               # Estilos da área privada
│   └── admin.css                 # Estilos do painel admin
├── js/
│   ├── auth.js                   # Sistema de autenticação
│   ├── privado.js                # Funcionalidades da área privada
│   ├── admin.js                  # Funcionalidades do painel admin
│   ├── home.js                   # Scripts da página inicial
│   ├── script.js                 # Scripts globais
│   └── teste-carreira.js         # Scripts do teste
├── img/                          # Imagens estáticas
├── assets/                       # SVG e outros ativos
├── INTEGRACAO_SUPABASE.md        # Guia de integração backend
└── README.md                     # Este arquivo
```

---

## 🚀 Como Usar o Portal

### Para Candidatos

#### 1. **Página Inicial**
- Acesse: `/html/home.html`
- Veja regras do programa, etapas e FAQ
- Clique em "Entrar" para fazer login

#### 2. **Criar Conta**
- Acesse: `/html/inscricao.html`
- Preencha email, CPF, data de nascimento, telefone, senha
- Marque as declarações obrigatórias
- Clique em "Cadastrar"

#### 3. **Fazer Login**
- Acesse: `/html/login.html`
- Digite email e senha
- Será redirecionado para `/html/privado/acompanhe.html`

#### 4. **Inscrever-se em Edital**
- Vá para: `/html/privado/inscreva-se.html`
- Escolha o edital desejado
- Clique em "Inscrever-se"
- Preencha o formulário com seus dados
- Envie os documentos (RG, Comprovante de Renda, Diploma)
- Pronto! Sua candidatura foi registrada

#### 5. **Acompanhar Candidaturas**
- Vá para: `/html/privado/acompanhe.html`
- Veja status de todas as suas inscrições
- Filtre por status (Aprovada, Pendente, Recusada)

#### 6. **Gerenciar Perfil**
- Vá para: `/html/privado/perfil.html`
- Atualize dados pessoais, contato, endereço
- Altere sua senha

---

### Para Administradores

#### 1. **Acessar Painel**
- Acesse: `/html/admin/login.html`
- Digite email institucional (@pe.senac.br)
- Digite senha e código 2FA (do app authenticator)
- Clique em "Entrar"

#### 2. **Dashboard - Visão Geral**
- Acesse: `/html/admin/dashboard.html`
- Veja métricas (editais ativos, candidaturas, aprovações)
- Acompanhe atividade recente
- Acesse atalhos para ações comuns

#### 3. **Lançar Novo Edital**
- Vá para: `/html/admin/editais.html`
- Clique em "+ Novo Edital"
- Preencha:
  - Número e título do edital
  - Data de abertura e encerramento
  - Cursos oferecidos
  - Requisitos (renda mínima, diploma, etc)
  - Documentos obrigatórios
- Clique em "Lançar Edital"

#### 4. **Fazer Triagem de Documentos**
- Vá para: `/html/admin/triagem.html`
- Filtre por edital, status ou tipo de documento
- Clique em candidatura para revisar documentos
- Veja preview de documentos
- Use assistência IA para análise automática
- Aprove/recuse cada documento
- Selecione status final da candidatura
- Clique em "Salvar Decisão"

#### 5. **Gerenciar Usuários**
- Vá para: `/html/admin/usuarios.html`
- Visualize lista de candidatos
- Ative/desative contas
- Resete senhas
- Atribua permissões

---

## 🔧 Configuração e Setup

### 1. **Instalação Local**

```bash
# Clonar repositório
git clone <repo-url>
cd portal-PSG

# Iniciar servidor HTTP local
python -m http.server 8000

# Abrir no navegador
# http://localhost:8000/html/home.html
```

### 2. **Configurar Backend (Supabase)**

Veja arquivo `INTEGRACAO_SUPABASE.md` para:
- Criar projeto Supabase
- Configurar tabelas e RLS
- Integrar storage
- Configurar autenticação
- Integrar Gemini API para OCR

### 3. **Variáveis de Ambiente**

Criar arquivo `.env` na raiz:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_KEY=eyJ...
VITE_GEMINI_API_KEY=AIza...
```

---

## 🎨 Customização de Estilos

### Cores Principais
```css
--senac-blue: #0A1AEB     /* Azul primário */
--senac-orange: #FE8523   /* Laranja destaque */
--bg-light: #EAE7DC       /* Fundo claro */
--text-dark: #2c3e50      /* Texto escuro */
--text-light: #6c7a89     /* Texto claro */
```

### Breakpoints Responsivos
```css
980px   - Tablets e desktops
720px   - Tablets pequenos
640px   - Celulares
```

### Modificar Logo
- Editar em `html/home.html` (navbar-logo)
- Substituir SVG em `assets/psg-logo.svg`

---

## 🔐 Segurança

### Autenticação
- ✅ Login com email/senha
- ✅ 2FA com OTP para admin
- ✅ Tokens JWT armazenados localmente
- ✅ RLS (Row Level Security) no banco

### Validação de Dados
- ✅ Email validado
- ✅ CPF único
- ✅ Senha forte
- ✅ Validação frontend e backend

### Documentos
- ✅ Upload apenas para usuários autenticados
- ✅ Armazenamento seguro com Supabase Storage
- ✅ Validação com IA (Gemini)

---

## 🧪 Testes

### Contas de Teste

**Candidato:**
- Email: `candidato@example.com`
- Senha: `Senha123!`

**Admin:**
- Email: `admin@pe.senac.br`
- Senha: `AdminSenha123!`
- 2FA: `123456`

### Teste Responsividade
1. Abrir DevTools (F12)
2. Ativar modo dispositivo móvel (Ctrl+Shift+M)
3. Testar em diferentes tamanhos (iPhone, iPad, Desktop)

---

## 🐛 Troubleshooting

### Problema: "Não consegui fazer login"
- ✓ Verificar se email e senha estão corretos
- ✓ Certificar que conta foi criada
- ✓ Limpar cache/cookies do navegador
- ✓ Tentar em navegador privado

### Problema: "Erro ao enviar documentos"
- ✓ Verificar se arquivo é PDF ou imagem
- ✓ Verificar tamanho (máx. 10MB)
- ✓ Aguardar upload completar
- ✓ Verificar conexão de internet

### Problema: "Admin não consegue ver candidaturas"
- ✓ Verificar se login admin foi bem-sucedido
- ✓ Validar 2FA correto
- ✓ Verificar RLS policies no Supabase
- ✓ Verificar se edital está ativo

---

## 📈 Performance

### Otimizações Implementadas
- ✅ CSS minificado
- ✅ Lazy loading de imagens
- ✅ Cache de dados no localStorage
- ✅ Pagination na listagem de candidaturas
- ✅ Índices no banco de dados

### Melhorias Futuras
- [ ] Service Workers (PWA)
- [ ] Compressão Gzip
- [ ] CDN para assets estáticos
- [ ] Compressão de imagens
- [ ] Database query optimization

---

## 📚 Documentação Relacionada

- [Integração Supabase](./INTEGRACAO_SUPABASE.md)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Font Awesome Icons](https://fontawesome.com/icons)

---

## 🤝 Contribuindo

1. Fazer fork do repositório
2. Criar branch para feature (`git checkout -b feature/AmazingFeature`)
3. Commit mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

## 👥 Autores

- **SENAC Pernambuco** - Programa de Gratuidade
- Desenvolvido para modernizar processo de candidaturas

---

## 📞 Suporte e Contato

- Email: suporte@senac.pe.gov.br
- WhatsApp: (81) 3421-5000
- Horário: Segunda a Sexta, 8h-17h

---

**Última atualização:** 14/08/2025
