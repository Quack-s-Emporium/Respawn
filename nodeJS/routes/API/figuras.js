var express = require('express');
var router = express.Router();
var figuraController = require('../../controllers/API/figuraControllerAPI');

router.get('/', figuraController.figura_list);
router.post('/create', figuraController.figura_create);
router.delete('/delete', figuraController.figura_delete);
router.post('/update', figuraController.figura_update);

module.exports = router;