const path = require('path');

module.exports = {
    mode:"none",
    entry: './public/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve("./", 'dist'),
    },
};