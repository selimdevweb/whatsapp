/* ajouter à package.json après main => "type":"module" , sert à écrire dans server.js c'est à dire dans node comme dans react avec import var from 'var' */
// Importer 
 import express from 'express'
 import mongoose from 'mongoose'
 import Messages from './dbMessages.js'
 import Pusher from "pusher"
 import cors from "cors"


 /* configuration de l'application */
 const app = express()
const port = process.env.PORT || 9000


const pusher = new Pusher({
  appId: "1129221",
  key: "80e9e9b97e69172e5da8",
  secret: "d8d6a0a7038b30caf57a",
  cluster: "eu",
  useTLS: true
});


//middle ware
app.use(express.json())
app.use(cors())
/* app.use((req, res)=>{
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader('Access-controll-Allow-Headers', '*')
    next()
})
 */


 /* connexion à la base de donnée */
const connection_url = "mongodb+srv://admin:dIfL509FAYVYk7zT@cluster0.9pbog.mongodb.net/whatsappdb?retryWrites=true&w=majority"

mongoose.connect(connection_url, {
    useCreateIndex: true, 
    useNewUrlParser: true ,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () =>{
    console.log('db connected')

    const msgCollection = db.collection("messagescontents")
    

    const changeStream = msgCollection.watch()
    changeStream.on('change',(change) =>{
        console.log(change)

        if (change.operationType == 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted',{
                user:messageDetails.user,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received: messageDetails.received,
             
            })
        } else {
            console.log('error')
        }
    })
})
 //root api
app.get('/', (req,res) => res.status(200).send('hello'))


app.get('/messages/sync', (req ,res) => {
   Messages.find( (err, data) => {
       if (err) {
           res.status(500).send(err)
       } else{
           res.status(201).send(data)
       }
   })

   })

app.post('/messages/new', (req ,res) => {
    const dbMessage = req.body
   Messages.create(dbMessage, (err, data) => {
       if (err) {
           res.status(500).send(err)
       } else{
           res.status(201).send(`new message created : \n ${data}`)
       }
   })

   })

//port 
app.listen(port, () => console.log(`listening on ${port}`))