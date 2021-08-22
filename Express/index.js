const express = require('express')
const app = express() 
const path = require('path')

const PORT = process.env.PORT ?? 3000
const {requestTime, logger} = require('./moddlewares.js')


app.use(express.static(path.resolve(__dirname, 'client')))
app.use(requestTime)

// app.get('/', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
// })

app.get('/features', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'features.html'))
})

app.get('/download', (req, res)=>{
    console.log(req.requestTime);
    res.download(path.resolve(__dirname, 'client', 'index.html' ) )
})

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))