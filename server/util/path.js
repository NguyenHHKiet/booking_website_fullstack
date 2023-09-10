const path = require("path");

const p = (filename) =>
    path.join(path.dirname(process.mainModule.filename), "data", filename);

module.exports = p;
