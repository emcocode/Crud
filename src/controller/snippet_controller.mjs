import snippet_model from '../model/snippet_model.mjs'

/**
 * Represents a view model for an empty snippet.
 */
class EmptySnippetView {
  constructor() {
      this.title = ''
      this.content = ''
  }
}

/**
 * Controller for handling snippet-related actions.
 */
const snippet_controller = {
  
  /**
   * Creates a new snippet based on the request body and saves it to the database.
   * Renders the dashboard with all snippets upon success, or an error page upon failure.
   * 
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  createSnippet: async (req, res) => {
    try {
      let c = {
        title: req.body.snippetName,
        content: req.body.snippetContent,
        creator: req.session.username
      }
      let message = await snippet_model.addSnippet(c)
      let snippet = new EmptySnippetView()
      snippet.message = message
      let allSnippets = await snippet_model.getAllSnippets()
      res.render('dashboard', { isLoggedIn: true,  username: req.session.username, snippets: allSnippets })
    } catch (error) {
      console.error('Error creating a snippet:', error)
      res.render('errors/500')
    } 
  },

  /**
   * Edits an existing snippet based on the request body.
   * Renders the dashboard with updated snippet list upon success, or an error page upon failure.
   * 
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  editSnippet: async (req, res) => {
    try {
      await snippet_model.changeSnippet(req.body.snippetId, req.body.snippetContent)
      let allSnippets = await snippet_model.getAllSnippets()
      res.render('dashboard', { isLoggedIn: true,  username: req.session.username, snippets: allSnippets })
    } catch (error) {
      console.error('Error editing a snippet:', error)
      res.render('errors/500')
    }
    
  },
  
  /**
   * Deletes an existing snippet based on the request body.
   * Renders the dashboard with the remaining snippets upon success, or an error page upon failure.
   * 
   * @async
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  deleteSnippet: async (req, res) => {
    try {
      await snippet_model.deleteSnippet(req.body.snippetId)
      let allSnippets = await snippet_model.getAllSnippets()
      res.render('dashboard', { isLoggedIn: true,  username: req.session.username, snippets: allSnippets })
    } catch (error) {
      console.error('Error editing a snippet:', error)
      res.render('errors/500')
    }
  },
  
}

export default snippet_controller
