/**
 * LivredorController
 *
 * @description :: Server-side logic for managing livredors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `LivredorController.index()`
   */
  index: function (req, res) {
    Livredor.find({sort: 'createdAt ASC'}).paginate({page: req.param('id'), limit: 5}).exec(function(err,livredors){
      if(err)
        console.log(err);
      else
        return res.json(livredors);
    });
  },

  /**
   * `LivredorController.create()`
   */
  create: function (req, res) {
    Livredor.create({
      pseudo  : req.param('pseudo'),
      comment : req.param('comment')
    }).exec(function(err,livredor){
      if(err)
        console.log(err);
      else{
        console.log('Livredor '+livredor.id+' created!');
        return res.json(livredor);
      }
    });
  },

  /**
   * `LivredorController.delete()`
   */
  delete: function (req, res) {
    Livredor.destroy({id: req.param('id')}).exec(function(err,livredor){
      if(err)
        console.log(err);
      else{
        console.log('deleted!');
        return res.json(livredor);
      }
    });
  },

  /**
   * `LivredorController.count()`
   */
  count: function (req, res) {
    Livredor.count().exec(function(err,val){
      return res.json({count:val});
    });
  }
};

