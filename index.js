const express = require('express')
// require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
// const { ObjectId } = require('mongodb');
const port = 5000

const app = express()

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.giumd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://volunteer-network:volunteerNetwork7373@cluster0.j05gt.mongodb.net/volunteer-network?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello!')
})

client.connect(err => {
  const addEvents = client.db(`${process.env.DB_NAME}`).collection("eventRegister");

 console.log('DB Connected');

 app.post('/addNewRegister', (req, res) => {
  const newRegister = req.body;
  addEvents.insertOne(newRegister)
  .then(result =>{
    res.send(result.insertedCount > 0);
    console.log(result);
  })
  console.log(newRegister);
 })

app.get('/registerUserEvents', (req, res) => {
  // console.log(req.query.email);
  addEvents.find({email: req.query.email})
  .toArray((err, documents) => {
    res.send(documents);
   })
  })
});



app.listen(process.env.PORT || port);