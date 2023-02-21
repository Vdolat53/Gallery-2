exports.express       = express       = require('express')
exports.expressEngine = expressEngine = require('express-handlebars')
//
const fs   = require('fs')
const path = require('path');

exports.app = express();

exports.constants = constants = {
    author: "Vahid",
}
exports.configs = configs = {
    port: 3000,
    // view engine
    viewEngine: expressEngine.engine(),
    viewsDir  : 'routes',
    // image files
    imagesListPath: 'imagelist.txt',
    imagesDir     : 'images',
    // users db
    usersPath: 'users.json'
}

exports.images =
    fs.readFileSync(configs.imagesListPath, 'utf8')
        .split('\n')
        .map(line => {
            line = path.parse(line.trim())
            return {
                value: line.name,
                name : line.name,
                path : path.join(configs.imagesDir, line.base)
            }
        })

exports.users =
    JSON.parse(fs.readFileSync(configs.usersPath, 'utf-8'))
