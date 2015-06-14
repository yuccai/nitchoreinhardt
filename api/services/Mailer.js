var nodemailer = require('nodemailer');

exports.sendMail = function(from, body, name, firstname, subject) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: 'chanteloup.pierre@gmail.com',
        pass: 'gptqbckglloq'
      }
  });


  var mailOptions = {
    from    : name + ' ' + firstname + ' <' + from + '>',
    to      : 'chanteloup.pierre@gmail.com',
    subject : subject,
    text    : 'Hello world ✔',
    html    : body +'\n' + from
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error)
      console.log(error);
    else
      console.log('Message sent : ' + info.response);
  });
};
