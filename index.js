const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const prompts = require('prompts');

const inputFolder = path.join(__dirname, 'folders/input');
if (!fs.existsSync(inputFolder)) {
    fs.mkdirSync(inputFolder);
} else {
    fs.readdir(inputFolder, (err, files) => {
        if (err) throw err;
    });
}

const outputFolder = path.join(__dirname, 'folders/output');
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
} else {
    fs.readdir(outputFolder, (err, files) => {
        if (err) throw err;
    });
    fs.rmSync(outputFolder, { recursive: true });
    fs.mkdirSync(outputFolder);
}

async function convertToWebP(filePath) {
    const fileParse = path.parse(filePath);
    const fileName = fileParse.name;
    const outputPath = path.join(outputFolder, `${fileName}.webp`);

    (async () => {
        const response = await prompts({
            type: 'number',
            name: 'quality',
            message: `What quality for ${fileName}? (1-100)`,
            validate: value => value < 1 || value > 100 ? `Quality must be between 1 and 100` : true
        });

        await sharp(filePath)
            .webp({ quality: response.quality })
            .toFile(outputPath);

    })();
    console.log(`Successful conversion from ${filePath} to ${outputPath}`);
}

function convertImages() {
    fs.readdir(inputFolder, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(inputFolder, file);
            const fileExtension = path.extname(file).toLowerCase();

            if (fileExtension === '.png' || fileExtension === '.jpg') {
                convertToWebP(filePath).catch(error => {
                    console.error(`Error converting ${filePath}: ${error}`);
                });
            }
            if (fileExtension !== '.png' && fileExtension !== '.jpg') {
                fs.copyFile(filePath, path.join(outputFolder, file), (err) => {
                    if (err) throw err;
                    console.log(`The file ${file} has been copied to the output folder`);
                });
            }
        });
    });
}

convertImages();