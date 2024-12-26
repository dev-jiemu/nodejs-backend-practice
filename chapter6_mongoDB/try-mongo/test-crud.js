const MongoClient = require('mongodb').MongoClient

const url = "mongodb://mongo:test@localhost:27017/test"

const client = new MongoClient(url)

const main = async () => {
    try {
        await client.connect()
        console.log('MongoDB 접속 성공')

        const collection = client.db('test').collection('person')

        await collection.insertOne({
            name: 'Andy',
            age: 30,
        })

        const documents = await collection.find({name: 'Andy'}).toArray()
        console.log('find document result : ', documents)

        await collection.updateOne(
                {name: 'Andy'},
                {$set: {age: 31,}})

        const updateDocuments = await collection.find({name: 'Andy'}).toArray()
        console.log('update find document result : ', updateDocuments)

        await client.close()
    } catch (err) {
        console.error(err)
    }
}

main().then(console.log).catch(console.error)