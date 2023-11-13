"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const deleteFile = (Data) => {
    if (Data.includes('.js')) {
        (0, fs_1.open)(Data, 'r', (err, file) => {
            if (err) {
                (0, fs_1.writeFileSync)(Data, `const fileName = '${Data}'`, 'utf-8');
            }
            else if (file) {
                (0, fs_1.unlinkSync)(Data);
                console.log(`./${Data} deleted because it already exist`);
            }
        });
    }
    else {
        (0, fs_1.open)(Data, 'r', (err, file) => {
            if (err) {
                (0, fs_1.writeFileSync)(Data, 'Hello world.. This is stream from Node', 'utf-8');
            }
            else if (file) {
                (0, fs_1.unlinkSync)(Data);
                console.log(`./${Data} deleted because it already exist`);
            }
            else {
                console.log('Something wrong happened');
            }
        });
    }
};
deleteFile('Dare.txt');
// fs.unlinkSync('come.txt')
