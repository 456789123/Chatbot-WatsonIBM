const AssistantV1 = require('ibm-watson/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


const app = express();
var jsonParser = bodyParser.json()
var contato = require('./contato');


app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
  version: '',
  iam_apikey: '',
  url: 'https://gateway.watsonplatform.net/assistant/api',
});

app.get('/conversation/:text*?', function (req, res) {
  const { text } = req.params;
  
  //console.log( text );

	assistant.message({
		workspace_id:'c8f37872-cae6-44b0-ad0d-08ffb922e3ab',
		input: {'text': text},
	}).then(response => {
		res.json(response);
	}).catch(err => {
		console.log(err)
	});

});


app.post('/contato', jsonParser, function ( req ) {

	contato.nome = req.body.nome;
	contato.email = req.body.email;
	contato.objetivo = req.body.objetivo;
	contato.textoArea = req.body.textoArea ;

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: false,
		port: 25,
		auth: {
			user: 'leroycarvalho2018@gmail.com',
			pass: ''
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	
	var mailOptions = {
		from: 'leroycarvalho2018@gmail.com',
		to: 'leroycarvalho2018@gmail.com',
		subject: contato.objetivo,
		text: 'Nome: ' + contato.nome + '\n' +
					'Email: ' + contato.email + '\n' +
					'Menssagem: ' + contato.textoArea  
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log('Deu erro ao enviar... ');
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

})

app.listen(port, () => console.log(`Running on port ${port}`));
