var nodemailer = require('nodemailer');
var settings = require('./settings');

var transporter = nodemailer.createTransport({
  service: settings.service,
  auth: {
    user: settings.user,
    pass: settings.pass
  }
});

var mailOptions = {
  from: "Taydakov.com <contact.taydakov.com@gmail.com>",
  to: "lev.taydakov@gmail.com",
  subject: "Hello!",
  text: "What's up!",
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + info.response);
  }
});
