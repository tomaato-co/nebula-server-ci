const homedir = require('os').homedir()
const path = require('path')

const resolveHome = (filepath) => {
	if (filepath[0] === '~') {
		return path.join(homedir, filepath.slice(1))
	}
	return filepath
}

module.exports = resolveHome

