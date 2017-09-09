var express = require('express');
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('Hello');
});

app.get('/contact', function (req, res){
	var message = "";
	res.render('message', {message: message});
});


app.post('/contact', function (req, res){
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "trivi2710@gmail.com",
			pass: "iloveNewyork91"
		}
	});

	var mailOption = {
		from: req.body.email,
		to: "trivi2710@gmail.com",
		subject: "hello",
		text: req.body.message
	}

	transporter.sendMail(mailOption, function(error, info){
		if(error){
			console.log(error);
		} 
		//console.log("Email sent: " + info.response);
		res.send('send');
	});
});

app.listen(3000, function(err){
	if(err) throw err;
	console.log('Listening on port 3000');
});