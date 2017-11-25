const {join} = require('path');

const ChunkTag = '/*{{chunks}}*/';

const FileNames = {
	'Root': '.root_spec.ts',
	'Chunk': '.chunk_spec.ts'
};

const Templates = {
	'Root': join(__dirname, `../templates/${FileNames.Root}`),
	'Chunk': join(__dirname, `../templates/${FileNames.Chunk}`)
};

module.exports = {ChunkTag, FileNames, Templates};