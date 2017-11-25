Angular Karma Chunk
===

Add the `.root_spec.ts` and `.chunk_spec.ts` in the `tsconfig.spec.json`.
Double check that the module is `esnext`.
````json
{
	"extends": "../tsconfig.json",
	"compilerOptions": {
		"outDir": "../out-tsc/spec",
		"module": "esnext",
		"target": "es5",
		"baseUrl": "",
		"types": [
			"jasmine",
			"node"
		]
	},
	"files": [
		"test.ts"
	],
	"include": [
		"**/.root_spec.ts",
		"**/.chunk_spec.ts",
		"**/*.spec.ts",
		"**/*.d.ts"
	]
}
````

Replace the karma start statement in `src/test.ts` with the following lines

````typescript
// some code...
/**
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
**/

declare var System:any;
System.import('./.root_spec.ts');

````

Configure KarmaChunk in the package.json

````json
{
	"name": "",
	"version": "0.0.0",
	"description": "",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"karmaChunk": {
		"rootDir": "sample",
		"chunkDirs": [
			"sample/extra"
		],
		"chunksDirs": [
			"sample/modules"
		]
	},
	"license": "ISC",
	"dependencies": {
	}
}
````

Generate the root and chunk files by calling `ng-karma-chunk init` and start the tests with `ng test`





