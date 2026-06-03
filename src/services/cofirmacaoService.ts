
import { access } from "node:fs";
import { prisma } from "../prisma/Client";
import jwt from "jsonwebtoken";

export class ConfirmacaoService{
    async confirmar(data:{
        email: string;
        codigo: string;
    }){
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: data.email
            }
        });

        

        if(!usuario){
            throw new Error("Usuário não encontrado");
        }
        console.log("CODIGO BANCO:", usuario.codigo);
        console.log("CODIGO RECEBIDO:", data.codigo);

        if(usuario.tipoCodigo !== "ativacao"){
            throw new Error("Código de ativação inválido");
        }

        if(usuario.ativo){
            throw new Error("Conta já está ativa");
        }

        if(!usuario.codigo || !usuario.codigoExpiraEm){
            throw new Error("Código invalido");
        }

        if(usuario.codigo.trim !== data.codigo.trim){
            throw new Error("Código incorreto");
        }

        if(new Date() > usuario.codigoExpiraEm){
            throw new Error("Código expirado");
        }


        await prisma.usuario.update({
            where:{ email: data.email},
            data:{
                ativo: true,
                codigo: null,
                codigoExpiraEm: null,
                tipoCodigo: null
            }
        });
        
        const token = jwt.sign({
            id: usuario.user_id,
            email: usuario.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1h"
        },
        );

        return{
            message: "Conta confirmada com sucesso",
            user: {
                id: usuario.user_id,
                nome: usuario.nome,
                email: usuario.email
        },
        accessToken: token
    };
    }
}
