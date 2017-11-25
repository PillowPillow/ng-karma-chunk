#! /usr/bin/env node

const program = require('commander');
const {join} = require('path');
const {version, description} = require(join(__dirname, '../package.json'));
const Cli = require('./cli');

program.version(version)
.description(description);

program.command('init')
.alias('i')
.description('create chunk & root spec files by parsing the package.json config')
.action(() => {
	return Cli.initialize().catch((err) => console.error(err));
});

program.command('clean')
.alias('d')
.description('remove chunks & root spec files by parsing the package.json config')
.action(() => {
	return Cli.clear().catch((err) => console.error(err));
});

program.parse(process.argv);