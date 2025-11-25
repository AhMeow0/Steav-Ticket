import { Schema, model } from 'mongoose'

const busSchema = new Schema({
  name: { type: String, required: true },
  plate: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Normal', 'VIP', 'Sleeper'], default: 'Normal' },
  totalSeats: { type: Number, default: 40 }
})

export default model('Bus', busSchema)