"use strict";
const myCustomClosure = (data) => {
    const name = data;
    function innerFunc() {
        console.log(`Hi there ${data}`);
    }
    innerFunc();
};
//Second closure with inner functions but returns as object
const myCustomClosure2 = (data2) => {
    const anotherName = data2;
    const newInnerFunc = () => {
        console.log(`Hi there ${data2}..from second closure example`);
    };
    const anotherFunc = () => {
        console.log(`${data2} dhould be feeling better now`);
    };
    return {
        newInnerFunc,
        anotherFunc
    };
};
myCustomClosure('Dara');
const Dare = myCustomClosure('Dare');
Dare.newInnerFunc();
Dare.anotherFunc();
