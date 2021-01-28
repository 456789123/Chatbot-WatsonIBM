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
	version: '2019-02-28',
  	iam_apikey: '2XSMXJOZdMDUnMgTeXamGLdAgidWrVhIvsKwmvB8loVI',
	url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/635d2697-49f8-4770-8e7d-5bea9cf124b0',

});

app.get('/conversation/:text*?', function (req, res) {
  const { text } = req.params;

	assistant.message({
		workspace_id:'3ba04c68-e926-4f3a-ba30-66959d519d66',
		input: {'text': text},
	}).then(response => {
		console.log( response );
		res.status(200).send(response);
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
