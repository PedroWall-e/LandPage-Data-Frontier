const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Inicializa o Admin SDK
admin.initializeApp();

// Define os segredos (Secrets) que serão configurados via CLI
const emailUser = defineSecret("EMAIL_USER");
const emailPass = defineSecret("EMAIL_PASS");

/**
 * Função para enviar e-mail de contato e salvar no Firestore
 */
exports.sendContactEmail = onRequest({
    cors: true,
    secrets: [emailUser, emailPass]
}, async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    const { name, email, phone, message } = req.body;

    if (!name || !email) {
        return res.status(400).send("Faltam dados obrigatórios (nome e email).");
    }

    try {
        // 1. Salvar no Firestore (Uso do Admin SDK moderno)
        const contactData = {
            name,
            email,
            phone: phone || "Não informado",
            message: message || "Sem mensagem",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: "new"
        };

        await admin.firestore("ladepage-dataf").collection("contacts").add(contactData);
        logger.info("Contato salvo no Firestore com sucesso.");

        // 2. Configurar o transportador de e-mail usando os Secrets
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser.value(),
                pass: emailPass.value(),
            },
        });

        const mailOptions = {
            from: `"Data Frontier Landpage" <${emailUser.value()}>`,
            to: emailUser.value(),
            subject: `Novo Contato: ${name}`,
            html: `
                <h3>Novo contato via Landpage</h3>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Mensagem:</strong> ${message || "Sem mensagem"}</p>
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
        logger.error("Erro no processamento do contato:", error);
        return res.status(500).send({
            success: false,
            error: "Erro interno. Por favor, tente novamente mais tarde."
        });
    }
});
