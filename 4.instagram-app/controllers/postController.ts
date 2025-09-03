import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import {
    createPost as createPostModel,
    getAllPosts,
    getPostById,
    updatePost as updatePostModel,
    deletePost as deletePostModel,
} from '../models/postModel';

// Helper to handle file uploads
const handleFileUpload = (post: any, file?: Express.Multer.File) => {
    if (!file) return null;

    // Delete old file
    const oldFilePath = path.join(__dirname, '..', post.fileUrl);
    if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);

    return {
        fileUrl: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith('video') ? 'video' : 'image',
    };
};

// Create a new post
export const createPost = (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ error: 'File is required' });

    const type = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    const post = createPostModel({
        caption: req.body?.caption ?? '',
        fileUrl: `/uploads/${req.file.filename}`,
        type,
    });

    res.status(201).json(post);
};

// Get all posts
export const getPosts = (_req: Request, res: Response) => {
    const posts = getAllPosts();
    res.json(posts);
};

// Get single post by ID
export const getPost = (req: Request, res: Response) => {
    const post = getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
};

// Update post (caption and/or file)
export const updatePost = (req: Request, res: Response) => {
    const post = getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const updateData: { caption?: string; fileUrl?: string; type?: 'image' | 'video' } = {};

    // Update caption if provided
    if (typeof req.body?.caption === 'string') updateData.caption = req.body.caption;

    // Update file if uploaded
    if (req.file) {
        const fileData = handleFileUpload(post, req.file);
        if (fileData) {
            updateData.fileUrl = fileData.fileUrl;
            updateData.type = fileData.type as 'image' | 'video';
        }
    }

    const updatedPost = updatePostModel(req.params.id, updateData);
    res.json(updatedPost);
};

// Delete post
export const deletePost = (req: Request, res: Response) => {
    const post = getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Delete file from disk
    const filePath = path.join(__dirname, '..', post.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    deletePostModel(req.params.id);
    res.json({ message: 'Post deleted successfully' });
};
