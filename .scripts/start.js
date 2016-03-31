#!/usr/bin/env node

const spawn = require('child_process').spawn,
			path = require('path'),
			extend = require('util')._extend;

const meteorCommand = 'meteor',
			meteorArgs = ['--settings', 'settings.json'],
			meteorProcessOptions = {
				cwd: path.resolve(__dirname, '..'),
				env: extend(process.env, {
					STRIPE_PK: "pk_test_W7Cx4LDFStOIaJ2g5DufAIaE",
					STRIPE_SK: "sk_test_CEgjj8xNKSrQMUrqC4puiHxA",
					CI: 1
				}),
			};

const chimpCommand = 'chimp';
var chimpArgs = ['--ddp=http://localhost:3000',  '--path=tests/cucumber'];

if (!process.env.CI) {
	chimpArgs.push('--watch');
}

console.log('Starting Meteor');

var meteorProcess = spawn(meteorCommand, meteorArgs, meteorProcessOptions);

meteorProcess.on('exit', function(code, signal) {
	console.log('Meteor exited via exit event with code ' + (code ? code : signal));
	if (code) {
		process.exit(code);
	} else {
		process.exit(0);
	}
});


meteorProcess.on('close', function(code, signal) {
	console.log('Meteor exited via close event with code ' + (code ? code : signal));
	if (code) {
		process.exit(code);
	} else {
		process.exit(0);
	}
});

meteorProcess.stdout.on('error', (data) => {
	console.log('ERROR! ' + data.toString());
});

meteorProcess.stdout.on('data', (data) => {
	//data is a Buffer and needs to be converted to a string to be displayed
	data = data.toString().replace(/\r?\n|\r/, ' ');
	console.log(data);

	if (data.match('App running at')) {
		console.log('Starting Chimp');

		var chimpProcess = spawn(chimpCommand, chimpArgs);

		chimpProcess.stdout.on('data', (data) => {
			data = data.toString().replace(/\r?\n|\r/, ' ');
			console.log(data);

			//Handle results to throw error if tests failed
			if(data.match(/[0-9]+ scenarios.*[0-9]+.failed?/)) {
				throw new Error('TESTS FAILED!');
			}
		})

		chimpProcess.on('close', function(code, signal) {
			meteorProcess.kill();

			console.log('Chimp exited via close event with code ' + (code ? code : signal));
		});

		chimpProcess.stdout.on('error', (data) => {
			console.log('Error raised: ' + data.toString());
		})
	}
});