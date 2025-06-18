import { Request, Response } from "express";
import { ContentModel } from "../db";


export const PostContent = async (req: Request, res: Response): Promise<void> => {
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
}

export const GetContent = async (req: Request, res: Response): Promise<void> => {
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
}

export const PutContent = async (req: Request, res: Response): Promise<void> => {
    const { contentId, title, content, link, type, tags } = req.body;

    if (!contentId || !title || !type) {
        res.status(400).json({
            message: "contentId, title, and type are required"
        });
        return;
    }

    try {
        const existingContent = await ContentModel.findOne({
            _id: contentId,
            userId: req.userId
        });

        if (!existingContent) {
            res.status(404).json({
                message: "Content not found or you don't have permission to edit it"
            });
            return;
        }

        existingContent.title = title;
        existingContent.content = content;
        existingContent.link = link;
        existingContent.type = type;
        existingContent.tags = Array.isArray(tags)
            ? tags.map((tag: unknown) => String(tag).trim()).filter((tag: string) => tag.length > 0)
            : [];

        await existingContent.save();

        res.json({
            message: "Content updated successfully",
            content: existingContent
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating content",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}

export const DeleteContent = async (req: Request, res: Response): Promise<void> => {
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
}