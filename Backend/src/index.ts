import express from "express"
import mongoose from "mongoose"
import z from "zod"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { userModel, noteModel } from "./db"
import { v4 as uuidv4 } from "uuid"

dotenv.config()
const app = express()
app.use(express.json())

// Sign up
app.post('/api/v1/signup', async (req, res) => {
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
app.post('/api/v1/signin', async (req, res) => {
    try {
        const signinRequiredBody = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        });

        const decodedData = signinRequiredBody.safeParse(req.body);

        // Check if parsing was successful
        if (!decodedData.success) {
            res.status(400).json({
                success: false,
                message: "Invalid input data"
            });
            return
        }

        const { email, password } = decodedData.data;

        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
            return
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

            res.cookie("token", token).status(200).json({
                success: true,
                message: "User sign in successful."
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
            return
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Add new content
app.post('api/v1/content', async (req, res) => {
    try {
        const contentRequiredBody = z.object({
            title: z.string(),
            content: z.string(),
            link: z.string(),
            imageUrl: z.string(),
            type: z.enum(['tweet', 'image', 'video', 'article', 'docs', 'link']),
            tags: z.array(z.string()),
            userId: z.string(),
        });

        const decodedData = contentRequiredBody.safeParse(req.body);

        // Check if validation failed
        if (!decodedData.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: decodedData.error.errors
            });
            return
        }

        const { title, content, link, imageUrl, type, tags, userId } = decodedData.data;

        const newContent = await noteModel.create({
            title,
            content,
            link,
            imageUrl,
            type,
            tags,
            userId
        });

        res.status(201).json({
            success: true,
            message: "New note created successfully.",
            newContent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Fetching all existing documents
app.get('/api/v1/contents', async (req, res) => {
    try {
        const notes = await noteModel.find({})

        res.status(200).json({
            success: true,
            message: "Retrived successfully",
            notes
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})

// Delete a document
app.delete('/api/v1/content/:contentId', async (req, res) => {
    try {
        const { contentId } = req.params

        const content = await noteModel.deleteOne({ _id: contentId })

        if (!content) {
            res.status(404).json({
                success: false,
                message: "Content not found."
            });

            return
        }

        res.status(200).json({
            success: true,
            message: "deleted successfully.",
            content
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})

// Create a shareable link for your second brain
app.post('/api/v1/brain/share/:contentId', async (req, res) => {
    try {
        const { contentId } = req.params

        const shareId = uuidv4();

        const updatedNote = await noteModel.findByIdAndUpdate(
            contentId,
            {
                isPublic: true,
                shareId
            },
            { new: true })

        if (!updatedNote) {
            res.status(401).json({
                success: false,
                message: "Note not found"
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "Shareable link created.",
            shareableLink: `http://localhost:5173/share/${shareId}`
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})

// Fetch another user's shared brain content
app.get('/api/v1/brain/:shareId', async (req, res) => {
    try {
        const { shareId } = req.params;

        const note = await noteModel.findOne({ shareId, isPublic: true })

        if (!note) {
            res.status(404).json({
                success: false,
                message: "Note not found"
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "Note found successfully",
            note
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
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