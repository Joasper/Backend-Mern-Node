const { response } = require("express");
const { validationResult } = require("express-validator");
const Evento = require("../models/Evento");

//TODO: Obtener Evento

const ObtenerEvento = async (req, res = response) => {
  try {
    const evento = await Evento.find().populate("user", "name");

    res.status(200).json({
      ok: true,
      evento,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Error no implementado",
    });
  }
};

//TODO: Crear Evento
const CrearEvento = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  const evento = new Evento(req.body);

  console.log(req.body);
  try {
    evento.user = req.uid;

    const EventSave = await evento.save();

    res.status(200).json({
      ok: true,
      msg: "CrearEvento",
      evento: EventSave,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Error no implementado",
    });
  }
};

//TODO: ACtualizar Evento
const ActualizarEvento = async (req, res = response) => {
  const { uid } = req.uid;

  try {
    const EventId = req.params.id;
    const evento = Evento.findById(EventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (evento.user !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No se puede editar el evento de otro usuario",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      EventId,
      nuevoEvento,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Error no implementado",
    });
  }
};

//TODO: Borrar Evento
const BorrarEvento = (req, res = response) => {
  try {
    res.status(200).json({
      ok: true,
      msg: "BorrarEvento",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Error no implementado",
    });
  }
};

module.exports = {
  ObtenerEvento,
  CrearEvento,
  ActualizarEvento,
  BorrarEvento,
};
