
require('dotenv').config()
const git = require('nodegit')
const forEach = require('./util/forEach')
const resolveHome = require('./util/resolve-home')
const getConfig = require('./getConfig')
const syncRepo = require('./syncRepo')
const run = require('./util/run')

const start = async () => {
	console.log("Started Nebula CI service.")
	try {
		const {repos} = await getConfig()
		const fetchOptions = {
			callbacks: {
				certificateCheck: () => (0),
				credentials: (url, userName) => (
					git.Cred.sshKeyFromAgent(userName)
				)
			}
		}
		const intervalId = setInterval(() => {
			forEach(repos, 
				async ({appName, repoPath, branch, remoteBranch, cmd}) => {
					const absRepoPath = resolveHome(repoPath)
					const repo = await git.Repository.open(absRepoPath)
					const merged = await syncRepo(
						repo, 
						{appName, branch, remoteBranch}, 
						fetchOptions
					)
					if (merged && cmd) {
						console.log(cmd)
						console.log(repoPath)
						await run(cmd, {cwd: repoPath})
					}
				}	
			)
		}, 6600)
		process.on('exit', () => {
			clearInterval(intervalId)
		})
	} catch (err) {
		console.error(err)
	}
}

start()

