import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD, frontendUrl } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";
import { Signin, Signup } from "./routes/auth";
import { DeleteContent, GetContent, PostContent, PutContent } from "./routes/content";
import { GetShareBrain, PostShareBrain } from "./routes/brain";

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



app.post("/api/v1/signup", Signup);

app.post("/api/v1/signin", Signin);

app.post("/api/v1/content", userMiddleware, PostContent);

app.get("/api/v1/content", userMiddleware, GetContent);

app.put("/api/v1/content", userMiddleware, PutContent);

app.delete("/api/v1/content", userMiddleware, DeleteContent)

app.post("/api/v1/brain/share", userMiddleware, PostShareBrain);

app.get("/api/v1/brain/:shareLink", GetShareBrain);

app.listen(3000);