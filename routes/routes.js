import {Router} from "express"
import {
    home, ingressos, servirIngressos, servirIngressoPorId, atracoes,
    calendario, compra, atracaoExemplo
} from "../controllers/routerController.js"

const router = Router()

// rotas principais da aplicaçao
router.get("/home", home)
router.get("/ingressos", ingressos)
router.get("/atracoes", atracoes)
router.get("/calendario", calendario)
router.get("/compra", compra)
router.get("/atracao1", atracaoExemplo)

// servir dados para a aplicaçao
router.get("/api/ingressos", servirIngressos)
router.get("/api/ingressos/:id", servirIngressoPorId)

export {router}
