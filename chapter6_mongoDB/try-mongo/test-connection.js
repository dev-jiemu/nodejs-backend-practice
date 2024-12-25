const { MongoClient } = require('mongodb')

const url = "mongodb://mongo:test@localhost:27017/myFirstDatabase"
const client = new MongoClient(url)
// client.connect(err => {
//     const collection = client.db("test").collection("devices")
//     client.close()
// })

const run = async () => {
    await client.connect()
    const adminDb = client.db('test').admin()
    const listDatabases = await adminDb.listDatabases()
    console.log(listDatabases)
    return "OK"
}

run().then(console.log).catch(console.error).finally(() => client.close())