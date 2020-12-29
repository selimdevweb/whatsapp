import mongoose from 'mongoose'

 const whatsappSchema = mongoose.Schema({
     message: String,
     name: String,
     timestamps : String,
     received : Boolean
 })

 export default mongoose.model('messagescontents', whatsappSchema)

    