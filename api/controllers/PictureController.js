/**
 * PictureController
 *
 * @description :: Server-side logic for managing pictures
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra');
var im = require('imagemagick');
var path = require('path');

module.exports = {
	


  /**
   * `PictureController.upload()`
   */
  upload: function (req, res) {
    req.picture('picture').upload({
      dirname: path.resolve('assets/uploads/photos')
    },
    function(err, uploadedPictures){
      var picture,
      name,
      source,
      url,
      target;
      for(var i=0;i<uploadedPictures.length;i++){
        picture = uploadedPictures[i];
        name = picture.fd.split('/').pop();
        source = path.resolve("assets/uploads/photos/" + name);
        target = path.resolve(".tmp/public/uploads/photos/" + name);
        url = "uploads/photos/" + name;
        Picture.create({
          name       : name,
          url        : url,
          id_galerie : req.param('id')
        }).exec(function(err,picture){
          if(err)
            console.log(err);
          else{
            im.resize({
              srcPath: source,
              dstPath: source,
              width: 100
            }, function(err, stdout, stderr){
              fs.copy(source,target,function(err){
                if(err)
                  console.log(err);
              });
              if(err)
                console.log(err);
            });
            return res.json(picture);
          }
        });
      }
    });
  },


  /**
   * `PictureController.delete()`
   */
  delete: function (req, res) {
    Picture.findOne({id: req.param('id')}).exec(function(err,picture){
      if(err)
        console.log(err);
      else{
        var source = path.resolve("assets/uploads/photos/" + picture.name),
            target = path.resolve(".tmp/public/uploads/photos/" + picture.name);
        fs.remove(source,function(err){
          if(err)
            console.log(err);
        });
        fs.remove(target,function(err){
          if(err)
            console.log(err);
        });
        Picture.destroy({id: picture.id}).exec(function(err,picture){
          if(err)
            console.log(err);
          else{
            console.log("Deleted!");
            return res.json(picture);
          }
        });
      }
    });
  }
};

