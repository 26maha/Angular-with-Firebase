const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3000
app.use(express.static('dist/angular-app-with-expressjs'))
app.get('*', (req, res) => {
  const options = {
    root: path.join(__dirname, 'dist/angular-app-with-expressjs')
  }
  return res.sendFile('index.html',options)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})