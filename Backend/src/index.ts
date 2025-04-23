import express, { Request, Response } from "express"
import mongoose from "mongoose"
import z from "zod"
import bcrypt from "bcrypt";
import { userModel } from "./db"

const app = express()
app.use(express.json())

// Sign up
app.post('api/v1/signup', async (req, res ) => {
    try {
        const signupRequiredBody = z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        });

        const decodedData = signupRequiredBody.safeParse(req.body);

        if (!decodedData.success) {
             res.status(400).json({
                success: false,
                message: "Invalid input",
                error: decodedData.error.errors
            });

            return
        }

        const { firstName, lastName, email, password } = decodedData.data;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
             res.status(409).json({
                success: false,
                message: "User already exists."
            });
            return
        }

        const hash = await bcrypt.hash(password, 12);

        await userModel.create({
            firstName,
            lastName,
            email,
            password: hash
        });

        res.status(201).json({
            success: true,
            message: "New user signed up successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

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


async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Second-Brainly-App')
        console.log('mongoBD Connected');
    } catch (error) {
        console.log("Err! while connecting mongoDB.", error);
        return
    }

    app.listen(8080, () => console.log(`Server running on 8080`))

}

main()