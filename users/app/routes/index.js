const router = require("express").Router();

const homeController = require("../controller/home");

router.get("/", homeController.index);
router.get("/signup", homeController.signup);

module.exports = router;