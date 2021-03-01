const doWorkCallback = (callback) => {
    setTimeout((error, result) => {
        // callback('Error', undefined)
        callback(undefined, [13, 14, 15])
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)
    }
    console.log(result)
})