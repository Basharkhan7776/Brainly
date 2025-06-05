import express, { Request, Response } from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD, frontendUrl } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", frontendUrl],
        methods: ["GET", "POST", "PUT", "DELETE"], 
        credentials: true, 
    })
);


app.get("/", (req, res) => {
    res.json({
        message: "Brainly backend"
    });
});



app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {
    console.log('Received signup request for username:', req.body.username);

    const username = req.body.username;
    const password = req.body.password;

    try {
        // Validate input
        if (!username || !password) {
            console.error('Missing credentials:', { username: !!username, password: !!password });
            res.status(400).json({
                message: "Username and password are required"
            });
            return;
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            console.error('User already exists:', username);
            res.status(409).json({
                message: "User already exists"
            });
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = await UserModel.create({
            username: username,
            password: hashedPassword
        });

        console.log('Successfully created user:', username);

        res.status(201).json({
            message: "User signed up successfully",
            userId: newUser._id
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

app.post("/api/v1/signin", async (req: Request, res: Response): Promise<void> => {
    console.log('Received signin request for username:', req.body.username);

    const username = req.body.username;
    const password = req.body.password;

    try {
        // Validate input
        if (!username || !password) {
            console.error('Missing credentials:', { username: !!username, password: !!password });
            res.status(400).json({
                message: "Username and password are required"
            });
            return;
        }

        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            console.error('User not found:', username);
            res.status(403).json({
                message: "User not found"
            });
            return;
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password || '');
        if (!isPasswordValid) {
            console.error('Invalid password for user:', username);
            res.status(403).json({
                message: "Incorrect password"
            });
            return;
        }

        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);

        console.log('Successfully signed in user:', username);

        res.json({
            token
        });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({
            message: "Error signing in",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response): Promise<void> => {
    console.log('Received content creation request:', {
        userId: req.userId,
        content: req.body.content,
        link: req.body.link,
        type: req.body.type,
        title: req.body.title,
        tags: req.body.tags
    });

    try {
        // Validate required fields
        if (!req.body.title || !req.body.type) {
            console.error('Missing required fields:', { title: req.body.title, type: req.body.type });
            res.status(400).json({
                message: "Title and type are required fields"
            });
            return;
        }

        // Ensure tags is an array of strings
        const tags = Array.isArray(req.body.tags) 
            ? req.body.tags.map((tag: unknown) => String(tag).trim()).filter((tag: string) => tag.length > 0)
            : [];

        // Create content with validated tags
        const newContent = await ContentModel.create({
            content: req.body.content,
            link: req.body.link,
            type: req.body.type,
            title: req.body.title,
            userId: req.userId,
            tags: tags
        });

        console.log('Successfully created content:', {
            contentId: newContent._id,
            title: newContent.title,
            type: newContent.type,
            tags: newContent.tags
        });

        res.status(201).json({
            message: "Content added successfully",
            content: newContent
        });
    } catch (error) {
        console.error('Error creating content:', error);
        res.status(500).json({
            message: "Error creating content",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response): Promise<void> => {
    console.log('Fetching content for user:', req.userId);
    
    try {
        const content = await ContentModel.find({
            userId: req.userId
        }).populate("userId", "username");

        console.log(`Found ${content.length} content items for user ${req.userId}`);
        
        res.json({
            content
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({
            message: "Error fetching content",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    try {
        const result = await ContentModel.deleteOne({
            _id: contentId,
            userId: req.userId
        });

        if (result.deletedCount === 0) {
            res.status(404).json({
                message: "Content not found or you don't have permission to delete it"
            });
            return;
        }

        res.json({
            message: "Content deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting content"
        });
    }
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    console.log('Received share request:', {
        userId: req.userId,
        share: req.body.share
    });

    try {
        const share = req.body.share;
        if (share) {
            console.log('Enabling sharing for user:', req.userId);
            
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                console.log('Found existing share link:', {
                    userId: req.userId,
                    hash: existingLink.hash
                });
                res.json({
                    hash: existingLink.hash
                });
                return;
            }

            const hash = random(10);
            console.log('Creating new share link:', {
                userId: req.userId,
                hash: hash
            });

            await LinkModel.create({
                userId: req.userId,
                hash: hash
            });

            console.log('Successfully created share link');
            res.json({
                hash
            });
        } else {
            console.log('Disabling sharing for user:', req.userId);
            
            const result = await LinkModel.deleteOne({
                userId: req.userId
            });

            console.log('Share link deletion result:', {
                deletedCount: result.deletedCount,
                userId: req.userId
            });

            res.json({
                message: "Removed link"
            });
        }
    } catch (error) {
        console.error('Error in share handler:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            userId: req.userId,
            action: req.body.share ? 'enable' : 'disable'
        });
        res.status(500).json({
            message: "Error processing share request",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    console.log('Received share link request:', { hash });

    try {
        const link = await LinkModel.findOne({
            hash
        });

        if (!link) {
            console.error('Share link not found:', { hash });
            res.status(404).json({
                message: "Share link not found or has expired"
            });
            return;
        }

        console.log('Found share link:', {
            hash,
            userId: link.userId
        });

        const content = await ContentModel.find({
            userId: link.userId
        });

        console.log('Found content for shared brain:', {
            userId: link.userId,
            contentCount: content.length
        });

        const user = await UserModel.findOne({
            _id: link.userId
        });

        if (!user) {
            console.error('User not found for share link:', {
                hash,
                userId: link.userId
            });
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        console.log('Successfully retrieved shared brain:', {
            username: user.username,
            contentCount: content.length,
            hash
        });

        res.json({
            username: user.username,
            content: content
        });
    } catch (error) {
        console.error('Error retrieving shared brain:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            hash
        });
        res.status(500).json({
            message: "Error retrieving shared brain",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

app.listen(3000);