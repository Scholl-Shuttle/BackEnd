import {Router} from "express"; //pegando Router(é uma ferramenta) do express. Router é um organizador de rotas
import {UsuarioController} from "../controllers/UsuarioController"; // importando a classe que tem a logica de entrada

const router = Router(); //criando uma instancia do Router, ou seja, um organizador de rotas
const usuarioController = new UsuarioController(); //criando uma instancia da classe UsuarioController, ou seja, um objeto que tem a logica de entrada

router.post("/", usuarioController.create);

export { router as usuarioRoutes };
