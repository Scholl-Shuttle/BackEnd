import { prisma } from "../prisma/Client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class LoginService {
    async login(
        identificador: string, //pode ser email ou cpf
        senha: string
    ){
        const usuario = await prisma.usuario.findFirst({
            where: {
                OR:[
                    {email: identificador},
                    {cpf: identificador}
                ]
            }
        });

        if(!usuario){
            throw new Error("Usuário não encontrado");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if(!senhaValida){
            throw new Error("Senha inválida");
        }

        if(!usuario.ativo){
            throw new Error("Conta não verificada");
        }

        const token = jwt.sign({
            id: usuario.user_id,
            email: usuario.email
            },
            "segredo", // trocar por .env
            {
                expiresIn: "1h"
            }
        );
        return {
            usuario:{
                id: usuario.user_id,
                nome: usuario.nome,
                email: usuario.email,
            },
            token
        };
    }
}