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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="150 150 537 537" width="60" height="60">
                                      <defs>
                                        <clipPath id="clipPath20" clipPathUnits="userSpaceOnUse">
                                          <path d="M 0,627.933 H 627.933 V 0 H 0 Z" />
                                        </clipPath>
                                      </defs>
                                      <g transform="matrix(1.3333333,0,0,-1.3333333,0,837.244)">
                                        <g clip-path="url(#clipPath20)">
                                          <g transform="translate(238.6387,462.4807)">
                                            <path fill="#ffffff" fill-rule="nonzero" stroke="none" d="M 0,0 0.001,-0.001 H 0 Z m -22.47,-207.322 0.182,-0.104 c 1.72,-0.988 3.565,-1.778 5.65,-2.412 l 1.892,-0.582 v 170.417 c 0,1.253 0.114,2.542 0.343,3.841 l 0.197,0.92 c 0.302,1.419 0.754,2.844 1.347,4.226 l 0.171,0.395 c 0.198,0.442 0.431,0.874 0.743,1.461 0.125,0.234 0.25,0.468 0.385,0.696 l 0.317,0.489 c 0.686,1.081 1.388,2.022 2.152,2.88 l 0.229,0.306 c 1.528,1.669 3.316,3.109 5.317,4.278 4.699,2.745 10.053,3.789 15.552,2.677 C 5.172,-28.136 1.424,-40.585 1.424,-53.138 V -208.85 l 19.627,11.487 v 144.376 c 0,15.62 8.114,29.877 21.177,37.201 12.729,7.142 27.922,7.1 40.642,-0.119 l 108.994,-61.834 0.291,2.141 c 1.606,11.742 -4.039,23.079 -14.372,28.885 L 92.553,1.159 C 73.16,12.163 50.165,11.877 31.021,0.4 29.69,-0.4 28.349,-1.299 26.852,-2.391 20.059,1.071 12.558,2.63 5.094,2.142 4.267,2.09 3.436,2.006 2.407,1.876 1.653,1.783 0.915,1.653 0.172,1.513 L -0.296,1.435 C -0.951,1.299 -1.611,1.144 -2.401,0.946 L -2.942,0.816 C -3.431,0.686 -3.909,0.535 -4.392,0.385 L -4.969,0.208 -5.588,0.01 c -0.478,-0.156 -0.946,-0.337 -1.486,-0.551 l -3.66,-1.58 c -0.311,-0.15 -0.618,-0.312 -0.92,-0.478 l -0.571,-0.307 -1.196,-0.649 c -0.67,-0.39 -1.336,-0.801 -1.98,-1.227 l -0.307,-0.213 c -0.624,-0.411 -1.227,-0.842 -1.819,-1.284 l -0.328,-0.25 c -8.119,-6.18 -13.686,-15.053 -15.676,-24.996 l -0.115,-1.455 h 0.005 c -0.488,-2.672 -0.733,-5.359 -0.733,-8.01 v -145.078 c 0,-8.831 4.564,-16.976 11.904,-21.254" />
                                          </g>
                                          <g transform="translate(393.5143,262.5085)">
                                            <path fill="#ffffff" fill-rule="nonzero" stroke="none" d="m 0,0 c 7.724,4.522 12.527,12.683 12.527,21.498 -0.011,1.913 -0.25,3.857 -0.728,5.952 l -0.447,1.944 -147.016,-86.144 c -7.813,-4.585 -17.288,-4.107 -24.732,1.252 -3.337,2.407 -5.894,5.749 -7.469,9.752 1.336,-0.094 2.594,-0.141 3.8,-0.141 10.749,0 21.441,2.937 30.916,8.499 L 2.718,42.238 -17.127,53.346 -143.061,-20.464 c -13.02,-7.625 -28.593,-7.693 -41.676,-0.203 -13.083,7.506 -20.891,20.984 -20.891,36.058 v 146.632 l -1.944,-0.666 c -10.572,-3.633 -17.678,-13.592 -17.678,-24.773 V 16.545 c 0,-22.668 11.867,-43.496 30.964,-54.349 1.586,-0.905 3.306,-1.767 5.229,-2.63 1.227,-13.655 8.603,-25.854 19.856,-32.762 6.752,-4.148 14.403,-6.342 22.138,-6.342 7.407,0 14.783,2.027 21.321,5.858 z" />
                                          </g>
                                          <g transform="translate(459.6675,325.7353)">
                                            <path fill="#ffffff" fill-rule="nonzero" stroke="none" d="m 0,0 c -0.104,15.261 -8.093,28.864 -21.368,36.395 l -124.967,70.899 c -7.563,4.294 -16.446,4.673 -23.76,1.05 -0.561,-0.275 -1.112,-0.571 -1.663,-0.894 -1.596,-0.93 -3.114,-2.058 -4.642,-3.456 l -1.486,-1.362 146.839,-83.301 c 7.095,-4.029 11.368,-11.305 11.425,-19.466 0.042,-5.515 -1.856,-10.687 -5.369,-14.772 -5.37,10.983 -13.889,20.001 -24.753,26.166 L -184.852,87.885 V 65.332 L -59.427,-5.811 c 13.062,-7.412 20.921,-20.797 21.025,-35.808 0.104,-15.017 -7.573,-28.516 -20.521,-36.105 l -144.797,-84.844 1.767,-1.321 c 4.99,-3.721 10.916,-5.608 16.867,-5.608 4.886,0 9.793,1.273 14.206,3.846 l 121.875,70.998 c 19.081,11.18 30.381,31.057 30.225,53.169 -0.015,1.84 -0.125,3.779 -0.343,5.889 C -7.028,-27.725 0.104,-14.486 0,0" />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
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
                                Recebemos sua mensagem sobre <strong>${subject || "Tecnologia"}</strong> com sucesso!
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
        };

        // Envia o email de confirmação sem travar o processo principal em caso de erro individual
        try {
            await transporter.sendMail(userMailOptions);
            console.log("E-mail de confirmação enviado para:", email);
        } catch (confirmError) {
            console.error("Erro ao enviar e-mail de confirmação para o usuário:", confirmError);
            // Continua a execução para retornar sucesso do envio principal
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
 * Endpoint Admin para gerar e enviar relatório de contatos
 * Uso: Acesse /admin/report?token=SENHA_AQUI
 */
app.get("/admin/report", async (req, res) => {
    // Camada básica de segurança para ninguém de fora disparar emails à toa
    const secretToken = "6874"; // Nova senha de 4 dígitos
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

/**
 * Endpoint Admin para recuperar a senha
 * Envia a senha atual para o email do administrador
 */
app.post("/admin/recoverPassword", async (req, res) => {
    try {
        const EMAIL_USER = process.env.EMAIL_USER;
        const secretToken = "6874"; // A mesma senha definida acima

        if (!EMAIL_USER) {
            return res.status(500).send({ success: false, error: "Erro na configuração de email do servidor." });
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
                <h3>Recuperação de Senha</h3>
                <p>Foi solicitada a recuperação da senha de acesso ao relatório de contatos.</p>
                <p>Sua senha atual é: <strong>${secretToken}</strong></p>
                <br />
                <p><em>Este é um e-mail automático da Landpage Data Frontier.</em></p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send({ success: true, message: "Senha enviada para o e-mail do administrador." });
    } catch (error) {
        console.error("Erro ao recuperar senha:", error);
        return res.status(500).send({ success: false, error: "Erro interno ao enviar e-mail de recuperação." });
    }
});

// Cloud Run requires listening on process.env.PORT, default to 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Contacts API listening on port ${port}`);
});
