const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { GenerarJson } = require("../helpers/jwt");

const CrearUsuario = async (req, res = response) => {
  console.log("Se requiere /");
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }
    usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const Token = await GenerarJson(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      Token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error No implementado",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  console.log("Se requiere /");
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      error: errors.mapped(),
    });
  }

  try {
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario no existe con ese correo",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contrseña no valida",
      });
    }

    const Token = await GenerarJson(usuario.id, usuario.name);

    return res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      Token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error No implementado",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const uid = req.id;
  const name = req.name;

  const token = await GenerarJson(uid, name);

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "El token no existe",
    });
  }
  console.log(token);
  try {
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Error al generar el token",
    });
  }

  console.log("Se requiere /");
};

module.exports = {
  CrearUsuario,
  loginUsuario,
  revalidarToken,
};
