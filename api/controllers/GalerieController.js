/**
 * GalerieController
 *
 * @description :: Server-side logic for managing galeries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `GalerieController.index()`
   */
  index: function (req, res) {
    Galerie.find({sort: 'createdAt ASC'}).paginate({page: req.param('id'), limit: 5}).exec(function(err,galeries){
      if(err)
        console.log(err);
      else
        return res.json({
          galeries: galeries
        });
    });
  },


  /**
   * `GalerieController.create()`
   */
  create: function (req, res) {
    Galerie.create({
      title       : req.param('title'),
      description : req.param('description')
    }).exec(function(err,galerie){
      if(err)
        console.log(err);
      else{
        console.log('Galerie '+galerie.id+ ' created!');
        return res.json(galerie);
      }
    });
  },


  /**
   * `GalerieController.show()`
   */
  show: function (req, res) {
    Galerie.findOne({id: req.param('id')}).exec(function(err,galerie){
      if(err)
        console.log(err);
      else{
        File.find({ id_galerie : galerie.id}).exec(function(err,files){
          if(err)
            console.log(err)
          else
            return res.json({
              galerie : galerie,
              photos  : files
            });
        });
      }
    });
  },


  /**
   * `GalerieController.delete()`
   */
  delete: function (req, res) {
    Galerie.destroy({id: req.param('id')}).exec(function(err,galerie){
      if(err)
        console.log(err);
      else{
        console.log('deleted!');
        return res.json(galerie);
      }
    });
  },


  /**
   * `GalerieController.edit()`
   */
  edit: function (req, res) {
    Galerie.update({id: req.param('id')},{
      title       : req.param('title'),
      description : req.param('description')
    }).exec(function(err,galerie){
      if(err)
        console.log(err);
      else{
        console.log('updated!');
        return res.json(galerie);
      }
    });
  },


  /**
   * `GalerieController.count()`
   */
  count: function (req, res) {
    Galerie.count().exec(function(err,val){
      return res.json({count:val});
    });
  }
};

