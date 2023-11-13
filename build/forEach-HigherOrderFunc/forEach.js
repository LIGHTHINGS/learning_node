"use strict";
const customForEach = (data, cb) => {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
        newData.push(data[i]);
        cb(newData[0]);
        newData.pop(data[i]);
    }
};
customForEach([1, 2, 3, 4, 5, 6, 7, 'Dare', 'Dara', { life: 'something' }], (like) => {
    console.log(like);
});
