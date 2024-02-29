import express from "express"
import main_controller from "../controller/main_controller.mjs"
import authentication_controller from "../controller/authentication_controller.mjs"
import snippet_controller from "../controller/snippet_controller.mjs"

// Routing
const router = express.Router()

// Home page
router.get('/', main_controller.renderHomePage)

// Login page
router.get('/login', main_controller.renderLoginPage)

// Register page
router.get('/register', main_controller.renderRegisterPage)

// Dashboard page
router.get('/dashboard', main_controller.renderDashboard)

// Logout mechanism
router.get('/logout', authentication_controller.logout)

// Logic handling before createSnippetPage
router.get('/createSnippet', main_controller.renderCreateSnippetPage)

// Create snippet page
router.post('/createSnippet', snippet_controller.createSnippet)

// Logic handling before editSnippetPage
router.get('/editSnippet', main_controller.renderEditSnippetPage)

// Edit snippet page
router.post('/editSnippet', snippet_controller.editSnippet)

// Delete snippet page
router.post('/deleteSnippet', snippet_controller.deleteSnippet)

// Get to dashboard after logging in
router.post('/dashboard', authentication_controller.loginAttempt)

// Get to login page after registering
router.post('/login', authentication_controller.registerAttempt)

// Handle 404:s
router.get('*', main_controller.notFound)

export default router