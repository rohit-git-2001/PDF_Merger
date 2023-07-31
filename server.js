const express = require('express')
const multer = require('multer')
const mergerPdfs = require('./merge')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const app = express()
const port = 3004

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "template/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), function (req, res, next) {
    console.log(req.files)
    mergerPdfs(path.join(__dirname, req.files[0].path),
        path.join(__dirname, req.files[1].path))
              
    res.redirect("http://localhost:3004/")
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})