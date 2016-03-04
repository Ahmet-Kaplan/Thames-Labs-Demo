var multer = Meteor.npmRequire('multer');
var upload = multer();

Picker
	.filter(function(req, res) {
		return req.method == "POST";
	})
	.route('/mailbox', function(params, req, res) {

		var data = req.body;
		var sender = data.sender;
		var recipient = data.recipient;
		var subject = data.subject;
		var fullThread = data["body-plain"];
		var mailText = data["stripped-text"];
		var mailSignature = data["stripped-signature"];
		var timestamp = data.timestamp;
		var sendDate = new Date(0);
		sendDate.setUTCSeconds(timestamp);

		console.log('---------------------------');
		console.log('MailGun Inbound Router data');
		console.log('---------------------------');
		console.log('Sender: ' + sender);
		console.log('Recipient: ' + recipient);
		console.log('Subject: ' + subject);
		console.log('Mail Text: ' + mailText);
		console.log('Mail Signature: ' + mailSignature);
		console.log('Send Date: ' + sendDate);
		console.log('---------------------------');

		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end('ok');
	})
	.middleware(upload.single());