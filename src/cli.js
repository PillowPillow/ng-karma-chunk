const {getRootDir, getChunkDirs, getChunksDirs} = require('./confReader');
const {getDirectories, normalizePath} = require('./util');
const {generateRootSpec, generateChunkSpec, clearChunkSpecs, clearRootSpec} = require('./templating');

class Cli {

	static async initialize() {
		let chunkDirs = await Cli.getChunkDirectories();
		return Promise.all([
			...chunkDirs.map((dir) => generateChunkSpec(dir)),
			generateRootSpec(getRootDir(), chunkDirs)
		]);
	}

	static async clear() {
		return Cli.clearByConfig();
	}

	static async clearByConfig() {
		let chunkDirs = await Cli.getChunkDirectories();
		return Promise.all([
			clearChunkSpecs(chunkDirs),
			clearRootSpec(getRootDir())
		]);
	}

	static async getChunkDirectories() {
		let chunkDirs = await Promise.all(getChunksDirs().map((dir) => getDirectories(dir)));
		return [
			...chunkDirs.reduce((chunks, dirs) => [...chunks, ...dirs.map((dir) => normalizePath(dir))], []),
			...getChunkDirs()
		];
	}

}

module.exports = Cli;