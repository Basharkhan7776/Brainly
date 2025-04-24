import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";


export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }
};
  

