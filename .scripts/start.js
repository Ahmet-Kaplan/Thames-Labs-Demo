#!/usr/bin/env node

const exec = require('child_process').exec,
	path = require('path'),
	extend = require('util')._extend,
	processes = [];

const meteorCommand = 'meteor --settings settings.json',
	meteorProcessOptions = {
		cwd: path.resolve(__dirname, '..'),
		env: extend(process.env, {
			STRIPE_PK: "pk_test_W7Cx4LDFStOIaJ2g5DufAIaE",
			STRIPE_SK: "sk_test_CEgjj8xNKSrQMUrqC4puiHxA"
		})
	};

const chimpCommand = 'chimp';
var chimpSwitches = ' --ddp=http://localhost:3000 --path=tests/cucumber';

if (!process.env.CI) {
	chimpSwitches += ' --watch';
}

// function startMeteor(callback) {
function startMeteor() {
	console.log('Starting meteor');

	var meteorProcess = exec(meteorCommand, meteorProcessOptions);
	meteorProcess.stdout.pipe(process.stdout);
	meteorProcess.stderr.pipe(process.stderr);

	// if (callback) {
	meteorProcess.stdout.on('data', (data) => {
		if (data.match('App running at')) {
			// callback();
			var chimpProcess = exec(chimpCommand + chimpSwitches);
			chimpProcess.stdout.pipe(process.stdout);
			chimpProcess.stderr.pipe(process.stderr);
			chimpProcess.on('close', function(code) {
				console.log(opts.name, 'exited with code ' + code);
				for (var i = 0; i < processes.length; i += 1) {
					processes[i].kill();
				}
				exec('kill `ps ax | grep node | grep meteor | awk \'{print $1}\'`');
				process.exit(code);
			});
			processes.push(chimpProcess);
		}
	});

	processes.push(meteorProcess);
	// }
}

// function startChimp() {
// 	console.log('Starting chimp in watch mode');

// 	var chimpProcess = exec(chimpCommand + chimpSwitches);
// 	chimpProcess.stdout.pipe(process.stdout);
// 	chimpProcess.stderr.pipe(process.stderr);
// 	chimpProcess.on('close', function(code) {
// 		console.log(opts.name, 'exited with code ' + code);
// 		for (var i = 0; i < processes.length; i += 1) {
// 			processes[i].kill();
// 		}
// 		exec('kill `ps ax | grep node | grep meteor | awk \'{print $1}\'`');
// 		process.exit(code);
// 	});
// 	processes.push(chimpProcess);
// }

// startMeteor(startChimp());
startMeteor();