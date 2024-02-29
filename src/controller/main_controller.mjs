import snippet_model from '../model/snippet_model.mjs'

/**
 * Controller for handling main application routes.
 */
const main_controller = {
  
  /**
   * If the user is not logged in, it redirects to the home page.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  renderHomePage: (req, res) => {
    if (req.session.username == undefined) {
      res.render('home')
    }
  },

  /**
   * Renders the login page.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  renderLoginPage: (req, res) => {
    res.render('login', { message: null, errMsg: null})
  },

  /**
   * Renders the registration page.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  renderRegisterPage: (req, res) => {
    res.render('register', { message: null, errMsg: null})
  },

  /**
   * Renders the dashboard page, displaying all snippets. If the user is not logged in, they are considered a guest.
   * 
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  renderDashboard: async (req, res) => {
    let allSnippets = await snippet_model.getAllSnippets()
    if (req.session.username) {
      res.render('dashboard', { isLoggedIn: true,  username: req.session.username, snippets: allSnippets })
    } else {
      res.render('dashboard', { isLoggedIn: false,  username: "Guest", snippets: allSnippets })
    }
  },

  /**
   * Renders the page for creating a new snippet. If the user is not logged in, redirects to a 403 error page.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  renderCreateSnippetPage: (req, res) => {
    if (req.session.username) {
      res.render('snippets/createSnippet', { username: req.session.username })
    } else {
      res.render('errors/403')
    }
  },

  /**
   * Renders the page for editing an existing snippet. Requires user to be logged in; otherwise, a 403 error page is rendered.
   * 
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  renderEditSnippetPage: async (req, res) => {
    let snippet = await snippet_model.findSnippet(req.query.id)
    if (req.session.username) {
      res.render('snippets/editSnippet', { username: req.session.username, snippetId: snippet._id, snippetTitle: snippet.title, 
        snippetCreator: snippet.creator, snippetContent: snippet.content })
    } else {
      res.render('errors/403')
    }
  },

  /**
   * Renders a 404 error page for any routes that do not match the defined routes.
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  notFound: (req, res) => {
    res.render('errors/404')
  },

}

export default main_controller