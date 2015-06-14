/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `AdminController.loggin()`
   */
  login: function (req, res) {
    var bcrypt = require('bcrypt');

    Admin.findOneByEmail(req.param('email')).exec(function (err, admin) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (admin) {
        bcrypt.compare(req.param('password'), admin.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            req.session.admin = admin.id;
            res.json(admin);
          }
          else {
            if (req.session.admin)
              req.session.admin = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      }
      else
        res.json({ error: 'Admin not found' }, 404);
    });
  },

  /**
   * `AdminController.create()`
   */
  create: function (req, res) {
    Admin.create({
      email    : req.param('email'),
      password : req.param('password1')
    }).exec(function(err,admin){ 
      if(err)
      console.log(err);
      else{
        console.log('Admin '+admin.id+' created!');
        return res.json(admin);
      }
    });
  }
}
