"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Sign up
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signupRequiredBody = zod_1.default.object({
            firstName: zod_1.default.string(),
            lastName: zod_1.default.string(),
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(6)
        });
        const decodedData = signupRequiredBody.safeParse(req.body);
        if (!decodedData.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input",
                error: decodedData.error.errors
            });
        }
        const { firstName, lastName, email, password } = decodedData.data;
        const existingUser = yield db_1.userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists."
            });
        }
        const hash = yield bcrypt_1.default.hash(password, 12);
        yield db_1.userModel.create({
            firstName,
            lastName,
            email,
            password: hash
        });
        res.status(201).json({
            success: true,
            message: "New user signed up successfully."
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}));
// Sign in
app.post('/signin', (req, res) => {
});
// Add new content
app.post('/content', (req, res) => {
});
// Fetching all existing documents
app.get('/contents', (req, res) => {
});
// Delete a document
app.delete('/content', (req, res) => {
});
// Create a shareable link for your second brain
app.post('/brain/share', (req, res) => {
});
// Fetch another user's shared brain content
app.get('brain/:shareLink', (req, res) => {
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb://localhost:27017/Second-Brainly-App');
            console.log('mongoBD Connected');
        }
        catch (error) {
            console.log("Err! while connecting mongoDB.", error);
            return;
        }
        app.listen(8080, () => console.log(`Server running on 8080`));
    });
}
main();
