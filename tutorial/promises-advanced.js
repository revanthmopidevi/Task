const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

// add (2, 3).then((sum) => {
//     console.log(sum)
// }).catch((error) => {
//     console.log(error)
// })

add (2, 3).then((sum) => {
    console.log(sum)
    return add (sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})