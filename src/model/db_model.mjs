import mongoose from 'mongoose'

/**
 * Asynchronously connect to MongoDB using mongoose.
 */
const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017', {
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

export default connectToDatabase
