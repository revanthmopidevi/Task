const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject("Negtive numbers not allowed.")
            }
            resolve(a + b)
        }, 2000);
    })
}

const doWork = async () => {
    const sum = await add(2, 3)
    const sum2 = await add(sum, 10)
    const sum3 = await add(sum2, -45)
    return sum3
}

doWork().then((result) => {
    console.log(`result: ${result}`)
}).catch((error) =>{
    console.log(error)
})