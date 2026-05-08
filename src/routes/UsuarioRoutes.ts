import {Router} from "express"; //pegando Router(é uma ferramenta) do express. Router é um organizador de rotas
import {UsuarioController} from "../controllers/UsuarioController"; // importando a classe que tem a logica de entrada
import { UsuarioService } from"../services/UsuarioService";
import { ConfirmacaoService } from "../services/cofirmacaoService";

const router = Router(); //criando uma instancia do Router, ou seja, um organizador de rotas

const usuarioController = new UsuarioController(); //criando uma instancia da classe UsuarioController, ou seja, um objeto que tem a logica de entrada
const usuarioService = new UsuarioService();
const confirmacaoService = new ConfirmacaoService();

//cadastro
router.post("/cadastrp", async (req, res) => {
    try{
        const result = await usuarioService.cadastrar(req.body);
        res.json(result);
    } catch(error:any){
        res.status(400).json({error: error.message});
    }
});

//confirmação

router.post("/confirmar", async(req, res) => {
    try{
        const result = await confirmacaoService.confirmar(req.body);
        res.json(result);
    } catch(error:any){
        res.status(400).json({error: error.message});
    }
});

export { router as usuarioRoutes };
