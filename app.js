const fs = require('fs/promises');

console.log('Working before the async commands')
const app = async () => {

    //commands
    const CREATE_FILE = 'create file';
    const DELETE_FILE = 'delete file';
    const RENAME_FILE = 'rename file';
    const ADD_TO_FILE = 'add to file';

    const commandHandler = await fs.open('./command.txt', 'r')
    const watcher = fs.watch('./command.txt');

    
    commandHandler.on("change", async () => {
        //get the size of the file
        console.log('event on is triggered')
        const size = (await commandHandler.stat()).size;

        // allocate the intended size
        const buff = Buffer.alloc(size);
        const position = 0
        const offset = 0
        const length = buff.byteLength
        
        // reading the content in the command.txt
        await commandHandler.read(
            buff,
            offset,
            length,
            position
            )
            const command = buff.toString('utf-8');
            console.log(command)
            // create a file
            // check if key word 'create a file' and <path>
            if (command.includes(CREATE_FILE)) {
                const path = command.substring(CREATE_FILE.length + 1);
                createFile(path)
        }
        
        //Delete a file
        // Delete a file if it exist
        if (command.includes(DELETE_FILE)){
            const filePath = command.substring(DELETE_FILE.length + 1);
            deleteFile(filePath)
        }

        // rename a file
        // rename a file if it exist
        if (command.includes(RENAME_FILE)){
            const _idx = command.indexOf(' to ');
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
            const newFilePath = command.substring(_idx + 4);
            renameFile(oldFilePath, newFilePath)
            
        }
        // add to file
        // add to the file <path> this content:
        if (command.includes(ADD_TO_FILE)){
            const _idx = command.indexOf(' this content: ');
            const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
            const content = command.substring(_idx + 15);
            
            addToFile(filePath, content)
        }
    });
    
    const createFile = async (path) => {
        try {
            const existingFile = await fs.open(path, 'r')
            existingFile.close();
            console.log(`File ${path} already exists`);
        } catch (error) {
            const newFileHandle = await fs.open(path, 'w')
            console.log('New File created');
            newFileHandle.close();
        }
    }
    
    //delete file function
    const deleteFile = async (path) => {
        try {
            const existingFile = await fs.open(path, 'r')
            if (existingFile){
                await fs.unlink(path);
                console.log(`File ${path} deleted`);
            } } 
            catch (error) {
                if (error.code ==='ENOENT'){
                    console.log('No such file exist....');
            } else {
                console.log('An error has occured!!...');
                console.log(error);
            }
        }
    }
    
    //rename file function
    const renameFile = async (oldPath, newPath) => {
        try {
            await fs.open(oldPath, 'r')
            await fs.rename(oldPath, newPath)
            console.log(`File ${oldPath} renamed to ${newPath}`);
        }
         catch (error) {
             if (error.code ==='ENOENT'){
                 console.log(`${oldPath} does not exist or destination does not exist, please try another....`);
                } else {
                    console.log('An error has occured!!...');
                console.log(error);
            }
        };
    }
    
    
    // add to file function
    const addToFile = async (path, content) => {
        try {
            const fileHandle = await fs.open(path, 'a')
            fileHandle.write(content)
            console.log(`File ${path} is updated with [ *** ${content} *** ]`);
        }
        catch (error) {
            if (error.code ==='ENOENT'){
                console.log(`${path} does not exist, please try another....`);
            } else {
                console.log('An error has occured!!...');
                console.log(error);
            }
        };
        
        // watcher......
        for await (const event of watcher) {
            console.log(event.eventType)
            if (event.eventType === "change"){
                commandHandler.emit("change");
            }
        }

    }
};

app()
