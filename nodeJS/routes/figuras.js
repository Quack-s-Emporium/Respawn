var express = require('express');
var router = express.Router();
var figuraController = require('../controllers/figurasC')

router.get('/', figuraController.figura_list);
router.get('/create', figuraController.figuras_create_get);
router.post('/create', figuraController.figuras_create_post);
router.get('/:id/update', figuraController.figuras_update_get);
router.post('/:id/update', figuraController.figuras_update_post);
router.post('/:id/delete', figuraController.figuras_delete_post);


module.exports = router;