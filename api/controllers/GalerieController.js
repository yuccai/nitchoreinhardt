/**
 * GalerieController
 *
 * @description :: Server-side logic for managing galeries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra');
var path = require('path');

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
    File.find({id_galerie: req.param('id')}).exec(function(err,files){
      if(err)
        console.log(err)
      else{
        var source, target;
        for(var i in files){
          source = path.resolve("assets/uploads/photos/" + files[i].name),
          target = path.resolve(".tmp/public/uploads/photos/" + files[i].name);
          fs.remove(source,function(err){
            if(err)
              console.log(err);
          });
          fs.remove(target,function(err){
            if(err)
              console.log(err);
          });
          File.destroy({id: files[i].id}).exec(function(err,file){
            if(err)
              console.log(err);
            else{
              console.log("File : "+file+" deleted!");
              return res.json(file);
            }
          });
        }
        Galerie.destroy({id: req.param('id')}).exec(function(err,galerie){
          if(err)
            console.log(err);
          else{
            console.log('Deleted!');
            return res.json(galerie);
          }
        });
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
        console.log('Updated!');
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

