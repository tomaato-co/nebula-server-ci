const fs = require('fs-extra')

const getConfig = async () => {
    const configJson = (await fs.readFile('./repos.json')).toString()
    const config = JSON.parse(reposJson)
    return config
}

module.exports = getConfig
