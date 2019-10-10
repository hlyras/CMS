const router = require("express").Router();

const homeController = require("../controller/home");

router.get("/", homeController.index);

router.use("/api", require("./api"));

module.exports = router;