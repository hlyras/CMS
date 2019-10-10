const router = require("express").Router();

const apiController = require("../controller/api");

router.get("/", apiController.get);
router.post("/", apiController.post);
router.put("/", apiController.put);
router.patch("/", apiController.patch);
router.delete("/", apiController.remove);
router.options("/", apiController.options);

module.exports = router;