const { response } = require("express");
const jwt = require("jsonwebtoken");

const ValidarJwt = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token no encontrado",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT);

    (req.id = uid), (req.name = name);
    console.log(uid, name);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  console.log(token);

  next();
};

module.exports = {
  ValidarJwt,
};
