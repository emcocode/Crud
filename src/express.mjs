import express from 'express'
import routing from './route/main_route.mjs'
import connectToDatabase from './model/db_model.mjs'
import session from 'express-session'

// Create an Express application
const app = express()

// Configure view engine and views directory for the Express application
app.set('view engine', 'ejs')
app.set('views', './src/views')

// Serve static files from the 'public' directory
app.use(express.static('src/public'))

// Use middleware to parse URL-encoded bodies and JSON payloads
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Configure session middleware for the application
app.use(session({
  secret: 'MinHemliga->-SuperHemliga->-Nyckel',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 900000 // 15 min
  }
}))

// Use the main routing module for the application
app.use('/', routing)

/**
 * Start the Express application after connecting to the database
 * @param {number} [port=3000] - The port on which the server will listen
 */
export default async (port = 3000) => {
  try {
    await connectToDatabase()
    app.listen(port, () => { console.log(`Listening at port ${port}`) })
  } catch (error) {
    console.error('Failed to connect to the database:', error)
  }
}
