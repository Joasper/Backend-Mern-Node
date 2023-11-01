const jwt = require("jsonwebtoken");

const GenerarJson = (uid, name) => {
  return new Promise((res, rej) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("No se puedo generar el token");
        }

        res(token);
      }
    );
  });
};

module.exports = {
  GenerarJson,
};
