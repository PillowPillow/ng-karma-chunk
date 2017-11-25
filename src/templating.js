const {readFile, writeFile, normalizePath, removeFiles} = require('./util');
const {Templates, FileNames, ChunkTag} = require('./const');

class Templating {

	static async generateRootSpec(rootDir, chunks) {
		let content = await readFile(Templates.Root);
		let imports = chunks.map((module) => {
			let modulePath = normalizePath(module.replace(rootDir, './'), FileNames.Chunk);
			return `\nSystem.import('./${modulePath}')`;
		}).join(',');
		content = content.replace(ChunkTag, imports);

		let filepath = normalizePath(rootDir, FileNames.Root);
		await writeFile(filepath, content);
		console.log(`${filepath} generated`);
	}

	static async generateChunkSpec(path) {
		let content = await readFile(Templates.Chunk);
		let filepath = normalizePath(path, FileNames.Chunk);
		await writeFile(filepath, content);
		console.log(`${filepath} generated`);
	}

	static async clearChunkSpecs(paths) {
		paths = paths.map((path) => normalizePath(path, FileNames.Chunk));
		await removeFiles(paths);
		paths.forEach((path) =>console.log(`${path} removed`));
	}

	static async clearRootSpec(path) {
		path = normalizePath(path, FileNames.Root);
		await removeFiles([path]);
		console.log(`${path} removed`);
	}

}

module.exports = Templating;