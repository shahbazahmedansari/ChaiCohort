const fs = require('fs');
const fsv2 = require('fs/promises');

console.log('Starting Program');

// fsv2.readFile('./hello.txt', 'utf-8')
//     .then((content) => fs.writeFile('backup.txt', content))
//     .then(() => fs.unlink('./hello.txt'))
//     .catch((err) => console.log('Error in process'), err);

function readFileWithPromise(filePath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, content) => {
            if (err) {
                reject(err); // Signal do - user k catch function ko execute kardo
            } else {
                resolve(content); // Signal do - user k then functions ko execute kardo
            }
        });
    });
}

function writeFileWithPromise(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function unlinkWithPromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Multiple Async code is running in sync fashion

fs.readFileWithPromise('./hello.txt', 'utf-8')
    .then((content) => fs.writeFileWithPromise('./backup.txt', content))
    .then(() => fs.unlinkWithPromise('./hello.txt'))
    .catch((err) => console.log('Error', err))
    .finally(() => console.log('All Done'));


function wait(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000);
    });
}

// Syntactic sugar
async function doTasks() {
    try {
        const fileContent = await readFileWithPromise('./hello.txt', 'utf-8');
        await writeFileWithPromise('./backup.txt', fileContent);
        await wait(10);
        await unlinkWithPromise('./hello.txt');
    } catch (error) {
        console.log("Error", error);
    } finally {
        console.log("Tasks completed");
    }
}

doTasks.then(() => console.log("Tasks completed"));

// Callback Hell
fs.readFile('./hello.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(`Error in reading file`, err);
    } else {
        console.log('File Reading Success', data);
        fs.writeFile('backup.txt', data, (err) => {
            if (err) {
                console.log(`Error in writing backup.txt`, err);
            } else {
                fs.unlink('./hello.txt', (err) => {
                    if (err) {
                        console.log(`Error deleting file`, err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
            }
        });
    }
});

console.log("End of program");