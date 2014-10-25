/**
 * AgendaController
 *
 * @description :: Server-side logic for managing agenda
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `AgendaController.index()`
   */
  index: function (req, res) {
    Agenda.find({sort: 'day ASC'}).paginate({page: req.param('id'), limit: 5}).exec(function(err,agendas){
      if(err)
        console.log(err);
      else
        return res.json(agendas);
    });
  },

  /**
   * `AgendaController.show()`
   */
  show: function (req, res) {
    Agenda.findOne({id: req.param('id')}).exec(function(err,agenda){
      if(err)
        console.log(err);
      else
        return res.json(agenda);
    });
  },

  /**
   * `AgendaController.edit()`
   */
  edit: function (req, res) {
    Agenda.update({id: req.param('id')},{
      title       : req.param('title'),
      description : req.param('description'),
      day         : req.param('day'),
      hour        : req.param('hour'),
      long        : req.param('long'),
      lat         : req.param('lat')
    }).exec(function(err,agenda){
      if(err)
        console.log(err);
      else{
        console.log('updated!');
        return res.json(agenda);
      }
    });
  },

  /**
   * `AgendaController.create()`
   */
  create: function (req, res) {
    Agenda.create({
      title       : req.param('title'),
      description : req.param('description'),
      day         : req.param('day'),
      hour        : req.param('hour'),
      long        : req.param('long'),
      lat         : req.param('lat')
    }).exec(function(err,agenda){
      if(err)
        console.log(err);
      else{
        console.log('Agenda '+agenda.id+' created!');
        return res.json(agenda);
      }
    });
  },

  /**
   * `AgendaController.delete()`
   */
  delete: function (req, res) {
    Agenda.destroy({id: req.param('id')}).exec(function(err,agenda){
      if(err)
        console.log(err);
      else{
        console.log('deleted!');
        return res.json(agenda);
      }
    });
  },

  /**
   * `AgendaController.count()`
   */
  count: function (req, res) {
    Agenda.count().exec(function(err,val){
      return res.json({count:val});
    });
  }
};

