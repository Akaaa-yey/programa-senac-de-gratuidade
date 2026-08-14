# Portal PSG Pernambuco - Guia de Integração Supabase

## 📋 Configuração Inicial

### 1. Criar Projeto Supabase
```bash
1. Acesse https://supabase.com
2. Clique em "New Project"
3. Configurar:
   - Project name: portal-psg-pernambuco
   - Database password: (gere uma senha forte)
   - Region: South America (São Paulo) sa-east-1
   - Pricing: Free tier
```

### 2. Obter Credenciais
No painel Supabase:
- Acesse **Settings > API**
- Copie:
  - **URL**: sua-url.supabase.co
  - **anon key**: eyJ...
  - **service_role key**: eyJ... (guardar com segurança)

### 3. Instalação no Frontend
```html
<!-- Adicionar ao <head> das páginas -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

<script>
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_KEY = 'eyJ...'; // anon key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
</script>
```

---

## 🗄️ Schema de Banco de Dados

### Tabela: `candidatos`
```sql
CREATE TABLE candidatos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    data_nascimento DATE,
    telefone TEXT,
    endereco JSONB,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);
```

### Tabela: `editais`
```sql
CREATE TABLE editais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero TEXT UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data_abertura TIMESTAMP NOT NULL,
    data_encerramento TIMESTAMP NOT NULL,
    cursos TEXT[] NOT NULL,
    vagas_por_curso INTEGER,
    requisitos JSONB,
    documentos_obrigatorios TEXT[] NOT NULL,
    status TEXT DEFAULT 'ativo', -- ativo, encerrado
    created_by UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

### Tabela: `candidaturas`
```sql
CREATE TABLE candidaturas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidato_id UUID NOT NULL REFERENCES candidatos(id) ON DELETE CASCADE,
    edital_id UUID NOT NULL REFERENCES editais(id) ON DELETE CASCADE,
    curso TEXT NOT NULL,
    status TEXT DEFAULT 'pendente', -- pendente, em_analise, aprovada, recusada
    documentos JSONB NOT NULL, -- array de objetos {tipo, url, status}
    observacoes TEXT,
    triado_por UUID REFERENCES auth.users(id),
    data_triagem TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

### Tabela: `documentos`
```sql
CREATE TABLE documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidatura_id UUID NOT NULL REFERENCES candidaturas(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL, -- rg, cpf, comprovante_renda, diploma, etc
    url TEXT NOT NULL,
    caminho_storage TEXT NOT NULL,
    status TEXT DEFAULT 'pendente', -- pendente, validado, recusado
    resultado_ia JSONB, -- resultado da análise Gemini
    validado_por UUID REFERENCES auth.users(id),
    data_validacao TIMESTAMP,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT now()
);
```

### Tabela: `notificacoes`
```sql
CREATE TABLE notificacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL, -- candidatura_aprovada, documento_recusado, etc
    titulo TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    link TEXT,
    lida BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);
```

---

## 🔐 Row Level Security (RLS)

### Candidatos - só podem ver seus próprios dados
```sql
ALTER TABLE candidatos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidatos podem ver seus dados"
ON candidatos FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Candidatos podem atualizar seus dados"
ON candidatos FOR UPDATE
USING (auth.uid() = user_id);
```

### Candidaturas - candidatos veem suas, admins veem todas
```sql
ALTER TABLE candidaturas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidatos veem suas candidaturas"
ON candidaturas FOR SELECT
USING (
    candidato_id IN (
        SELECT id FROM candidatos WHERE user_id = auth.uid()
    )
    OR (
        SELECT role FROM auth.users WHERE id = auth.uid()
    ) = 'admin'
);
```

---

## 📤 Storage - Upload de Documentos

### 1. Criar bucket
```sql
-- No console Supabase SQL Editor:
INSERT INTO storage.buckets (id, name, public)
VALUES ('candidatos-documentos', 'candidatos-documentos', false);
```

