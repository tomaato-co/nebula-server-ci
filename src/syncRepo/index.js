
const syncRepo = async (
    repo, 
    {appName, branch, remoteBranch}, 
    fetchOptions
) => {
    try {
        const previousCommit = await repo.getBranchCommit(branch)
        await repo.fetchAll(fetchOptions)
        await repo.mergeBranches(branch, remoteBranch)
        const currentCommit = await repo.getBranchCommit(branch)
        const prevId = previousCommit.id().tostrS()
        const currId = currentCommit.id().tostrS()
        // console.log(`${prevId} | ${currId}`)
        if (prevId !== currId) {
            console.log(
                `${appName}:\n` +
                `  Merged changes [${prevId} -> ${currId}].`
            )
            return true
        }
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

module.exports = syncRepo
