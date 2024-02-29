import mongoose from 'mongoose'

/**
 * Schema definition for the Snippets.
 */
const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  }
})

/**
 * Mongoose model for the Snippet.
 */
const Snippet = mongoose.model('Snippet', snippetSchema)

/**
 * Adds a new snippet to the database.
 * 
 * @async
 * @param {Object} newSnippet - The new snippet to add.
 * @returns {Promise<string>} A message indicating the snippet was added.
 * @throws {Error} Throws an error if saving the snippet fails.
 */
async function addSnippet(newSnippet) {
  try {
    const snippet = new Snippet(newSnippet)
    await snippet.save()
    let message = `Snippet with the following content ${snippet.username} has successfully been added to the mongoDB.`
    return message
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Retrieves all snippets from the database.
 * 
 * @async
 * @returns {Promise<Array>} An array of snippet documents.
 * @throws {Error} Throws an error if saving the snippet fails.
 */
async function getAllSnippets() {
  let snippets = []
  try {
    snippets = await Snippet.find()
  } catch (error) {
    console.error('Failed to fetch snippets:', error)
    throw error
  }
  return snippets
}

/**
 * Finds a snippet by its ID.
 * 
 * @async
 * @param {string} id - The ID of the snippet to find.
 * @returns {Promise<Object|null>} The found snippet document or null if not found.
 */
async function findSnippet(id) {
  const snippet = await Snippet.findOne({ _id: id })
  return snippet
}

/**
 * Updates the content of a snippet identified by ID.
 * 
 * @async
 * @param {string} id - The ID of the snippet to update.
 * @param {string} newContent - The new content for the snippet.
 */
async function changeSnippet(id, newContent) {
  await Snippet.updateOne({ _id: id }, { $set: { content: newContent } })
}

/**
 * Deletes a snippet identified by ID from the database.
 * 
 * @async
 * @param {string} id - The ID of the snippet to delete.
 */
async function deleteSnippet(id) {
  await Snippet.deleteOne({ _id: id })
}

export default { addSnippet, getAllSnippets, findSnippet, changeSnippet, deleteSnippet }