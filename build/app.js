"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const fs = require('fs/promises');
console.log('Working before the async commands');
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    //commands
    const CREATE_FILE = 'create file';
    const DELETE_FILE = 'delete file';
    const RENAME_FILE = 'rename file';
    const ADD_TO_FILE = 'add to file';
    const commandHandler = yield fs.open('./command.txt', 'r');
    const watcher = fs.watch('./command.txt');
    commandHandler.on("change", () => __awaiter(void 0, void 0, void 0, function* () {
        //get the size of the file
        console.log('event on is triggered');
        const size = (yield commandHandler.stat()).size;
        // allocate the intended size
        const buff = Buffer.alloc(size);
        const position = 0;
        const offset = 0;
        const length = buff.byteLength;
        // reading the content in the command.txt
        yield commandHandler.read(buff, offset, length, position);
        const command = buff.toString('utf-8');
        console.log(command);
        // create a file
        // check if key word 'create a file' and <path>
        if (command.includes(CREATE_FILE)) {
            const path = command.substring(CREATE_FILE.length + 1);
            createFile(path);
        }
        //Delete a file
        // Delete a file if it exist
        if (command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1);
            deleteFile(filePath);
        }
        // rename a file
        // rename a file if it exist
        if (command.includes(RENAME_FILE)) {
            const _idx = command.indexOf(' to ');
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
            const newFilePath = command.substring(_idx + 4);
            renameFile(oldFilePath, newFilePath);
        }
        // add to file
        // add to the file <path> this content:
        if (command.includes(ADD_TO_FILE)) {
            const _idx = command.indexOf(' this content: ');
            const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
            const content = command.substring(_idx + 15);
            addToFile(filePath, content);
        }
    }));
    const createFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingFile = yield fs.open(path, 'r');
            existingFile.close();
            console.log(`File ${path} already exists`);
        }
        catch (error) {
            const newFileHandle = yield fs.open(path, 'w');
            console.log('New File created');
            newFileHandle.close();
        }
    });
    //delete file function
    const deleteFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingFile = yield fs.open(path, 'r');
            if (existingFile) {
                yield fs.unlink(path);
                console.log(`File ${path} deleted`);
            }
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                console.log('No such file exist....');
            }
            else {
                console.log('An error has occured!!...');
                console.log(error);
            }
        }
    });
    //rename file function
    const renameFile = (oldPath, newPath) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fs.open(oldPath, 'r');
            yield fs.rename(oldPath, newPath);
            console.log(`File ${oldPath} renamed to ${newPath}`);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`${oldPath} does not exist or destination does not exist, please try another....`);
            }
            else {
                console.log('An error has occured!!...');
                console.log(error);
            }
        }
        ;
    });
    // add to file function
    const addToFile = (path, content) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            const fileHandle = yield fs.open(path, 'a');
            fileHandle.write(content);
            console.log(`File ${path} is updated with [ *** ${content} *** ]`);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`${path} does not exist, please try another....`);
            }
            else {
                console.log('An error has occured!!...');
                console.log(error);
            }
        }
        ;
        try {
            // watcher......
            for (var _d = true, watcher_1 = __asyncValues(watcher), watcher_1_1; watcher_1_1 = yield watcher_1.next(), _a = watcher_1_1.done, !_a; _d = true) {
                _c = watcher_1_1.value;
                _d = false;
                const event = _c;
                console.log(event.eventType);
                if (event.eventType === "change") {
                    commandHandler.emit("change");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = watcher_1.return)) yield _b.call(watcher_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
});
app();
