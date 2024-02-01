const path = require('path');

module.exports = [
    {
        mode:"none",
        entry: './public/js/tools.js',
        output: {
            filename: 'bundleTools.js',
            path: path.resolve("./public/js", 'dist'),
        },
    },
    {
        mode:"none",
        entry: './public/js/login.js',
        output: {
            filename: 'bundleLogin.js',
            path: path.resolve("./public/js", 'dist'),
        },
    },
    {
        mode:"none",
        entry: './public/js/signIn.js',
        output: {
            filename: 'bundleSignIn.js',
            path: path.resolve("./public/js", 'dist'),
        },
    },
];