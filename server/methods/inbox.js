var multer = Meteor.npmRequire('multer');
var upload = multer();
var inboxAddress = 'inbox@mailgun.realtimecrm.co.uk';

Picker
	.filter(function(req, res) {
		return req.method == "POST";
	})
	.route('/mailbox', function(params, req, res) {

		var data = req.body;
		Meteor.call('mailgun.createActivityFromBodyData', data);

		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end('ok');
	})
	.middleware(upload.single());

Meteor.methods({
	'mailgun.createActivityFromBodyData': function(bodyData) {
		var subject = bodyData.Subject;
		var mailText = bodyData["stripped-text"];
		var timestamp = bodyData.timestamp;
		var sendDate = new Date(0);
		sendDate.setUTCSeconds(timestamp);

		var userEmail = bodyData.From;
		var cs = userEmail.indexOf('<');
		if (cs > -1) {
			var ce = userEmail.indexOf('>');
			var newStr = userEmail.substring(cs + 1, ce);
			userEmail = newStr
		}

		var MeteorUser = Meteor.users.findOne({
			'emails.address': userEmail
		});

		if (!MeteorUser) {
			return;
		} else {
			var TheTenant = Tenants.findOne({
				_id: MeteorUser.group
			});
			if (!TheTenant) {
				return;
			}

			Partitioner.bindGroup(TheTenant._id, function() {
				var addresses = bodyData.To.split(',');
				addresses.push(bodyData.From);
				_.each(addresses, function(addr, i) {
					var str = addr.trim();
					var chevronStart = str.indexOf('<');
					if (chevronStart > -1) {
						var chevronEnd = str.indexOf('>');
						var newStr = str.substring(chevronStart + 1, chevronEnd);
						addresses[i] = newStr
					}
				});

				var uniqueAddresses = _.uniq(addresses.map(function(r) {
					return {
						'email': r
					}
				}), 'email');

				_.each(uniqueAddresses, function(ua) {

					if(ua.email === inboxAddress) return;

					var contact = Contacts.findOne({
						email: ua.email
					});

					if (contact) {
						// Add an activity record against the discovered contact...
						var activityId = Activities.insert({
							type: 'Email',
							notes: subject + "\n\n" + mailText,
							createdAt: Date.now(),
							activityTimestamp: sendDate,
							contactId: contact._id,
							createdBy: MeteorUser._id,
							primaryEntityId: contact._id,
							primaryEntityType: 'contacts',
							primaryEntityDisplayData: contact.name()
						});

						// ...and tag it accordingly to ensure we know where it's come from
						Activities.addTag('Automated', {
							_id: activityId
						});
					}
				})
			});
		}

		// console.log('---------------------------');
		// console.log('MailGun Inbound Router data');
		// console.log('---------------------------');
		// console.log('Sender: ' + sender);
		// console.log('Recipient: ' + recipient);
		// console.log('Subject: ' + subject);
		// console.log('Mail Text: ' + mailText);
		// console.log('Mail Signature: ' + mailSignature);
		// console.log('Send Date: ' + sendDate);
		// console.log('---------------------------');
	}
})