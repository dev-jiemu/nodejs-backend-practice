const DB = []

// sendDB -> sendEmail -> getResult
const register = (user) => {
    return saveDB(user, (user) => {
        return sendEmail(user, (user) => {
            return getResult(user)
        })
    })
}

const saveDB = (user, callback) => {
    DB.push(user)
    console.log(`save ${user.name} to DB`)
    return callback(user)
}

const sendEmail = (user, callback) => {
    console.log(`email to ${user.email}`)
    return callback(user)
}

const getResult = (user) => {
    return `success register ${user.name}`
}

const result = register({
    email: "test@test.com",
    password: "1234",
    name: "test",
})

console.log(result)