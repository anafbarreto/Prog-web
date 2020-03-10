const express = require ('express');
const router = express.Router();
const controller = require('../controllers/fornecedor')

router.post('/', controller.novo)
router.get('/', controller.listar)
router.put('/', controller.atualizar) 
router.delete('/', controller.delete)
router.get('/:id', controller.obterUm) //aqui selecionamos o que vem depois da barra e definimos como id

module.exports = router
 

