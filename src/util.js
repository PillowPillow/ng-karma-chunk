const fs = require('fs');
const {promisify} = require('util');
const {join} = require('path');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

class Util {

	static async removeFiles(paths = []) {
		return Promise.all(paths.filter((path) => fs.existsSync(path)).map((path) => unlink(path)));
	}

	static async writeFile(path, content) {
		return writeFile(path, content);
	}

	static async readFile(path) {
		return readFile(path).then((content) => content.toString());
	}

	static async readDir(path) {
		return readdir(path);
	}

	static async getDirectories(path) {
		return Util.readDir(path)
		.then((els) => els.filter((el) => fs.statSync(join(path, el)).isDirectory()))
		.then((dirs) => dirs.map((dir) => Util.normalizePath(path, dir)));
	}

	static normalizePath(...paths) {
		let path = join(...paths).toString();
		return process.platform === 'win32' ? path.replace(/\\/g, '/') : path;
	}

}

module.exports = Util;
