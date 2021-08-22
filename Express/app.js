const express = require('express')
const path = require('path')
const app = express()
const {v4} = require('uuid')
const port = 3000


let CONTACTS = [
    {id: v4(), name: 'Денис', value: '+7 (912) 4040-314', marked: false}
];

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'client')))

//GET

app.get('/api/contacts', (req, res)=>{
    res.status(200).json(CONTACTS)
})

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'client', 'index.html'))
})

//POST

app.post('/api/contacts', (req, res)=>{
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact) 
    res.status(201).json(contact)
})

//DELETE

app.delete('/api/contacts/:id', (req, res) =>{
    CONTACTS = CONTACTS.filter(({id}) => id !== req.params.id)
    res.status(200).json({message: 'Contact was removed'})
})

//PUT
app.put('/api/contacts/:id', (req, res)=>{
    const index = CONTACTS.findIndex(c=> c.id == req.params.id)
    CONTACTS[index] = req.body
    res.json(CONTACTS[index])
})

//OTHERS
app.listen(port, () => console.log(`Server has been started on port ${port}`))