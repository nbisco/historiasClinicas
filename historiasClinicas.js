Pacientes = new Mongo.Collection('pacientes');

if (Meteor.isClient) {
  Template.body.helpers({
    agregarHistoria: function() {
      return Session.get('agregarHistoria');
    },
    contarHistorias: function() {
      return Pacientes.find().count();
    },
    paciente: function() {
      return Pacientes.find({}, {sort: {creadoEl: -1}});
    },
  });

  Template.body.events({
    "click #nuevaHistoria": function () {
      Session.set('agregarHistoria', true);
    },
    "submit #formHistoria": function (e) {
      var paciente = {
        apellido: e.target.apellido.value,
        nombre: e.target.nombre.value,
        edad: e.target.edad.value,
        telefono: e.target.telefono.value,
        dni: e.target.dni.value,
        domicilio: e.target.domicilio.value,
        obraSocial: e.target.obraSocial.value 
      };
      Meteor.call('insertarPaciente', paciente);
      Session.set('agregarHistoria', false);
      return false;
    },
  });
  
}

Meteor.methods({
  insertarPaciente: function (paciente) {
    paciente.creadoEl = new Date();
    Pacientes.insert(paciente);
  },
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
