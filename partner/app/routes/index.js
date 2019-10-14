const router = require("express").Router();

const homeController = require("../controller/home");
const partnerController = require("../controller/partner");

router.get("/", homeController.index);
router.get("/signup", homeController.signup);
router.post("/signup", partnerController.signup);

module.exports = router;