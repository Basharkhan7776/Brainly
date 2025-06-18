import { Request, Response } from "express";
import { LinkModel, ContentModel, UserModel } from "../db";
import { random } from "../utils";



export const PostShareBrain = async (req: Request, res: Response): Promise<void> => {
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
}

export const GetShareBrain = async (req: Request, res: Response): Promise<void> => {
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
}
