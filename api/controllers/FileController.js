/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra');
var im = require('imagemagick');
var path = require('path');

module.exports = {
	


  /**
   * `FileController.upload()`
   */
  upload: function (req, res) {
    req.file('file').upload({
      dirname: path.resolve('assets/uploads/photos')
    },
    function(err, uploadedFiles){
      var file,
      name,
      source,
      url,
      target;
      for(var i=0;i<uploadedFiles.length;i++){
        file = uploadedFiles[i];
        name = file.fd.split('/').pop();
        source = path.resolve("assets/uploads/photos/" + name);
        target = path.resolve(".tmp/public/uploads/photos/" + name);
        url = "uploads/photos/" + name;
        File.create({
          name       : name,
          url        : url,
          id_galerie : req.param('id')
        }).exec(function(err,file){
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
            return res.json(file);
          }
        });
      }
    });
  },


  /**
   * `FileController.delete()`
   */
  delete: function (req, res) {
    File.findOne({id: req.param('id')}).exec(function(err,file){
      if(err)
        console.log(err);
      else{
        var source = path.resolve("assets/uploads/photos/" + file.name),
            target = path.resolve(".tmp/public/uploads/photos/" + file.name);
        fs.remove(source,function(err){
          if(err)
            console.log(err);
        });
        fs.remove(target,function(err){
          if(err)
            console.log(err);
        });
        File.destroy({id: file.id}).exec(function(err,file){
          if(err)
            console.log(err);
          else{
            console.log("Deleted!");
            return res.json(file);
          }
        });
      }
    });
  }
};

