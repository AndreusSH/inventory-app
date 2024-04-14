const express = require('express')
const path = require('path')
const app = express();
const flash = require('express-flash');
const session = require('express-session')
const port = process.env.PORT || 3000
require('dotenv').config()

app.use(express.json())
// Serve static files from the public directory
app.use(express.static('public'))

// express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
);

// apply express-flash-message middleware
app.use(flash());

app.set('views', path.join(__dirname, 'views'))
// Set EJS as the template engine
app.set('view engine', 'ejs')
const connectDB = require('./db')
// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }))

//connect to Database
connectDB()

//routes
app.use('/', require('./routes/products'))
app.use('/new', require('./routes/products'))

/*
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
*/
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
