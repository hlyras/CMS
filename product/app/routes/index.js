const router = require("express").Router();

const productController = require('../controller/product');

//API ROUTES
// router.get('/', productController.index);
router.get('/', productController.list);
router.get('/code/:code', productController.findByCode);
router.get('/id/:id', productController.findById);

router.get('/config', productController.config);
router.post('/save', productController.save);
router.post('/get', productController.get);
router.post('/filter', productController.filter);
router.delete('/remove', productController.remove);
router.post('/addImage', productController.addImage);
router.delete('/removeImage', productController.removeImage);
router.post('/categorySave', productController.categorySave);
router.get('/categoryList', productController.categoryList);
router.post('/colorSave', productController.colorSave);
router.get('/colorList', productController.colorList);

module.exports = router;