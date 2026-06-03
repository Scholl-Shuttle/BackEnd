import type { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export class UsuarioController {

    async create(req: Request, res: Response) {

        try {

            const {
                nome,
                cpf,
                email,
                senha,
                telefone
            } = req.body;

            const usuario = await usuarioService.cadastrar({
                nome,
                cpf,
                email,
                senha,
                telefone
            });

            return res.status(201).json(usuario);

        } catch (error: any) {

            return res.status(400).json({
                error: error.message
            });
        }
    }
}