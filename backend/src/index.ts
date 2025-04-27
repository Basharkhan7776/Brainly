import express, { Request, Response } from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            res.status(411).json({
                message: "User already exists"
            });
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        await UserModel.create({
            username: username,
            password: hashedPassword
        });

        res.json({
            message: "User signed up successfully"
        });
    } catch(e) {
        res.status(500).json({
            message: "Error creating user"
        });
    }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            res.status(403).json({
                message: "User not found"
            });
            return;
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password || '');
        if (!isPasswordValid) {
            res.status(403).json({
                message: "Incorrect password"
            });
            return;
        }

        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);

        res.json({
            token
        });
    } catch(e) {
        res.status(500).json({
            message: "Error signing in"
        });
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        content: req.body.content,
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

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
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000);