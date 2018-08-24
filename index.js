#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
if (process.argv.length < 4) {
	printHelp();
	return;
}
const inputOption = process.argv[2];
const resolvedPath = path.resolve(inputOption);
if (!fs.existsSync(resolvedPath)) {
	console.error("Couldn't find input file");
	printHelp();
	return
}
let config;
try {
	config = JSON.parse(fs.readFileSync(resolvedPath));
} catch (e) {
	console.error("Couldn't load input file");
	printHelp();
	return
}

// Slice off our arguments before passing them on
process.argv.splice(1, 2);
require("which")(process.argv[1], function(err, path) {
    try {
        // We need to load the other module's copy of the sdk so that we can override options
        const AWS = require(require.resolve("aws-sdk", {paths: [fs.realpathSync(path)]}));
        AWS.config.update(config);
    } catch (e) {
		console.error("Couldn't load aws-sdk. Check that your command is a node application that uses aws-sdk.");
		printHelp();
		return
    }

	require(path);
});

function printHelp() {
	console.log("aws-wrap <awsconfig.json> <command to run ...>")
}