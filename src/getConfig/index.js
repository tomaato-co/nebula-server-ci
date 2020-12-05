const fs = require('fs-extra')

const getConfig = async () => {
    const configJson = (await fs.readFile('./config.json')).toString()
    const config = JSON.parse(configJson)
    return config
}

module.exports = getConfig
