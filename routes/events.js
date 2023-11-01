const { Router } = require("express");
const router = Router();
const {
  CrearEvento,
  ObtenerEvento,
  ActualizarEvento,
  BorrarEvento,
} = require("../Controllers/events");
const { ValidarJwt } = require("../middlewares/ValidarJWT");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");

router.use(ValidarJwt);

//TODO: Obtener Evento

router.get("/", ObtenerEvento);

//TODO: Crear Evento

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha inicio es obligatorio").custom(isDate),
    check("end", "Fecha final es obligatorio").custom(isDate),
  ],

  CrearEvento
);

//TODO: ACtualizar Evento

router.put("/:id", ActualizarEvento);

//TODO: Borrar Evento
router.delete("/:id", BorrarEvento);

module.exports = router;
