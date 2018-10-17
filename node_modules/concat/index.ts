import {readFile, readdir, writeFile, statSync} from 'fs'
import {resolve, join} from 'path'
import {Promise} from 'es6-promise'

const log = (err: Error) => console.log(err);

const isFile = (f: string) => statSync(f).isFile();

const write = (fName: string, str: string) => new Promise((res, rej) => {
  writeFile(resolve(fName), str, (err: Error) => {
    if (err) return rej(err)
    
    return res(str)
  })
});

const readFolder = (folder: string) => new Promise((res, rej) => {
  readdir(resolve(folder), (err: any, files: any) => {
    if (err) rej(err)

	const fileList = files.map(f => join(folder, f));
    res(fileList.filter(isFile));
  })
});


const read = (fName: string) => new Promise((res, rej) => {
  readFile(resolve(fName), (err: any, str: any) => {
    if (err) rej(err)
	
	let newText = str.toString().replace(/^(\s+)(protected|private)/gim, '$1 public ');
		newText = newText.toString().replace(/^class /g, 'export class ');
	
    res(newText)
  })
});

const concat = (files: string[]) => new Promise((res, rej) => {
	return Promise.all(files.map(read))
		.then(src => res(src.join('\n')))
		.catch(rej);
});

export = (folder: string[] | string, outFile?: string) => new Promise((res, rej) => {
	let concatenated;

	if(typeof folder === 'string') { 
		concatenated = readFolder(folder)
			.then(concat);
	} else {
		concatenated = concat(folder);
	}

	if (outFile) {
		concatenated.then((out: string) => write(outFile, out)
			.then(res)
			.catch(rej)
		).catch(rej);
	} else {
		concatenated.then(res).catch(rej);
	}
});
