'use strict';
const mongoose = require('../../database');

const PortalTransparenciaSchema = new mongoose.Schema({
  cpf: {
    type: String,
  },
  tipo: {
    type: String,
  },
  nomeServidor: {
    type: String,
  },
  matricula:{
      type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PortalTransparencia = mongoose.model('portalTransparencia', PortalTransparenciaSchema);

module.exports = PortalTransparencia;

