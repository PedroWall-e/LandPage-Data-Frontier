const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// Configuração do transportador de e-mail (Exemplo com Gmail)
// IMPORTANTE: Use variáveis de ambiente do Firebase (Secrets ou Config)
// Neste exemplo, usamos a configuração clássica para compatibilidade rápida
// Recomenda-se usar Secrets para senhas no futuro.
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // Note: Em 2nd Gen, as variáveis de config clássicas ainda funcionam
        // Mas é melhor definir explicitamente ou usar fallback.
        user: process.env.EMAIL_USER || "seu-email@gmail.com",
        pass: process.env.EMAIL_PASS || "sua-senha-de-app",
    },
});

exports.sendContactEmail = onRequest({ cors: true }, async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    const { name, email, phone, message } = req.body;

    if (!name || !email) {
        return res.status(400).send("Faltam dados obrigatórios.");
    }

    const mailOptions = {
        from: '"Data Frontier Landpage" <contato@datafrontier.com.br>',
        to: process.env.EMAIL_USER || "seu-email@gmail.com",
        subject: `Novo Contato: ${name}`,
        html: `
      <h3>Novo contato via Landpage</h3>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Mensagem:</strong> ${message || "Sem mensagem"}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).send({ success: true, message: "E-mail enviado com sucesso!" });
    } catch (error) {
        logger.error("Erro ao enviar e-mail:", error);
        return res.status(500).send({ success: false, error: error.toString() });
    }
});
