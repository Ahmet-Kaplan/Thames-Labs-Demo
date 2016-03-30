#!/usr/bin/env node

const exec = require('child_process').exec,
	path = require('path'),
	extend = require('util')._extend;

const meteorCommand = 'meteor --settings settings.json',
	meteorProcessOptions = {
		cwd: path.resolve(__dirname, '..'),
		env: extend(process.env, {
			STRIPE_PK: "pk_test_W7Cx4LDFStOIaJ2g5DufAIaE",
			STRIPE_SK: "sk_test_CEgjj8xNKSrQMUrqC4puiHxA",
			CI: 1
		})
	};

const chimpCommand = 'chimp';
var chimpSwitches = ' --ddp=http://localhost:3000 --path=tests/cucumber';

if (!process.env.CI) {
	chimpSwitches += ' --watch';
}

function startMeteor() {
	console.log('Starting Meteor');

	var meteorProcess = exec(meteorCommand, meteorProcessOptions);
	meteorProcess.stdout.pipe(process.stdout);
	meteorProcess.stderr.pipe(process.stderr);

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

	meteorProcess.stdout.on('data', (data) => {
		if (data.match('App running at')) {
			console.log('Starting Chimp');

			var chimpProcess = exec(chimpCommand + chimpSwitches);
			chimpProcess.stdout.pipe(process.stdout);
			chimpProcess.stderr.pipe(process.stderr);

			chimpProcess.on('close', function(code, signal) {
				meteorProcess.kill();

				console.log('Chimp exited via close event with code ' + (code ? code : signal));
			});
		}
	});
}

startMeteor();