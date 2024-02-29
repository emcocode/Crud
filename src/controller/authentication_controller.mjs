import user_model from '../model/user_model.mjs'
import snippet_model from '../model/snippet_model.mjs'
import bcrypt from 'bcrypt'

/**
 * Represents a view model for an empty user.
 */
class EmptyUserView {
  constructor() {
      this.username = ''
      this.password = ''
  }
}

/**
 * Controller for handling authentication-related actions.
 */
const authentication_controller = {
  
  /**
   * Attempts to log in a user with the provided credentials.
   * If successful, renders the dashboard with user's snippets; otherwise, renders the login page with an error message.
   * 
   * @async
   * @param {Object} req - The request object, containing the username and password.
   * @param {Object} res - The response object.
   */
  loginAttempt: async (req, res) => {
    let userExists = false
    try {
      const user = await user_model.findByUsername(req.body.username)
      if (user) {
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (isMatch) {
          userExists = true
        }
      }
      if (userExists) {
        req.session.username = req.body.username
        let snip = await snippet_model.getAllSnippets()
        res.render('dashboard', { isLoggedIn: true, username: req.session.username, snippets: snip })
      } else {
        res.render('login', { message: null, errMsg: "Login failed: Username and/or password incorrect!" })
      }
    } catch (error) {
      console.error('Error loggin in:', error)
      res.render('errors/500')
    } 
  },
  
  /**
   * Handles the user registration attempt.
   * If successful, redirects to the login page for the user to log in; otherwise, renders the registration page with an error message.
   * 
   * @async
   * @param {Object} req - The request object, containing the username and password.
   * @param {Object} res - The response object.
   */
  registerAttempt: async (req, res) => {
    try {
      if (req.body.username.length >= 3 && req.body.password.length >= 3) { // 3 is obviously way to short for a good password, but I allow it here for simplicity
        const userExists = await user_model.findByUsername(req.body.username)
        if (!userExists && req.body.username != "Guest") {
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(req.body.password, salt)
          let u = {
            username: req.body.username,
            password: hashedPassword
          } 
          let message = await user_model.addUser(u)  
          let user = new EmptyUserView()
          user.message = message
          res.render('login', { message: "You successfully created a user, please log in!", errMsg: null})
        } else {
          res.render('register', { message: null, errMsg: "Register failed: There already is a user with that username!" })
        }
      } else {
        res.render('register', { message: null, errMsg: "Register failed: Username and/or password too short!" })
      }
    } catch (error) {
        console.error(error)
        res.render('errors/500')
    }
  },

  /**
   * Logs out the current user by destroying the session and redirects to the home page.
   * 
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/')
    })
  },
}

export default authentication_controller
