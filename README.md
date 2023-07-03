# WebP Image Converter

This Node.js script allows you to convert PNG and JPG images to WebP format, with the option to specify the compression quality for the images.

## Setup

Make sure you have Node.js installed on your machine.

1. Clone this repository or copy the code into a new Node.js project.

2. Install the dependencies by running the following command in the project directory: 

```bash
npm install
```

## Usage

1. Place your PNG and JPG images in the `folders/input`. directory. The images in this directory will be converted to WebP.

2. Open a terminal window and execute the script using the following command:

```bash
  npm run convert
```

3. For each image, the script will prompt you to specify the desired compression quality (between 1 and 100). Enter a valid number and press Enter.

4. The converted WebP images will be saved in the `folders/output` directory. Unsupported images (other than PNG and JPG) will be simply copied to the output folder.

5. You can find the converted WebP images in the `folders/output` directory.

Feel free to adjust the path of the `input` and `output` folders in the script according to your folder structure.