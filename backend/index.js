const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Inicializa o Admin SDK (Usa Application Default Credentials no Google Cloud)
admin.initializeApp();

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

/**
 * Endpoint para receber o contato, salvar no Firestore e enviar por email
 */
app.post("/sendContactEmail", async (req, res) => {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
        return res.status(500).send({ success: false, error: "Erro de configuração no servidor." });
    }

    const { name, email, phone, message, subject } = req.body;

    if (!name || !email) {
        return res.status(400).send("Faltam dados obrigatórios (nome e email).");
    }

    try {
        // 1. Salvar no Firestore
        const contactData = {
            name,
            email,
            phone: phone || "Não informado",
            message: message || "Sem mensagem",
            subject: subject || "Não especificado", // <-- Nova linha
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: "new"
        };

        await admin.firestore().collection("contacts").add(contactData);
        console.log("Contato salvo no Firestore com sucesso.");

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
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Assunto de Interesse:</strong> ${subject || "Não especificado"}</p> <p><strong>Mensagem:</strong> ${message || "Sem mensagem"}</p>
                <hr>
                <p><em>Este dado também foi registrado no seu Banco de Dados (Firestore).</em></p>
            `,
        };

        // 3. Enviar o e-mail
        await transporter.sendMail(mailOptions);

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
 * Endpoint Admin para gerar e enviar relatório de contatos
 * Uso: Acesse /admin/report?token=SENHA_AQUI
 */
app.get("/admin/report", async (req, res) => {
    // Camada básica de segurança para ninguém de fora disparar emails à toa
    const secretToken = "datafrontier2026"; // Mude esta senha!
    if (req.query.token !== secretToken) {
        return res.status(401).send("Não autorizado.");
    }

    try {
        // 1. Buscar todos os contatos no Firestore
        const contactsSnapshot = await admin.firestore().collection("contacts").orderBy("createdAt", "desc").get();

        if (contactsSnapshot.empty) {
            return res.status(200).send("Nenhum contato encontrado no banco de dados.");
        }

        // 2. Montar o texto do relatório
        let reportHtml = "<h2>Relatório de Contatos - Data Frontier</h2><hr/>";

        contactsSnapshot.forEach(doc => {
            const data = doc.data();
            const dataData = data.createdAt ? data.createdAt.toDate().toLocaleDateString('pt-BR') : 'Data desconhecida';

            reportHtml += `
                <p><strong>Data:</strong> ${dataData}</p>
                <p><strong>Nome:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Telefone:</strong> ${data.phone}</p>
                <p><strong>Interesse:</strong> ${data.subject || "N/A"}</p>
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
            to: process.env.EMAIL_USER, // Envia para o próprio dono
            subject: `Relatório de Leads/Contatos (${contactsSnapshot.size} encontrados)`,
            html: reportHtml,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).send("Relatório gerado e enviado para o seu e-mail com sucesso!");

    } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        return res.status(500).send("Erro interno ao gerar relatório.");
    }
});

// Cloud Run requires listening on process.env.PORT, default to 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Contacts API listening on port ${port}`);
});
