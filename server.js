const express = require('express'); 
const path = require('path')
const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views')); 
// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});