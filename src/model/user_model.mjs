import mongoose from 'mongoose'

/**
 * Defines the schema for the User model.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

/**
 * User model based on the userSchema.
 */
const User = mongoose.model('User', userSchema)

/**
 * Adds a new user to the database.
 * 
 * @async
 * @param {Object} newUser - The new user object to add.
 * @returns {Promise<string>} A message indicating the user was added successfully.
 * @throws {Error} If saving the user fails.
 */
async function addUser(newUser) {
  try {
    const user = new User(newUser)
    await user.save()
    let message = `User ${user.username} has successfully been added to the mongoDB.`
    return message
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Retrieves all users from the database.
 * 
 * @async
 * @returns {Promise<Array>} An array of user documents.
 * @throws {Error} If fetching the users fails.
 */
async function listAllUsers() {
  try {
    return await User.find()
  } catch (error) {
    console.error('Error fetching contacts from MongoDB:', error)
    throw error
  }
}

/**
 * Finds a user by their username.
 * 
 * @async
 * @param {string} username - The username to search for.
 * @returns {Promise<Object|null>} The found user document or null if not found.
 * @throws {Error} If the search operation fails.
 */
async function findByUsername(username) {
  try {
    const user = await User.findOne({ username: username }).exec()
    return user
  } catch (error) {
    console.error("Error finding user by username:", error)
    throw error
  }
}

export default { addUser, listAllUsers, findByUsername }