### 2. Configurar RLS
```sql
CREATE POLICY "Candidatos podem fazer upload de seus documentos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'candidatos-documentos'
    AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### 3. Upload via JavaScript
```javascript
async function uploadDocument(file, candidatoId) {
    const filePath = `${candidatoId}/${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase
        .storage
        .from('candidatos-documentos')
        .upload(filePath, file);
    
    if (error) throw error;
    return filePath;
}
```

---

## 🤖 Integração Gemini API para OCR

### 1. Configurar Chave de API
```bash
# No arquivo .env (não commitar no Git!)
VITE_GEMINI_API_KEY=AIza...
```

### 2. Instalar SDK
```bash
npm install @google/generative-ai
```

### 3. Função de Validação de Documentos
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

async function validarDocumento(imageUrl, tipoDocumento) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
        Analise este documento ${tipoDocumento} e extraia:
        1. Validade e autenticidade
        2. Dados principais
        3. Problemas detectados
        
        Responda em JSON.
    `;
    
    const result = await model.generateContent([
        { text: prompt },
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: imageUrl
            }
        }
    ]);
    
    return JSON.parse(result.response.text());
}
```

---

## 📧 Notificações - Email + SMS

### 1. Configurar Fornecedor de Email
```sql
-- Supabase usa SendGrid, configure em Settings > Auth
-- Ou use função Supabase para disparar emails:

CREATE FUNCTION send_notification_email(
    p_email TEXT,
    p_titulo TEXT,
    p_mensagem TEXT
)
RETURNS void AS $$
BEGIN
    -- Implementar com Resend.com ou SendGrid
END;
$$ LANGUAGE plpgsql;
```

### 2. Exemplo: Notificar Candidato
```javascript
async function notificarAprovacao(candidatoId) {
    const { data, error } = await supabase
        .from('notificacoes')
        .insert([{
            usuario_id: candidatoId,
            tipo: 'candidatura_aprovada',
            titulo: '🎉 Parabéns!',
            mensagem: 'Sua candidatura foi aprovada!',
            link: '/html/privado/acompanhe.html'
        }]);
    
    if (error) throw error;
}
```

---

## 🔑 Autenticação com 2FA

### 1. Habilitar 2FA no Supabase
```sql
-- No console Supabase Auth:
-- Settings > Authentication > Enable 2FA
```

### 2. Fluxo Completo de Login Admin
```javascript
async function loginAdminComOTP(email, password, otp) {
    // 1. Primeiro login
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) throw error;
    
    // 2. Verificar OTP
    const { data: verifyData, error: verifyError } = 
        await supabase.auth.verifyOtp({
            email: email,
            token: otp,
            type: 'totp'
        });
    
    if (verifyError) throw verifyError;
    
    return verifyData.user;
}
```

---

## 🔄 Realtime - Atualizar Status em Tempo Real

### 1. Subscribe a Mudanças
```javascript
supabase
    .from('candidaturas')
    .on('*', payload => {
        console.log('Candidatura atualizada:', payload.new);
        // Atualizar UI
    })
    .subscribe();
```

### 2. Exemplo: Dashboard em Tempo Real
```javascript
function subscribeToTriagemUpdates(editalId) {
    supabase
        .from('candidaturas')
        .on('UPDATE', payload => {
            if (payload.new.edital_id === editalId) {
                updateStatusCard(payload.new);
            }
        })
        .subscribe();
}
```

---

## 📊 Criar Índices para Performance

```sql
-- Índices essenciais:
CREATE INDEX idx_candidatos_user_id ON candidatos(user_id);
CREATE INDEX idx_candidaturas_edital_id ON candidaturas(edital_id);
CREATE INDEX idx_candidaturas_candidato_id ON candidaturas(candidato_id);
CREATE INDEX idx_candidaturas_status ON candidaturas(status);
CREATE INDEX idx_documentos_candidatura_id ON documentos(candidatura_id);
CREATE INDEX idx_notificacoes_usuario_id ON notificacoes(usuario_id);
```

---

## 🚀 Deployment Checklist

- [ ] Variáveis de ambiente configuradas (SUPABASE_URL, SUPABASE_KEY)
- [ ] RLS policies ativadas em todas as tabelas
- [ ] Índices criados
- [ ] Bucket de storage criado e configurado
- [ ] Email delivery configurado
- [ ] OTP/2FA habilitado
- [ ] Backups automáticos ativados
- [ ] Monitoramento e logs configurados

---

## 📞 Suporte

- Documentação Supabase: https://supabase.com/docs
- Google Gemini: https://ai.google.dev
- Issues: Abrir issue neste repositório
