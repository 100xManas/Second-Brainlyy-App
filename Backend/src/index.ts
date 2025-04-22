import express from "express"
import mongoose from "mongoose"
import z from "zod"

const app = express()

async function main() {
    try {
        await mongoose.connect('http://localhost:27017/Second-Brainly-App')
        console.log('mongoBD Connected');
    } catch (error) {
        console.log("Err! while connecting mongoDB", error);
        return
    }
}

main()


// Sign up
app.post('/signup', async (req, res) => {

})

// Sign in
app.post('/signin', (req, res) => {

})

// Add new content
app.post('/content', (req, res) => {

})

// Fetching all existing documents
app.get('/contents', (req, res) => {

})

// Delete a document
app.delete('/content', (req, res) => {

})

// Create a shareable link for your second brain
app.post('/brain/share', (req, res) => {

})

// Fetch another user's shared brain content
app.get('brain/:shareLink', (req, res) => {

})


app.listen(8080, () => console.log(`Server running on 8080`))