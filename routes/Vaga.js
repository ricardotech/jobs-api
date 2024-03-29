const express = require("express");
const router = express.Router();

const vagaController = require("../controller/vaga");

router.post("/vaga", vagaController.add);

router.get("/vaga/:_id", vagaController.getById);
router.get("/vagas", vagaController.get);

router.delete("/vaga/:_id", vagaController.delete);

router.get("/filter/:filter", vagaController.param);

router.post("/filter", vagaController.filter);

module.exports = router;
