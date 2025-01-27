const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Person = require('./models/person')

mongoose.set("strictQuery", false) // 필터 빈 객체로 넣으면 에러 표출해주는거 끔

const app = express()
app.use(bodyParser.json())
app.listen(3000, async () => {
    console.log('Server Start')
    const mongodbUrl = "mongodb://mongo:test@localhost:27017/test?authSource=admin"

    // {useNewUrlParser: true} 몽고디비 아틀라스 쓸때는 설정 해주는게 좋다는데 난 로컬이라서 ㅇㅂㅇ
    mongoose.connect(mongodbUrl).then(() => console.log("Connected to MongoDB"))
})

app.get('/person', async (req, res) => {
    const person = await Person.find({})
    res.send(person)
})

app.get('/person/:email', async(req, res) => {
    const person = await Person.findOne({email: req.params.email})
    res.send(person)
})

app.post('/person', async (req, res) => {
    const person = new Person(req.body)
    await person.save()
    res.send(person)
})

app.put('/person/:email', async (req, res) => {
    const person = await Person.findOneAndUpdate(
            {email: req.params.email},
            {$set: req.body},
            {new: true},
    )
    console.log(person)
    res.send(person)
})

app.delete('/person/:email', async (req, res) => {
    await Person.deleteMany({email: req.params.email})
    res.send({success: true})
})