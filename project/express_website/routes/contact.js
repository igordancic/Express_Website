var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'user email',
			pass:' user pass'
		}
	});

	var mailOptions = {
		from: '"Fred Foo" <foo@blurdybloop.com>',
		to: 'bar@blurdybloop.com',
		subject:'Website Submission',
		text: 'You have a new sumbission with a following details... Name:' +req.body.name+' Email: ' +req.body.email+' Message: '+req.body.message,
		html: '<p> You got a new sumbisson with a following detals </p> <ul> <li>Name:'+req.body.name+'</li><li>Email:'+req.body.email+'</li><li>Message:'+req.body.message+'</li></ul>'

	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(err);
			res.redirect('/');
		} else{
			console.log('Message Sent'+info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
