const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    devServer: {
        proxy: 'http://localhost:7002'
    }
}