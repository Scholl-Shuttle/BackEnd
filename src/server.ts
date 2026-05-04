import express, {Request,Response} from "express";
import { prisma } from "./prisma/Client";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    return res.send("Servidor rodando!");
});

app.get("/teste-db", async (req: Request, res: Response) => {
    try{
        const usuario = await prisma.usuario.findMany();

        return res.json({ usuario
        });
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
    }
});

app.listen(3000,() => {
    console.log("Servidor rodando em http://localhost:3000");
});
