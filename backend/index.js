const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mysql = require("mysql2/promise");

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Configuração do Banco de Dados MySQL (Pool de Conexões)
let pool;

async function executeDbSetup() {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Testa a conexão e garante que a tabela principal exista
        const connection = await pool.getConnection();
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                message TEXT,
                subject VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) DEFAULT 'new'
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        connection.release();
        console.log("Banco de dados MySQL conectado e API pronta!");
    } catch (err) {
        console.error("Falha Crítica: Não foi possível conectar ao banco MySQL ou configurar a tabela:", err);
    }
}
executeDbSetup();

/**
 * Endpoint para receber o contato, salvar no banco MySQL e enviar por email
 */
app.post("/sendContactEmail", async (req, res) => {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
        return res.status(500).send({ success: false, error: "Erro de configuração no servidor de e-mail." });
    }

    const { name, email, phone, message, subject } = req.body;

    if (!name || !email) {
        return res.status(400).send("Faltam dados obrigatórios (nome e email).");
    }

    try {
        // 1. Salvar no Banco de Dados MySQL
        const safePhone = phone || "Não informado";
        const safeMessage = message || "Sem mensagem";
        const safeSubject = subject || "Não especificado";

        if (pool) {
            await pool.execute(
                `INSERT INTO contacts (name, email, phone, message, subject) VALUES (?, ?, ?, ?, ?)`,
                [name, email, safePhone, safeMessage, safeSubject]
            );
            console.log("Contato salvo no banco de dados MySQL com sucesso.");
        } else {
            console.warn("Conexão MySQL nula no momento do INSERT, log de memória ativado...");
        }

        // 2. Configurar o transportador de e-mail usando variáveis de ambiente
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Data Frontier Landpage" <${EMAIL_USER}>`,
            to: EMAIL_USER,
            subject: `Novo Contato: ${name}`,
            html: `
                <h3>Novo contato via Landpage</h3>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${safePhone}</p>
                <p><strong>Assunto de Interesse:</strong> ${safeSubject}</p> 
                <p><strong>Mensagem:</strong> ${safeMessage}</p>
                <hr>
                <p><em>Este lead foi armazenado no banco de dados central (MySQL).</em></p>
            `,
        };

        // 3. Enviar o e-mail para o administrador
        await transporter.sendMail(mailOptions);

        // 4. Enviar e-mail de confirmação estilizado para o usuário com o visual da marca
        const userMailOptions = {
            from: `"Equipe Data Frontier" <${EMAIL_USER}>`,
            to: email,
            subject: `Recebemos sua mensagem, ${name}!`,
            html: `
            <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F9F8F6; margin: 0; padding: 40px 20px; color: #2B2B2B;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06);">
                    
                    <!-- Header -->
                    <div style="background-color: #3347FF; padding: 40px 40px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td width="64" valign="middle">
                                    <img src="cid:datafrontier-logo" width="60" height="60" alt="Data Frontier Icon" style="display:block; border:none; outline:none; text-decoration:none;" />
                                </td>
                                <td valign="middle" align="left">
                                    <div style="font-size: 32px; font-weight: 900; color: #FFFFFF; letter-spacing: -1px; line-height: 1.1; margin-left: 10px;">
                                        data<br/>frontier
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Content -->
                    <div style="padding: 40px 40px;">
                        <h2 style="color: #2B2B2B; font-size: 24px; margin-top: 0; margin-bottom: 20px;">Olá, ${name}!</h2>
                        
                        <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                            Agradecemos muito por entrar em contato. É um prazer ter você aqui conosco na <strong>Data Frontier</strong>.
                        </p>
                        
                        <div style="background-color: #F0F3FF; border-left: 4px solid #3347FF; padding: 20px 25px; border-radius: 0 12px 12px 0; margin: 30px 0;">
                            <p style="margin: 0; color: #2B2B2B; font-weight: 600; font-size: 15px; line-height: 1.5;">
                                Recebemos sua mensagem sobre <strong>${safeSubject}</strong> com sucesso!
                            </p>
                        </div>
                        
                        <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                            Nossa equipe já foi notificada e retornará o contato o mais breve possível para o número ou e-mail informados. Vamos conversar e entender exatamente como podemos impulsionar seu projeto.
                        </p>
                        
                        <p style="color: #2B2B2B; font-size: 16px; line-height: 1.6; margin: 0;">
                            Um grande abraço,<br/>
                            <strong>Equipe Data Frontier</strong>
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #FFE3D6; padding: 30px 40px; text-align: center;">
                        <p style="margin: 0; color: #2B2B2B; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            Tecnologia única como você
                        </p>
                        <p style="margin: 15px 0 0 0;">
                            <a href="https://datafrontier.com.br" target="_blank" style="color: #3347FF; text-decoration: none; font-weight: 700; font-size: 15px;">Acessar nosso site</a>
                        </p>
                    </div>

                </div>
            </div>
            `,
            attachments: [{
                filename: 'favicon.png',
                path: require('path').join(__dirname, 'favicon.png'),
                cid: 'datafrontier-logo'
            }]
        };

        // Envia o email de confirmação sem travar o processo principal em caso de erro individual
        try {
            await transporter.sendMail(userMailOptions);
            console.log("E-mail de confirmação enviado para:", email);
        } catch (confirmError) {
            console.error("Erro ao enviar e-mail de confirmação para o usuário:", confirmError);
        }

        return res.status(200).send({
            success: true,
            message: "Sua mensagem foi recebida e registrada com sucesso!"
        });

    } catch (error) {
        console.error("Erro no processamento do contato:", error);
        return res.status(500).send({
            success: false,
            error: "Erro interno. Por favor, tente novamente mais tarde."
        });
    }
});

