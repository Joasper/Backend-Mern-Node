//! Route = http://localhost:4000/api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  CrearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../Controllers/auth");

const { ValidarJwt } = require("../middlewares/ValidarJWT");

router.post(
  "/register",
  [check("name", "El nombre es obligatorio").not().isEmpty()],
  [check("email", "El email es obligatorio").isEmail()],
  [check("password", "El password es obligatorio").isLength({ min: 6 })],
  CrearUsuario
);
router.post(
  "/",
  [check("email", "El email es obligatorio").isEmail()],
  [check("password", "El password es obligatorio").isLength({ min: 6 })],
  loginUsuario
);
router.get("/renew", ValidarJwt, revalidarToken);

module.exports = router;
