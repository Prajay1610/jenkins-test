const fs = require("fs");

//create folder
const createFolder = (folderName) => {
  //check if folder exists
  if (!fs.existsSync(folderName)) {
    //create the folder
    fs.mkdirSync(folderName);
  }
};

const defaultPosts =
  '[{ "id": "2020","title": "HTML","url": "http://someurl.com", "desc":"The Best"}]';

//create a file
const createFile = (fileName) => {
  //check if file exists
  if (!fs.existsSync(fileName)) {
    //create a file
    fs.writeFileSync(fileName, defaultPosts);
  }
};

module.exports = {
  createFolder,
  createFile,
};
