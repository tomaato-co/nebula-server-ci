const fs = require('fs-extra')

const getRepos = async () => {
    const reposJson = (await fs.readFile('./repos.json')).toString()
    const repos = JSON.parse(reposJson)
    return repos
}

module.exports = getRepos
