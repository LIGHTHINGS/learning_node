"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var deleteFile = function (Data) {
    if (Data.includes('.js')) {
        (0, fs_1.open)(Data, 'r', function (err, file) {
            if (err) {
                (0, fs_1.writeFileSync)(Data, "const fileName = '".concat(Data, "'"), 'utf-8');
            }
            else if (file) {
                (0, fs_1.unlinkSync)(Data);
                console.log("./".concat(Data, " deleted because it already exist"));
            }
        });
    }
    else {
        (0, fs_1.open)(Data, 'r', function (err, file) {
            if (err) {
                (0, fs_1.writeFileSync)(Data, 'Hello world.. This is stream from Node', 'utf-8');
            }
            else if (file) {
                (0, fs_1.unlinkSync)(Data);
                console.log("./".concat(Data, " deleted because it already exist"));
            }
            else {
                console.log('Something wrong happened');
            }
        });
    }
};
deleteFile('Dare.txt');
// fs.unlinkSync('come.txt')
