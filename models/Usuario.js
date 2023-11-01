const { model, Schema } = require("mongoose");

const UsuarioEsquema = Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = model("Usuario", UsuarioEsquema);
