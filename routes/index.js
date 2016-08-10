var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var sendgrid = require("sendgrid");


var helper = require('sendgrid').mail;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/eboard', function(req, res, next) {
  res.render('eboard', { title: 'Express' });
});

router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Express' });
});

router.post('/contactus', function(req, res, next) {
  var bod = req.body.name_id + "\n"+ req.body.email_id+"\n"+req.body.inquiry_id;
  console.log(bod);
  from_email = new helper.Email('test@example.com')
  to_email = new helper.Email('svs@stern.nyu.edu')
  subject = 'New Inquiry via Contact Us Form on nyusvs.com'
  content = new helper.Content('text/plain', bod)
  mail = new helper.Mail(from_email, subject, to_email, content)

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  });
  // console.log(req.body.name_id);

  res.render('contactus', { title: 'Express' });
});


module.exports = router;

//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
