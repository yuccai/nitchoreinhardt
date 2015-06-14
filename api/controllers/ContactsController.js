/**
 * ContactsController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `ContactsController.sendMail()`
   */
  sendMail: function (req, res) {
    Mailer.sendMail(req.param('from'),
                    req.param('body'),
                    req.param('name'),
                    req.param('firstname'),
                    req.param('subject'));
    return res.json({
      todo: 'sendMail() is not implemented yet!'
    });
  }
};

