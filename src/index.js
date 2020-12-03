
require('dotenv').config()
const git = require('nodegit')
const resolveHome = require('./util/resolve-home')

const start = async () => {
	try {
		console.log("Started Nebula Server CI service.")
		const repoPath = resolveHome(process.env.REPO_PATH)
		const repo = await git.Repository.open(repoPath)
		const intervalId = setInterval(() => {
			const pull = async () => {
				try {
					const previousCommit = await repo.getBranchCommit(process.env.REPO_BRANCH)
					await repo.fetchAll()
					await repo.mergeBranches(process.env.REPO_BRANCH, process.env.REPO_REMOTE_BRANCH)
					const currentCommit = await repo.getBranchCommit(process.env.REPO_BRANCH)
					const prevId = previousCommit.id().tostrS()
					const currId = currentCommit.id().tostrS()
					// console.log(`${prevId} | ${currId}`)
					if (prevId !== currId) {
						console.log(
							`Merged changes [${prevId} -> ${currId}].`
						)
					}
				} catch (err) {
					console.error(err)
				}
			}
			pull()
		}, 6600)
		process.on('exit', () => {
			clearInterval(intervalId)
		})
	} catch (err) {
		console.error(err)
	}
}

start()