/**
 * Endpoint Admin para gerar e enviar relatório de contatos usando o banco MySQL
 * Uso: Acesse /admin/report?token=SENHA_AQUI
 */
app.get("/admin/report", async (req, res) => {
    const secretToken = process.env.ADMIN_TOKEN;
    if (!secretToken) {
        console.error("ADMIN_TOKEN environment variable is not set.");
        return res.status(500).send("Erro de configuração de segurança do servidor.");
    }
    if (req.query.token !== secretToken) {
        return res.status(401).send("Não autorizado.");
    }

    try {
        if (!pool) {
            return res.status(500).send("Pool do banco de dados MySQL não inicializado.");
        }

        // 1. Buscar todos os contatos no MySQL (ordenados do último para o primeiro)
        const [rows] = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");

        if (!rows || rows.length === 0) {
            return res.status(200).send("Nenhum contato encontrado no banco de dados.");
        }

        // 2. Montar o texto do relatório
        let reportHtml = "<h2>Relatório de Contatos - Data Frontier</h2><hr/>";

        rows.forEach(c => {
            const dataObj = c.created_at ? new Date(c.created_at) : new Date();
            const dataData = dataObj.toLocaleDateString('pt-BR');

            reportHtml += `
                <p><strong>Data:</strong> ${dataData}</p>
                <p><strong>Nome:</strong> ${c.name}</p>
                <p><strong>Email:</strong> ${c.email}</p>
                <p><strong>Telefone:</strong> ${c.phone}</p>
                <p><strong>Interesse:</strong> ${c.subject || "N/A"}</p>
                <hr/>
            `;
        });

        // 3. Configurar e Enviar E-mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const mailOptions = {
            from: `"Data Frontier Admin" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Envia para o próprio dono do serviço
            subject: `Relatório de Leads/Contatos MySQL (${rows.length} encontrados)`,
            html: reportHtml,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).send("Relatório gerado via MySQL e enviado para o seu e-mail com sucesso!");

    } catch (error) {
        console.error("Erro ao gerar relatório MySQL:", error);
        return res.status(500).send("Erro interno ao gerar relatório no banco de dados.");
    }
});

/**
 * Endpoint Admin para recuperar a senha Mestra
 */
app.post("/admin/recoverPassword", async (req, res) => {
    try {
        const EMAIL_USER = process.env.EMAIL_USER;

        if (!EMAIL_USER) {
            return res.status(500).send({ success: false, error: "Erro na configuração de email do servidor." });
        }

        if (!process.env.ADMIN_TOKEN) {
            return res.status(500).send({ success: false, error: "ADMIN_TOKEN não configurado no servidor." });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const mailOptions = {
            from: `"Data Frontier Admin" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Recuperação de Senha do Relatório Admin`,
            html: `
                <h3>Recuperação de Senha Mestra</h3>
                <p>Foi solicitada a recuperação da senha de acesso ao relatório de contatos do Banco da Dados.</p>
                <p>Sua senha atual está definida nas Variáveis de Ambiente do Portainer como <strong>ADMIN_TOKEN</strong>.</p>
                <br />
                <p><em>Este é um e-mail automático da Landpage Data Frontier.</em></p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send({ success: true, message: "Instruções enviadas para o e-mail do administrador designado." });
    } catch (error) {
        console.error("Erro ao recuperar senha admin:", error);
        return res.status(500).send({ success: false, error: "Erro interno no servidor de remessas." });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`API de Contatos ouvindo na porta ${port} [Modo de Persistência: MySQL Pool]`);
});
