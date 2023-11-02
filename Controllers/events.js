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
  console.log(req.body);
  console.log(req);
  const evento = new Evento(req.body);
  console.log(req.id);

  try {
    evento.user = req.id;

    const EventSave = await evento.save();

    return res.status(200).json({
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
  const { id } = req;

  try {
    const EventId = req.params.id;

    const evento = await Evento.findById(EventId);
    console.log(evento);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== id) {
      return res.status(401).json({
        ok: false,
        msg: "No se puede editar el evento de otro usuario",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: id,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      EventId,
      nuevoEvento,
      { next: true }
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
const BorrarEvento = async (req, res = response) => {
  const { id } = req;

  try {
    const EventId = req.params.id;

    const evento = await Evento.findById(EventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== id) {
      return res.status(401).json({
        ok: false,
        msg: "No se puede eleminar el evento de otro usuario",
      });
    }

    const EliminarEvento = await Evento.findByIdAndDelete(EventId);

    res.status(200).json({
      ok: true,
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
