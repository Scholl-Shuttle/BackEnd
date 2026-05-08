
import { prisma } from "../prisma/Client";

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

        if(usuario.ativo){
            throw new Error("Conta já está ativa");
        }

        if(!usuario.codigo || !usuario.codigoExpiraEm){
            throw new Error("Código invalido");
        }

        if(usuario.codigo !== data.codigo){
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
                codigoExpiraEm: null
            }
        });

        return{
            message: "Conta ativada com sucesso"
        }
    }
}
