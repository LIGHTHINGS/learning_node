const fs = require('node:fs');


const deleteFile = () => {
    fs.open('./come.txt','r', (err, file) => {
        if (err) {
            fs.writeFileSync('come.txt', 'Hello world.. This is stream from Node', 'utf-8');
        }
        else if (file) {
            fs.unlinkSync('come.txt')
            console.log('./come.txt deleted because it already exist')
        } else {
            console.log('Something wrong happened')
        }
    })
}

deleteFile()

// fs.unlinkSync('come.txt')