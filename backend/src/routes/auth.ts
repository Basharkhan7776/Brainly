import { Request, Response } from "express";
import { UserModel } from "../db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";



export const Signup = async (req: Request, res: Response): Promise<void> => {
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
}
export const Signin = async (req: Request, res: Response): Promise<void> => {
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
}