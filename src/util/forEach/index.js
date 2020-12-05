
const forEach = async (array, func) => {
    if (array.length === 0) {
        return
    }
    await func(array[0])
    await forEach(
        array.slice(1),
        func
    )
}

module.exports = forEach
