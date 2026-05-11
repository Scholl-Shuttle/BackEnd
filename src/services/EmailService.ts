import nodemailer from "nodemailer";


export class EmailService{

    async enviarCodigo(
        email:string, 
        codigo:string, 
        nome:string
    ) {
        try {
            const transporter = nodemailer.createTransport({
            service: 'gmail',

            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Código de Verificação VRUM",

            html:`
                <H1>Olá, ${nome}!</H1>
                <h2>Está aqui seu código de verificação é: <strong>${codigo}</strong></h2>
            `
        });
        } catch (error){
            console.error(error);
            throw new Error("Erro ao enviar email de verificação");
        }
    }
}