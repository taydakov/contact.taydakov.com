var express = require('express')
var app = express();
var nodemailer = require('nodemailer');
var settings = require('./settings'); /* should contain service (e.g. Gmail), user, pass */

var transporter = nodemailer.createTransport({
  service: settings.service,
  auth: {
    user: settings.user,
    pass: settings.pass
  }
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  if (!request.query.name || !request.query.email || !request.query.subject || !request.query.message)
    return response.send('error');

  var from = request.query.name + " <" + request.query.email + ">";
  var subject = from + " - " + request.query.subject;
  var text = request.query.message;

  var mailoptions = {
    to: "lev.taydakov@gmail.com",
    subject: subject,
    text: text
  };

  console.log(mailoptions);

  transporter.sendMail(mailoptions, function(error, info) {
    if (error) {
      console.log(error);
      response.send(request.query.callback + "({result: false})");
    } else {
      console.log('Message sent: ' + info.response);
      response.send(request.query.callback + "({result: true, message: \"You message has been sent. Thank you!\"})");
    }
  });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
