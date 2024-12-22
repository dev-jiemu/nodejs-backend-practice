const DB = []

const saveDB = (user) => {
    const oldDBSize = DB.length + 1
    DB.push(user)
    console.log(`save ${user.name} to DB`)
    return new Promise((resolve, reject) => {
        if (DB.length > oldDBSize) {
            resolve(user)
        } else {
            reject('Save DB Error')
        }
    })
}

const sendEmail = (user) => {
    console.log(`email to ${user.email}`)
    return new Promise((resolve) => {
        resolve(user)
    })
}

const getResult = (user) => {
    return new Promise((resolve) => {
        resolve(`success register ${user.name}`)
    })
}

const registerByPromise = (user) => {
    const result = saveDB(user)
        .then(sendEmail)
        .then(getResult)
        .catch(error => new Error(error))
        .finally(() => console.log('success')) // 실패여부와 상관없이 실행됨
    console.log(result) // 완료되지 않은 상태라 pending 나옴
    return result
}

const myUser = {
    email: "test@test.com",
    password: "1234",
    name: "test",
}

const result = registerByPromise(myUser)
result.then(console.log)

// const allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)])
// allResult.then(console.log)