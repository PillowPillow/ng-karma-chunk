const fs = require('fs');
const {normalizePath} = require('./util');

const PackageFilePath = normalizePath(process.cwd(), 'package.json');

if(!fs.existsSync(PackageFilePath)) throw new Error('unable to find a package.json in the current working directory');
const {karmaChunk} = require(PackageFilePath);

class ConfReader {

	static getConf() {
		return karmaChunk || {
			rootDir: 'src',
			chunkDirs: [], // chunk directories
			chunksDirs: [], // directories containing chunk directories
		};
	}

	static getRootDir() {return ConfReader.getConf().rootDir;}

	static getChunksDirs() {return ConfReader.getConf().chunksDirs;}

	static getChunkDirs() {return ConfReader.getConf().chunkDirs;}

}

module.exports = ConfReader;